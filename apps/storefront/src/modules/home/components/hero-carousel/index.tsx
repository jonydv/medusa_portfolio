"use client"

import { ChevronLeft, ChevronRight } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button, Heading, Text, clx } from "@modules/common/components/ui"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useState } from "react"
import { Banner } from "types/banner"

const AUTOPLAY_DELAY_MS = 6000

export default function HeroCarousel({ banners }: { banners: Banner[] }) {
  const t = useTranslations("home.heroCarousel")
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: AUTOPLAY_DELAY_MS,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    }),
  ])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  useEffect(() => {
    if (!emblaApi) {
      return
    }

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())

    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect()

    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  )

  return (
    <div
      className="relative h-[75vh] w-full overflow-hidden border-b border-ui-border-base"
      role="region"
      aria-roledescription="carousel"
    >
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className="relative h-full min-w-0 flex-[0_0_100%]"
            >
              <img
                src={banner.image_url}
                alt={banner.title}
                className="h-full w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/30 p-6 text-center">
                <Heading level="h1" className="text-3xl text-white">
                  {banner.title}
                </Heading>
                {banner.subtitle && (
                  <Text className="text-white/90">{banner.subtitle}</Text>
                )}
                {banner.cta_label && banner.cta_href && (
                  <LocalizedClientLink href={banner.cta_href}>
                    <Button variant="primary" className="mt-2">
                      {banner.cta_label}
                    </Button>
                  </LocalizedClientLink>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {banners.length > 1 && (
        <>
          <button
            type="button"
            aria-label={t("previousSlide")}
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label={t("nextSlide")}
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white"
          >
            <ChevronRight />
          </button>

          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={t("goToSlide", { number: index + 1 })}
                onClick={() => scrollTo(index)}
                className={clx(
                  "h-2 rounded-full transition-all",
                  index === selectedIndex ? "w-6 bg-white" : "w-2 bg-white/50"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
