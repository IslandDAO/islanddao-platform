import { CoreUiDebugModal, CoreUiPageLimit, CoreUiSearchField } from '@islanddao-platform/web-core-ui'
import { useAdminFindManyReview } from '@islanddao-platform/web-review-data-access'
import { AdminReviewUiTable } from '@islanddao-platform/web-review-ui'
import { Group } from '@mantine/core'
import { UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'

export function AdminReviewListFeature({ projectId }: { projectId: string }) {
  const { deleteReview, items, pagination, query, setSearch } = useAdminFindManyReview({
    limit: 10,
    projectId,
  })

  return (
    <UiStack>
      <Group>
        <CoreUiSearchField placeholder="Search review" setSearch={setSearch} />
        <CoreUiDebugModal data={items} />
        <CoreUiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminReviewUiTable
          deleteReview={(review) => {
            if (!window.confirm('Are you sure?')) return
            return deleteReview(review.id)
          }}
          reviews={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No reviews found" />
      )}
    </UiStack>
  )
}
