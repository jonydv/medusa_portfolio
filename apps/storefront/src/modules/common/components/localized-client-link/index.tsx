"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"

const isExternalHref = (href: string) => /^https?:\/\//i.test(href)

/**
 * Use this component to create a Next.js `<Link />` that persists the current country code in the url,
 * without having to explicitly pass it as a prop. Absolute URLs (http/https) are treated as external
 * links and rendered as a plain `<a target="_blank">` instead, since they shouldn't be prefixed with
 * the store's country code.
 */
const LocalizedClientLink = ({
  children,
  href,
  ...props
}: {
  children?: React.ReactNode
  href: string
  className?: string
  onClick?: () => void
  passHref?: true
  [x: string]: unknown
}) => {
  const { countryCode } = useParams()

  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link href={`/${countryCode}${href}`} {...props}>
      {children}
    </Link>
  )
}

export default LocalizedClientLink
