import { Review } from '@islanddao-platform/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type ReviewUiAvatarProps = UiAvatarProps & {
  review?: Review
}

export function ReviewUiAvatar({ review, ...props }: ReviewUiAvatarProps) {
  return <UiAvatar url={review?.projectMember?.user?.avatarUrl} name={review?.name} {...props} />
}
