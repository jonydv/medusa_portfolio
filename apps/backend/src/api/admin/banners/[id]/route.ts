import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"
import { deleteBannerWorkflow } from "../../../../workflows/delete-banner"
import { updateBannerWorkflow } from "../../../../workflows/update-banner"

const UpdateBannerSchema = z.object({
  title: z.string().min(1).optional(),
  subtitle: z.string().nullable().optional(),
  image_url: z.string().min(1).optional(),
  cta_label: z.string().nullable().optional(),
  cta_href: z.string().nullable().optional(),
  rank: z.number().optional(),
  is_active: z.boolean().optional(),
  starts_at: z
    .string()
    .nullable()
    .optional()
    .transform((v) => (v ? new Date(v) : null)),
  ends_at: z
    .string()
    .nullable()
    .optional()
    .transform((v) => (v ? new Date(v) : null)),
})

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const data = UpdateBannerSchema.parse(req.body)
  const { result: banner } = await updateBannerWorkflow(req.scope).run({
    input: { id: req.params.id, ...data },
  })

  res.json({ banner })
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  await deleteBannerWorkflow(req.scope).run({
    input: { id: req.params.id },
  })

  res.json({ id: req.params.id, object: "banner", deleted: true })
}
