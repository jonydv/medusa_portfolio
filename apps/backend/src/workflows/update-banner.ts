import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { BANNER_MODULE } from "../modules/banner"
import BannerModuleService from "../modules/banner/service"

export type UpdateBannerStepInput = {
  id: string
  title?: string
  subtitle?: string | null
  image_url?: string
  cta_label?: string | null
  cta_href?: string | null
  rank?: number
  is_active?: boolean
  starts_at?: Date | null
  ends_at?: Date | null
}

const updateBannerStep = createStep(
  "update-banner",
  async (input: UpdateBannerStepInput, { container }) => {
    const bannerModuleService: BannerModuleService =
      container.resolve(BANNER_MODULE)

    const { id, ...data } = input
    const banner = await bannerModuleService.updateBanners({ id }, data)

    return new StepResponse(banner)
  }
)

export const updateBannerWorkflow = createWorkflow(
  "update-banner",
  (input: UpdateBannerStepInput) => {
    const banner = updateBannerStep(input)

    return new WorkflowResponse(banner)
  }
)
