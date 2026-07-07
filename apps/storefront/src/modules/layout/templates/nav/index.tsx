import { Suspense } from "react"

import { listCategories } from "@lib/data/categories"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { NAV_CATEGORY_LINK_LIMIT, STORE_NAME } from "@lib/constants"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { getTranslations } from "next-intl/server"

export default async function Nav() {
  const t = await getTranslations("nav")
  const [regions, locales, currentLocale, productCategories] =
    await Promise.all([
      listRegions().then((regions: StoreRegion[]) => regions),
      listLocales(),
      getLocale(),
      listCategories(),
    ])

  const rootCategories = productCategories?.filter((c) => !c.parent_category)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-background border-border">
        <nav className="content-container txt-xsmall-plus text-foreground/70 flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center gap-x-6">
            <div className="h-full">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
                categories={rootCategories}
              />
            </div>
            {!!rootCategories?.length && (
              <div className="hidden small:flex items-center gap-x-6 h-full">
                {rootCategories.slice(0, NAV_CATEGORY_LINK_LIMIT).map((category) => (
                  <LocalizedClientLink
                    key={category.id}
                    href={`/categories/${category.handle}`}
                    className="hover:text-primary transition-colors"
                    data-testid="nav-category-link"
                  >
                    {category.name}
                  </LocalizedClientLink>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-primary hover:text-secondary uppercase transition-colors"
              data-testid="nav-store-link"
            >
              {STORE_NAME}
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-primary transition-colors"
                href="/account"
                data-testid="nav-account-link"
              >
                {t("account")}
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-primary transition-colors flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  {t("cartFallback")}
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
