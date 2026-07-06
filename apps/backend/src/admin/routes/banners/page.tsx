import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Photo } from "@medusajs/icons"
import {
  Button,
  Container,
  Heading,
  createDataTableColumnHelper,
  DataTable,
  DataTablePaginationState,
  Switch,
  useDataTable,
} from "@medusajs/ui"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { sdk } from "../../lib/config"
import BannerFormModal from "./banner-form-modal"

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

const limit = 20

const formatDate = (value: string | null) =>
  value ? new Date(value).toLocaleDateString() : "—"

const BannersPage = () => {
  const queryClient = useQueryClient()
  const [pagination, setPagination] = useState<DataTablePaginationState>({
    pageSize: limit,
    pageIndex: 0,
  })
  const [formOpen, setFormOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)

  const { data, isLoading } = useQuery({
    queryFn: () => sdk.client.fetch<{ banners: Banner[] }>("/admin/banners"),
    queryKey: ["banners"],
  })

  const banners = data?.banners ?? []

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["banners"] })

  const toggleActive = async (banner: Banner) => {
    await sdk.client.fetch(`/admin/banners/${banner.id}`, {
      method: "POST",
      body: { is_active: !banner.is_active },
    })
    invalidate()
  }

  const deleteBanner = async (banner: Banner) => {
    await sdk.client.fetch(`/admin/banners/${banner.id}`, { method: "DELETE" })
    invalidate()
  }

  const columnHelper = createDataTableColumnHelper<Banner>()

  const columns = useMemo(
    () => [
      columnHelper.accessor("title", { header: "Title" }),
      columnHelper.accessor("rank", { header: "Rank" }),
      columnHelper.accessor("is_active", {
        header: "Active",
        cell: ({ row }) => (
          <Switch
            checked={row.original.is_active}
            onCheckedChange={() => toggleActive(row.original)}
          />
        ),
      }),
      columnHelper.accessor("starts_at", {
        header: "Starts",
        cell: ({ getValue }) => formatDate(getValue()),
      }),
      columnHelper.accessor("ends_at", {
        header: "Ends",
        cell: ({ getValue }) => formatDate(getValue()),
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex justify-end gap-2">
            <Button
              size="small"
              variant="secondary"
              onClick={() => {
                setEditingBanner(row.original)
                setFormOpen(true)
              }}
            >
              Edit
            </Button>
            <Button
              size="small"
              variant="danger"
              onClick={() => deleteBanner(row.original)}
            >
              Delete
            </Button>
          </div>
        ),
      }),
    ],
    []
  )

  const table = useDataTable({
    columns,
    data: banners,
    getRowId: (row) => row.id,
    rowCount: banners.length,
    isLoading,
    pagination: {
      state: pagination,
      onPaginationChange: setPagination,
    },
  })

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Banners</Heading>
        <Button
          size="small"
          onClick={() => {
            setEditingBanner(null)
            setFormOpen(true)
          }}
        >
          Create banner
        </Button>
      </div>
      <DataTable instance={table}>
        <DataTable.Table />
        <DataTable.Pagination />
      </DataTable>
      <BannerFormModal
        open={formOpen}
        banner={editingBanner}
        onOpenChange={setFormOpen}
        onSaved={invalidate}
      />
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Banners",
  icon: Photo,
})

export default BannersPage
