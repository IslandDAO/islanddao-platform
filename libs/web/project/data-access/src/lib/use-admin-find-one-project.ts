import { AdminUpdateProjectInput } from '@deanslist-platform/sdk'
import { useSdk } from '@deanslist-platform/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneProject({ projectId }: { projectId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['admin', 'find-one-project', projectId],
    queryFn: () => sdk.adminFindOneProject({ projectId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updateProject: async (input: AdminUpdateProjectInput) =>
      sdk
        .adminUpdateProject({ projectId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Project updated')
            await query.refetch()
            return res.updated
          }
          toastError('Project not updated')
          return null
        })
        .catch((err) => {
          toastError(err.message)
          return null
        }),
  }
}
