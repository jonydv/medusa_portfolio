import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getLocale } from "next-intl/server"
import { Plus_Jakarta_Sans } from "next/font/google"
import "styles/globals.css"

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const locale = await getLocale()

  return (
    <html lang={locale} data-mode="light" className={fontSans.variable}>
      <body className="bg-background text-secondary font-sans">
        <NextIntlClientProvider>
          <main className="relative">{props.children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
