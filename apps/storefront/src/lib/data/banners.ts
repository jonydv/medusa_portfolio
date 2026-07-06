"use server"

import { sdk } from "@lib/config"
import { Banner } from "types/banner"
import { getCacheOptions } from "./cookies"

// NOTE: this fetch has no `revalidate` window and its cache tag depends on
// the `_medusa_cache_id` cookie, which doesn't exist during build-time/ISR
// static generation. In that context the tag is empty and the response
// caches indefinitely (same root cause as the collections caching bug fixed
// earlier) — a banner added/edited in the Admin won't show up in an already
// built/deployed page until a fresh build or a manual cache bust.
export const listBanners = async (): Promise<Banner[]> => {
  const next = {
    ...(await getCacheOptions("banners")),
  }

  return await sdk.client
    .fetch<{ banners: Banner[] }>("/store/banners", {
      next,
      cache: "force-cache",
    })
    .then(({ banners }) => banners)
}
