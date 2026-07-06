import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { BANNER_MODULE } from "../../../modules/banner"
import type BannerModuleService from "../../../modules/banner/service"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const bannerModuleService: BannerModuleService = req.scope.resolve(
    BANNER_MODULE
  )

  const banners = await bannerModuleService.listBanners(
    { is_active: true },
    { order: { rank: "ASC" } }
  )

  const now = new Date()
  const activeBanners = banners.filter((banner) => {
    const startsOk = !banner.starts_at || new Date(banner.starts_at) <= now
    const endsOk = !banner.ends_at || new Date(banner.ends_at) >= now
    return startsOk && endsOk
  })

  res.json({ banners: activeBanners })
}
