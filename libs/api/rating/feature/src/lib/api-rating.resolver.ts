import { Resolver } from '@nestjs/graphql'
import { ApiRatingService } from '@islanddao-platform/api-rating-data-access'
import { Rating } from '@islanddao-platform/api-rating-data-access'

@Resolver(() => Rating)
export class ApiRatingResolver {
  constructor(private readonly service: ApiRatingService) {}
}
