import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "@medusajs/framework/zod"
import { BANNER_MODULE } from "../../../modules/banner"
import type BannerModuleService from "../../../modules/banner/service"
import { createBannerWorkflow } from "../../../workflows/create-banner"

const CreateBannerSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().nullable().optional(),
  image_url: z.string().min(1),
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

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const bannerModuleService: BannerModuleService = req.scope.resolve(
    BANNER_MODULE
  )

  const banners = await bannerModuleService.listBanners(
    {},
    { order: { rank: "ASC" } }
  )

  res.json({ banners })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const data = CreateBannerSchema.parse(req.body)
  const { result: banner } = await createBannerWorkflow(req.scope).run({
    input: data,
  })

  res.json({ banner })
}
