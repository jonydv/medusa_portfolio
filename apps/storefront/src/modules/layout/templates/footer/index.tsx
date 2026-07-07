import { Link as LinkIcon, Linkedin } from "@medusajs/icons";
import { listCategories } from "@lib/data/categories";
import { listCollections } from "@lib/data/collections";
import {
  DEVELOPER_LINKEDIN_URL,
  DEVELOPER_NAME,
  DEVELOPER_PORTFOLIO_URL,
  FOOTER_LINK_LIMIT,
  MEDUSA_DOCS_URL,
  MEDUSA_GITHUB_URL,
  MEDUSA_SOURCE_URL,
  STORE_NAME,
} from "@lib/constants";
import { Text, clx } from "@modules/common/components/ui";
import { getTranslations } from "next-intl/server";

import LocalizedClientLink from "@modules/common/components/localized-client-link";
import MedusaCTA from "@modules/layout/components/medusa-cta";

export default async function Footer() {
  const t = await getTranslations("footer");
  const tCommon = await getTranslations("common");
  const { collections } = await listCollections({
    fields: "*products",
  });
  const productCategories = await listCategories();

  return (
    <footer className="bg-neutral-200 text-secondary w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-40">
          <div>
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-primary hover:text-secondary uppercase transition-colors"
            >
              {STORE_NAME}
            </LocalizedClientLink>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="txt-small-plus text-secondary inline-block border-b-2 border-primary pb-2">
                  {t("categoriesHeading")}
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, FOOTER_LINK_LIMIT).map((c) => {
                    if (c.parent_category) {
                      return;
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null;

                    return (
                      <li
                        className="flex flex-col gap-2 text-secondary/70 txt-small"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-primary transition-colors",
                            children && "txt-small-plus"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-primary transition-colors"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="txt-small-plus text-secondary inline-block border-b-2 border-primary pb-2">
                  {t("collectionsHeading")}
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-secondary/70 txt-small",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, FOOTER_LINK_LIMIT).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-primary transition-colors"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-3">
              <span className="txt-small-plus text-secondary inline-block border-b-2 border-primary pb-2">
                {t("medusaHeading")}
              </span>
              <ul className="grid grid-cols-1 gap-y-2 text-secondary/70 txt-small">
                <li>
                  <a
                    href={MEDUSA_GITHUB_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {t("github")}
                  </a>
                </li>
                <li>
                  <a
                    href={MEDUSA_DOCS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {t("documentation")}
                  </a>
                </li>
                <li>
                  <a
                    href={MEDUSA_SOURCE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {t("sourceCode")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-16 justify-between text-secondary/60">
          <Text className="txt-compact-small">
            {tCommon("copyright", {
              year: new Date().getFullYear(),
              storeName: STORE_NAME,
            })}
          </Text>
          <MedusaCTA />
        </div>
        <div className="flex w-full mb-8 items-center justify-center gap-x-3 border-t border-border pt-8 text-secondary/70">
          <Text className="txt-compact-small">
            {t("developedBy", {
              name: DEVELOPER_NAME,
              year: new Date().getFullYear(),
            })}
          </Text>
          <div className="flex items-center gap-x-2">
            <a
              href={DEVELOPER_PORTFOLIO_URL}
              target="_blank"
              rel="noreferrer"
              aria-label={t("visitPortfolio", { name: DEVELOPER_NAME })}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <LinkIcon />
            </a>
            <a
              href={DEVELOPER_LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              aria-label={t("visitLinkedin", { name: DEVELOPER_NAME })}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Linkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
