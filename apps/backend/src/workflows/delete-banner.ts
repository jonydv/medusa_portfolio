import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { BANNER_MODULE } from "../modules/banner"
import BannerModuleService from "../modules/banner/service"

export type DeleteBannerStepInput = {
  id: string
}

const deleteBannerStep = createStep(
  "delete-banner",
  async ({ id }: DeleteBannerStepInput, { container }) => {
    const bannerModuleService: BannerModuleService =
      container.resolve(BANNER_MODULE)

    await bannerModuleService.deleteBanners([id])

    return new StepResponse({ id })
  }
)

export const deleteBannerWorkflow = createWorkflow(
  "delete-banner",
  (input: DeleteBannerStepInput) => {
    const result = deleteBannerStep(input)

    return new WorkflowResponse(result)
  }
)
