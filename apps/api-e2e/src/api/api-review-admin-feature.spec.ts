import { AdminFindManyReviewInput } from '@islanddao-platform/sdk'
import {
  getAliceCookie,
  getBobCookie,
  managerCreateActiveProject,
  managerCreateCommunity,
  reviewerCreateReview,
  sdk,
} from '../support'

describe('api-review-feature', () => {
  describe('api-review-admin-resolver', () => {
    let reviewId: string
    let communityId: string
    let projectId: string
    let alice: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      communityId = await managerCreateCommunity({ cookie: alice }).then((community) => community.id)
    })

    beforeEach(async () => {
      projectId = await managerCreateActiveProject({ cookie: alice, communityId }).then((project) => project.id)
      reviewId = await reviewerCreateReview({ cookie: alice, projectId }).then((review) => review.id)
    })

    describe('authorized', () => {
      it('should find a list of reviews (find all)', async () => {
        const input: AdminFindManyReviewInput = { projectId, limit: 10000 }

        const res = await sdk.adminFindManyReview({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThanOrEqual(1)
        expect(res.data.paging.data.length).toBeGreaterThanOrEqual(1)
        // First item should be the one we created above
        expect(res.data.paging.data.map((r) => r.id)).toContain(reviewId)
      })

      it('should find a list of reviews (find new one)', async () => {
        const input: AdminFindManyReviewInput = {
          projectId,
          search: reviewId,
        }

        const res = await sdk.adminFindManyReview({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(reviewId)
      })

      it('should find a review by id', async () => {
        const res = await sdk.adminFindOneReview({ reviewId }, { cookie: alice })

        expect(res.data.item.id).toBe(reviewId)
      })

      it('should delete a review', async () => {
        const res = await sdk.adminDeleteReview({ reviewId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyReview({ input: { projectId, search: reviewId } }, { cookie: alice })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let bob: string
      beforeAll(async () => {
        bob = await getBobCookie()
      })

      it('should not find a list of reviews (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyReview({ input: { projectId } }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a review by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneReview({ reviewId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a review', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteReview({ reviewId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
