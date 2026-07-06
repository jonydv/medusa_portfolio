import { listBanners } from "@lib/data/banners"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button, Heading, Text } from "@modules/common/components/ui"

export default async function BannerStrip() {
  const banners = await listBanners()

  if (!banners.length) {
    return null
  }

  return (
    <div className="content-container py-12 small:py-16">
      <div className="grid grid-cols-1 gap-6 small:grid-cols-2">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="relative overflow-hidden rounded-lg border border-ui-border-base bg-ui-bg-subtle"
          >
            <img
              src={banner.image_url}
              alt={banner.title}
              className="h-64 w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end gap-2 bg-gradient-to-t from-black/60 via-black/10 to-transparent p-6">
              <Heading level="h3" className="text-white">
                {banner.title}
              </Heading>
              {banner.subtitle && (
                <Text className="text-white/80">{banner.subtitle}</Text>
              )}
              {banner.cta_label && banner.cta_href && (
                <LocalizedClientLink href={banner.cta_href}>
                  <Button variant="secondary" size="small" className="mt-2">
                    {banner.cta_label}
                  </Button>
                </LocalizedClientLink>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
