import { ApiAuthGraphQLUserGuard, CtxUserId } from '@islanddao-platform/api-auth-data-access'
import {
  ApiRatingService,
  ManagerCreateRatingInput,
  ManagerUpdateRatingInput,
  Rating,
} from '@islanddao-platform/api-rating-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiRatingManagerResolver {
  constructor(private readonly service: ApiRatingService) {}

  @Mutation(() => Rating, { nullable: true })
  managerCreateRating(@CtxUserId() userId: string, @Args('input') input: ManagerCreateRatingInput) {
    return this.service.manager.createRating(userId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  managerDeleteRating(@CtxUserId() userId: string, @Args('ratingId') ratingId: string) {
    return this.service.manager.deleteRating(userId, ratingId)
  }

  @Mutation(() => Rating, { nullable: true })
  managerUpdateRating(
    @CtxUserId() userId: string,
    @Args('ratingId') ratingId: string,
    @Args('input') input: ManagerUpdateRatingInput,
  ) {
    return this.service.manager.updateRating(userId, ratingId, input)
  }
}
