import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import {
  batchLinkProductsToCollectionWorkflow,
  createCollectionsWorkflow,
} from "@medusajs/medusa/core-flows"

const FEATURED_COLLECTION_HANDLE = "featured"
const FEATURED_COLLECTION_TITLE = "Featured"

export default async function seedFeaturedCollection({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const productModuleService = container.resolve(Modules.PRODUCT)

  const [products] = await productModuleService.listAndCountProducts({})

  if (!products.length) {
    logger.warn(
      "[seed-featured-collection] No products found in the store — skipping."
    )
    return
  }

  const [existingCollection] = await productModuleService.listProductCollections(
    { handle: FEATURED_COLLECTION_HANDLE }
  )

  let collectionId = existingCollection?.id

  if (!collectionId) {
    const { result: collections } = await createCollectionsWorkflow(
      container
    ).run({
      input: {
        collections: [
          {
            title: FEATURED_COLLECTION_TITLE,
            handle: FEATURED_COLLECTION_HANDLE,
          },
        ],
      },
    })

    collectionId = collections[0].id
    logger.info(
      `[seed-featured-collection] Created collection "${FEATURED_COLLECTION_TITLE}" (${collectionId}).`
    )
  } else {
    logger.info(
      `[seed-featured-collection] Collection "${FEATURED_COLLECTION_TITLE}" already exists (${collectionId}).`
    )
  }

  await batchLinkProductsToCollectionWorkflow(container).run({
    input: {
      id: collectionId,
      add: products.map((product) => product.id),
    },
  })

  logger.info(
    `[seed-featured-collection] Linked ${products.length} product(s) to the "${FEATURED_COLLECTION_TITLE}" collection.`
  )
}
