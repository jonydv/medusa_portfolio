import { CreditCard } from "@medusajs/icons"
import Bancontact from "@modules/common/icons/bancontact"
import Ideal from "@modules/common/icons/ideal"
import PayPal from "@modules/common/icons/paypal"
import React from "react"

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<
  string,
  { title: string; icon: React.JSX.Element }
> = {
  pp_stripe_stripe: {
    title: "Credit card",
    icon: <CreditCard />,
  },
  "pp_medusa-payments_default": {
    title: "Credit card",
    icon: <CreditCard />,
  },
  "pp_stripe-ideal_stripe": {
    title: "iDeal",
    icon: <Ideal />,
  },
  "pp_stripe-bancontact_stripe": {
    title: "Bancontact",
    icon: <Bancontact />,
  },
  pp_paypal_paypal: {
    title: "PayPal",
    icon: <PayPal />,
  },
  pp_system_default: {
    title: "Manual Payment",
    icon: <CreditCard />,
  },
  // Add more payment providers here
}

// This only checks if it is native stripe or medusa payments for card payments, it ignores the other stripe-based providers
export const isStripeLike = (providerId?: string) => {
  return (
    providerId?.startsWith("pp_stripe_") || providerId?.startsWith("pp_medusa-")
  )
}

export const isPaypal = (providerId?: string) => {
  return providerId?.startsWith("pp_paypal")
}
export const isManual = (providerId?: string) => {
  return providerId?.startsWith("pp_system_default")
}

// Add currencies that don't need to be divided by 100
export const noDivisionCurrencies = [
  "krw",
  "jpy",
  "vnd",
  "clp",
  "pyg",
  "xaf",
  "xof",
  "bif",
  "djf",
  "gnf",
  "kmf",
  "mga",
  "rwf",
  "xpf",
  "htg",
  "vuv",
  "xag",
  "xdr",
  "xau",
]

export const STORE_NAME = "Medusa Store"

export const FOOTER_LINK_LIMIT = 6
export const NAV_CATEGORY_LINK_LIMIT = 5
export const CATEGORY_HIGHLIGHT_LIMIT = 8
export const LATEST_PRODUCTS_LIMIT = 8

export const FLAG_ICON_SIZE = "16px"
export const DEFAULT_DISPLAY_LOCALE = "en-US"

export const MEDUSA_GITHUB_URL = "https://github.com/medusajs"
export const MEDUSA_DOCS_URL = "https://docs.medusajs.com"
export const MEDUSA_SOURCE_URL = "https://github.com/medusajs/dtc-starter"

export const DEVELOPER_NAME = "Jonatan Villalba"
export const DEVELOPER_PORTFOLIO_URL = "https://www.jonatandvillalbaweb.com.ar/"
export const DEVELOPER_LINKEDIN_URL =
  "https://www.linkedin.com/in/jonatan-david-villalba/?locale=en-US"

export const CATEGORY_CARD_ACCENTS = [
  {
    fallback: "bg-gradient-to-br from-primary to-primary/60",
    badge: "bg-foreground text-background",
  },
  {
    fallback: "bg-gradient-to-br from-foreground to-foreground/70",
    badge: "bg-primary text-primary-foreground",
  },
] as const
