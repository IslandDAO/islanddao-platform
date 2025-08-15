import { sdk } from '@islanddao-platform/sdk'
import { useQuery } from '@tanstack/react-query'

export function useAdminGetProjectChannels({ projectId }: { projectId: string }) {
  const query = useQuery({
    queryKey: ['adminGetProjectChannels', { projectId }],
    queryFn: () => sdk.adminGetProjectChannels({ projectId }).then((res) => res.data),
  })

  const items = query.data?.items || []

  return {
    query,
    items,
  }
}
