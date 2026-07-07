import { Text, clx } from "@modules/common/components/ui"
import { getTranslations } from "next-intl/server"

import Medusa from "../../../common/icons/medusa"
import NextJs from "../../../common/icons/nextjs"

const MEDUSA_HOME_URL = "https://www.medusajs.com"
const NEXTJS_HOME_URL = "https://nextjs.org"

const ICON_COLOR_BY_VARIANT = {
  light: "#9ca3af",
  dark: "#FFFFFF99",
} as const

const MedusaCTA = async ({
  variant = "light",
}: {
  variant?: "light" | "dark"
}) => {
  const t = await getTranslations("footer")
  const iconColor = ICON_COLOR_BY_VARIANT[variant]

  return (
    <Text
      className={clx("flex gap-x-2 txt-compact-small-plus items-center", {
        "text-white/60": variant === "dark",
      })}
    >
      {t("poweredBy")}
      <a href={MEDUSA_HOME_URL} target="_blank" rel="noreferrer">
        <Medusa color={iconColor} />
      </a>
      &
      <a href={NEXTJS_HOME_URL} target="_blank" rel="noreferrer">
        <NextJs color={iconColor} />
      </a>
    </Text>
  )
}

export default MedusaCTA
