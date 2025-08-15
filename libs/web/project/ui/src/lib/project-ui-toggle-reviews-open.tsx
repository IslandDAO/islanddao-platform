import { ManagerUpdateProjectInput, Project } from '@islanddao-platform/sdk'
import { Switch } from '@mantine/core'
import { toastInfo } from '@pubkey-ui/core'

export function ProjectUiToggleReviewsOpen({
  project,
  update,
}: {
  project: Project
  update: (input: ManagerUpdateProjectInput) => Promise<Project | null>
}) {
  return (
    <Switch
      label="Public"
      description="All users with access to the platform can review the project. To restrict access to specific users, toggle off 'public'.
Be aware that all the projects are visible to everyone."
      checked={project?.reviewsOpen ?? false}
      onChange={(e) =>
        update({ reviewsOpen: e.target.checked }).then((updated) => {
          if (updated) {
            toastInfo(`Open reviews ${updated.reviewsOpen ? 'enabled' : 'disabled'}`)
          }
        })
      }
    />
  )
}
