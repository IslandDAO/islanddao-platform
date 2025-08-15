import { DiscordServer, sdk } from '@islanddao-platform/sdk'
import { useQuery } from '@tanstack/react-query'

export function useAdminGetDiscordServers() {
  const query = useQuery({
    queryKey: ['adminGetDiscordServers'],
    queryFn: () => sdk.adminGetDiscordServers().then((res) => res.data),
  })

  const items: DiscordServer[] = query?.data?.items ?? []

  return {
    query,
    items,
  }
}
