import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { BANNER_MODULE } from "../modules/banner"
import BannerModuleService from "../modules/banner/service"

type SeedBannerInput = {
  title: string
  subtitle: string
  image_url: string
  cta_label: string
  cta_href: string
  rank: number
}

const BANNERS: SeedBannerInput[] = [
  {
    title: "Summer Sale",
    subtitle: "Up to 30% off selected styles",
    image_url:
      "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-front.png",
    cta_label: "Shop Featured",
    cta_href: "/collections/featured",
    rank: 0,
  },
  {
    title: "New Arrivals",
    subtitle: "Fresh drops, straight to your cart",
    image_url:
      "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png",
    cta_label: "Browse the Store",
    cta_href: "/store",
    rank: 1,
  },
  {
    title: "Powered by Medusa",
    subtitle: "An open-source composable commerce engine",
    image_url:
      "https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-front.png",
    cta_label: "Learn more",
    cta_href: "https://www.medusajs.com",
    rank: 2,
  },
]

export default async function seedBanner({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const bannerModuleService: BannerModuleService =
    container.resolve(BANNER_MODULE)

  for (const input of BANNERS) {
    const existing = await bannerModuleService.listBanners({
      title: input.title,
    })

    if (existing.length) {
      logger.info(
        `[seed-banner] Banner "${input.title}" already exists (${existing[0].id}) — skipping.`
      )
      continue
    }

    const banner = await bannerModuleService.createBanners({
      ...input,
      is_active: true,
      starts_at: null,
      ends_at: null,
    })

    logger.info(
      `[seed-banner] Created banner "${banner.title}" (${banner.id}).`
    )
  }
}
