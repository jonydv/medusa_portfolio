import { listProducts } from "@lib/data/products"
import { LATEST_PRODUCTS_LIMIT } from "@lib/constants"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@modules/common/components/ui"
import ProductPreview from "@modules/products/components/product-preview"
import { getTranslations } from "next-intl/server"

export default async function LatestProducts({
  region,
}: {
  region: HttpTypes.StoreRegion
}) {
  const t = await getTranslations("home.latestProducts")
  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: LATEST_PRODUCTS_LIMIT,
      order: "-created_at",
      fields: "*variants.calculated_price",
    },
  })

  if (!products.length) {
    return null
  }

  return (
    <div className="content-container py-12 small:py-24">
      <div className="flex justify-between mb-8">
        <Text className="txt-xlarge">{t("heading")}</Text>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-3 gap-x-6 gap-y-24 small:gap-y-36">
        {products.map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}
      </ul>
    </div>
  )
}
