import { Comment, ManagerCreateRatingInput, ManagerUpdateRatingInput } from '@islanddao-platform/sdk'
import { CoreUiDivider } from '@islanddao-platform/web-core-ui'
import { UiStack } from '@pubkey-ui/core'
import React from 'react'
import { ManagerCommentUiTimelineItem } from './manager-comment-ui-timeline-item'

export function ManagerCommentUiTimeline({
  comments = [],
  createRating,
  deleteRating,
  updateRating,
}: {
  comments: Comment[]
  createRating: (res: ManagerCreateRatingInput) => Promise<boolean>
  deleteRating: (ratingId: string) => Promise<boolean>
  updateRating: (ratingId: string, res: ManagerUpdateRatingInput) => Promise<boolean>
}) {
  return (
    <UiStack>
      {comments.map((comment) => (
        <UiStack key={comment.id}>
          <CoreUiDivider />
          <ManagerCommentUiTimelineItem
            key={comment.id}
            comment={comment}
            createRating={createRating}
            deleteRating={deleteRating}
            updateRating={updateRating}
          />
        </UiStack>
      ))}
    </UiStack>
  )
}
