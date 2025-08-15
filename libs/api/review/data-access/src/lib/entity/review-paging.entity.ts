import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@islanddao-platform/api-core-data-access'
import { Review } from './review.entity'

@ObjectType()
export class ReviewPaging extends PagingResponse<Review>(Review) {}
