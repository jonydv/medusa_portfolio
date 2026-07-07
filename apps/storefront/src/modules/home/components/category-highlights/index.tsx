import { listCategories } from "@lib/data/categories"
import { CATEGORY_CARD_ACCENTS, CATEGORY_HIGHLIGHT_LIMIT } from "@lib/constants"
import { Tag } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Heading, Text } from "@modules/common/components/ui"
import { getTranslations } from "next-intl/server"

export default async function CategoryHighlights() {
  const t = await getTranslations("home.categoryHighlights")
  const productCategories = await listCategories()
  const rootCategories = productCategories?.filter((c) => !c.parent_category)

  if (!rootCategories?.length) {
    return null
  }

  return (
    <div className="content-container py-12 small:py-24">
      <Heading level="h2" className="mb-8 text-secondary">
        {t("heading")}
      </Heading>
      <div className="grid grid-cols-2 gap-4 small:grid-cols-4">
        {rootCategories.slice(0, CATEGORY_HIGHLIGHT_LIMIT).map((category, index) => {
          const accent = CATEGORY_CARD_ACCENTS[index % CATEGORY_CARD_ACCENTS.length]
          const thumbnail = category.products?.[0]?.thumbnail

          return (
            <LocalizedClientLink
              key={category.id}
              href={`/categories/${category.handle}`}
              className="group relative flex h-48 flex-col justify-end overflow-hidden rounded-large border border-border transition-shadow duration-300 hover:shadow-card"
            >
              {thumbnail ? (
                <>
                  <img
                    src={thumbnail}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/10 to-transparent" />
                </>
              ) : (
                <div className={`absolute inset-0 ${accent.fallback}`} />
              )}

              <div
                className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full ${accent.badge}`}
              >
                <Tag />
              </div>

              <Text className="relative z-10 p-4 txt-large-plus text-white drop-shadow-sm">
                {category.name}
              </Text>
            </LocalizedClientLink>
          )
        })}
      </div>
    </div>
  )
}
