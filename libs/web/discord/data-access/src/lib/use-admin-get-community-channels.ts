import { sdk } from '@islanddao-platform/sdk'
import { useQuery } from '@tanstack/react-query'

export function useAdminGetCommunityChannels({ communityId }: { communityId: string }) {
  const query = useQuery({
    queryKey: ['adminGetCommunityChannels', { communityId }],
    queryFn: () => sdk.adminGetCommunityChannels({ communityId }).then((res) => res.data),
  })

  const items = query.data?.items || []

  return {
    query,
    items,
  }
}
