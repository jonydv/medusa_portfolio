import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { BANNER_MODULE } from "../modules/banner"
import BannerModuleService from "../modules/banner/service"

export type CreateBannerStepInput = {
  title: string
  subtitle?: string | null
  image_url: string
  cta_label?: string | null
  cta_href?: string | null
  rank?: number
  is_active?: boolean
  starts_at?: Date | null
  ends_at?: Date | null
}

const createBannerStep = createStep(
  "create-banner",
  async (input: CreateBannerStepInput, { container }) => {
    const bannerModuleService: BannerModuleService =
      container.resolve(BANNER_MODULE)

    const banner = await bannerModuleService.createBanners(input)

    return new StepResponse(banner, banner.id)
  },
  async (bannerId: string | undefined, { container }) => {
    if (!bannerId) {
      return
    }

    const bannerModuleService: BannerModuleService =
      container.resolve(BANNER_MODULE)

    await bannerModuleService.deleteBanners([bannerId])
  }
)

export const createBannerWorkflow = createWorkflow(
  "create-banner",
  (input: CreateBannerStepInput) => {
    const banner = createBannerStep(input)

    return new WorkflowResponse(banner)
  }
)
