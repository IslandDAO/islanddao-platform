import { sdk } from '@islanddao-platform/sdk'
import { useQuery } from '@tanstack/react-query'

export function useAdminGetDiscordBot() {
  const query = useQuery({
    queryKey: ['adminGetDiscordBot'],
    queryFn: () => sdk.adminGetDiscordBot().then((res) => res.data),
  })

  const item = query?.data?.item

  return {
    query,
    item,
  }
}
