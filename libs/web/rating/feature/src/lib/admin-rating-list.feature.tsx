import { CoreUiBack, CoreUiDebugModal, CoreUiSearchField } from '@islanddao-platform/web-core-ui'
import { useAdminFindManyRating } from '@islanddao-platform/web-rating-data-access'
import { AdminRatingUiTable } from '@islanddao-platform/web-rating-ui'
import { Button, Group } from '@mantine/core'
import { UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function AdminRatingListFeature() {
  const { deleteRating, items, query, setSearch } = useAdminFindManyRating()

  return (
    <UiPage
      title="Ratings"
      leftAction={<CoreUiBack />}
      rightAction={
        <Group>
          <CoreUiDebugModal data={items} />
          <Button component={Link} to="create">
            Create
          </Button>
        </Group>
      }
    >
      <Group>
        <CoreUiSearchField placeholder="Search rating" setSearch={setSearch} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminRatingUiTable
          deleteRating={(rating) => {
            if (!window.confirm('Are you sure?')) return
            return deleteRating(rating.id)
          }}
          ratings={items}
        />
      ) : (
        <UiInfo message="No ratings found" />
      )}
    </UiPage>
  )
}
