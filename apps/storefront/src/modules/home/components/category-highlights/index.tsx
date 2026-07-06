import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Heading, Text } from "@modules/common/components/ui"

export default async function CategoryHighlights() {
  const productCategories = await listCategories()
  const rootCategories = productCategories?.filter((c) => !c.parent_category)

  if (!rootCategories?.length) {
    return null
  }

  return (
    <div className="content-container py-12 small:py-24">
      {/* TODO(i18n): "Shop by Category" is hardcoded pending the next-intl migration */}
      <Heading level="h2" className="mb-8">
        Shop by Category
      </Heading>
      <div className="grid grid-cols-2 gap-4 small:grid-cols-4">
        {rootCategories.slice(0, 8).map((category) => (
          <LocalizedClientLink
            key={category.id}
            href={`/categories/${category.handle}`}
            className="flex items-center justify-center rounded-lg border border-ui-border-base bg-ui-bg-subtle px-4 py-10 text-center transition-colors hover:bg-ui-bg-subtle-hover"
          >
            <Text className="txt-large-plus text-ui-fg-base">
              {category.name}
            </Text>
          </LocalizedClientLink>
        ))}
      </div>
    </div>
  )
}
