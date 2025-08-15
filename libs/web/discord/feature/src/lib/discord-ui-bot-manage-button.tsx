import { DiscordBot } from '@islanddao-platform/sdk'
import { Button } from '@mantine/core'

export function DiscordUiBotManageButton({ item }: { item: DiscordBot }) {
  return (
    <Button component="a" href={item?.manageUrl ?? ''} target="_blank" rel="noreferrer noopener" variant="light">
      Manage Bot
    </Button>
  )
}
