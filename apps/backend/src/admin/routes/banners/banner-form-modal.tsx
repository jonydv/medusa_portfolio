import { Button, FocusModal, Heading, Input, Label, Switch, Text } from "@medusajs/ui"
import { useEffect, useState } from "react"
import { sdk } from "../../lib/config"
import type { Banner } from "./page"

type BannerFormState = {
  title: string
  subtitle: string
  image_url: string
  cta_label: string
  cta_href: string
  rank: string
  is_active: boolean
  starts_at: string
  ends_at: string
}

const EMPTY_FORM: BannerFormState = {
  title: "",
  subtitle: "",
  image_url: "",
  cta_label: "",
  cta_href: "",
  rank: "0",
  is_active: true,
  starts_at: "",
  ends_at: "",
}

const toFormState = (banner: Banner | null): BannerFormState =>
  banner
    ? {
        title: banner.title,
        subtitle: banner.subtitle ?? "",
        image_url: banner.image_url,
        cta_label: banner.cta_label ?? "",
        cta_href: banner.cta_href ?? "",
        rank: String(banner.rank),
        is_active: banner.is_active,
        starts_at: banner.starts_at?.slice(0, 10) ?? "",
        ends_at: banner.ends_at?.slice(0, 10) ?? "",
      }
    : EMPTY_FORM

type BannerFormModalProps = {
  open: boolean
  banner: Banner | null
  onOpenChange: (open: boolean) => void
  onSaved: () => void
}

const BannerFormModal = ({
  open,
  banner,
  onOpenChange,
  onSaved,
}: BannerFormModalProps) => {
  const [form, setForm] = useState<BannerFormState>(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (open) {
      setForm(toFormState(banner))
    }
  }, [open, banner])

  const update = <K extends keyof BannerFormState>(
    key: K,
    value: BannerFormState[K]
  ) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const payload = {
      title: form.title,
      subtitle: form.subtitle || null,
      image_url: form.image_url,
      cta_label: form.cta_label || null,
      cta_href: form.cta_href || null,
      rank: Number(form.rank) || 0,
      is_active: form.is_active,
      starts_at: form.starts_at || null,
      ends_at: form.ends_at || null,
    }

    try {
      if (banner) {
        await sdk.client.fetch(`/admin/banners/${banner.id}`, {
          method: "POST",
          body: payload,
        })
      } else {
        await sdk.client.fetch("/admin/banners", {
          method: "POST",
          body: payload,
        })
      }
      onSaved()
      onOpenChange(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <FocusModal open={open} onOpenChange={onOpenChange}>
      <FocusModal.Content>
        <form onSubmit={handleSubmit} className="flex h-full flex-col overflow-hidden">
          <FocusModal.Header>
            <div className="flex items-center justify-end gap-x-2">
              <FocusModal.Close asChild>
                <Button size="small" variant="secondary" type="button">
                  Cancel
                </Button>
              </FocusModal.Close>
              <Button size="small" type="submit" isLoading={submitting}>
                Save
              </Button>
            </div>
          </FocusModal.Header>
          <FocusModal.Body className="flex flex-col items-center overflow-y-auto py-16">
            <div className="flex w-full max-w-lg flex-col gap-y-6">
              <Heading>{banner ? "Edit banner" : "Create banner"}</Heading>

              <div className="flex flex-col gap-y-2">
                <Label size="small" weight="plus">
                  Title
                </Label>
                <Input
                  required
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <Label size="small" weight="plus">
                  Subtitle
                </Label>
                <Input
                  value={form.subtitle}
                  onChange={(e) => update("subtitle", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <Label size="small" weight="plus">
                  Image URL
                </Label>
                <Input
                  required
                  value={form.image_url}
                  onChange={(e) => update("image_url", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-y-2">
                  <Label size="small" weight="plus">
                    CTA label
                  </Label>
                  <Input
                    value={form.cta_label}
                    onChange={(e) => update("cta_label", e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <Label size="small" weight="plus">
                    CTA link
                  </Label>
                  <Input
                    value={form.cta_href}
                    onChange={(e) => update("cta_href", e.target.value)}
                    placeholder="/collections/featured"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-y-2">
                  <Label size="small" weight="plus">
                    Starts at
                  </Label>
                  <Input
                    type="date"
                    value={form.starts_at}
                    onChange={(e) => update("starts_at", e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <Label size="small" weight="plus">
                    Ends at
                  </Label>
                  <Input
                    type="date"
                    value={form.ends_at}
                    onChange={(e) => update("ends_at", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-y-2">
                  <Label size="small" weight="plus">
                    Rank
                  </Label>
                  <Input
                    type="number"
                    value={form.rank}
                    onChange={(e) => update("rank", e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <Label size="small" weight="plus">
                    Active
                  </Label>
                  <div className="flex items-center gap-x-2">
                    <Switch
                      checked={form.is_active}
                      onCheckedChange={(checked) => update("is_active", checked)}
                    />
                    <Text className="text-ui-fg-subtle txt-small">
                      {form.is_active ? "Visible on the storefront" : "Hidden"}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </FocusModal.Body>
        </form>
      </FocusModal.Content>
    </FocusModal>
  )
}

export default BannerFormModal
