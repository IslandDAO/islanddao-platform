import { Community, ManagerCreateProjectInput } from '@islanddao-platform/sdk'
import { useManagerFindManyProject } from '@islanddao-platform/web-project-data-access'
import { ManagerProjectUiCreateForm } from '@islanddao-platform/web-project-ui'
import { toastError } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function ManagerProjectCreateFeature({
  communities,
  communityId,
  close,
  refresh,
}: {
  communities: Community[]
  communityId?: string | null | undefined
  close: () => void
  refresh: () => Promise<void>
}) {
  const navigate = useNavigate()
  const { createProject } = useManagerFindManyProject()

  async function submit(input: ManagerCreateProjectInput, addMore?: boolean) {
    return createProject(input)
      .then((res) => {
        if (res) {
          refresh()
          if (!addMore) {
            close()
            navigate(res.manageUrl)
          }
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return <ManagerProjectUiCreateForm communities={communities} communityId={communityId} submit={submit} />
}
