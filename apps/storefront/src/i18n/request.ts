import { getRequestConfig } from "next-intl/server"
import { getLocale as getStoreLocale } from "@lib/data/locale-actions"

const DEFAULT_LOCALE = "en"

export default getRequestConfig(async () => {
  const storeLocale = await getStoreLocale()
  const locale = storeLocale?.slice(0, 2).toLowerCase() || DEFAULT_LOCALE

  let messages
  try {
    messages = (await import(`../messages/${locale}.json`)).default
  } catch {
    messages = (await import(`../messages/${DEFAULT_LOCALE}.json`)).default
  }

  return {
    locale,
    messages,
  }
})
