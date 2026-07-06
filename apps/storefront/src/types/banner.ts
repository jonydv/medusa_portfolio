export type Banner = {
  id: string
  title: string
  subtitle: string | null
  image_url: string
  cta_label: string | null
  cta_href: string | null
  rank: number
  is_active: boolean
  starts_at: string | null
  ends_at: string | null
}
