import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { BANNER_MODULE } from "../modules/banner"
import BannerModuleService from "../modules/banner/service"

const BANNER_TITLE = "Summer Sale"

export default async function seedBanner({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const bannerModuleService: BannerModuleService = container.resolve(
    BANNER_MODULE
  )

  const existing = await bannerModuleService.listBanners({
    title: BANNER_TITLE,
  })

  if (existing.length) {
    logger.info(
      `[seed-banner] Banner "${BANNER_TITLE}" already exists (${existing[0].id}) — skipping.`
    )
    return
  }

  const banner = await bannerModuleService.createBanners({
    title: BANNER_TITLE,
    subtitle: "Up to 30% off selected styles",
    image_url:
      "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-front.png",
    cta_label: "Shop Featured",
    cta_href: "/collections/featured",
    rank: 0,
    is_active: true,
    starts_at: null,
    ends_at: null,
  })

  logger.info(`[seed-banner] Created banner "${banner.title}" (${banner.id}).`)
}
