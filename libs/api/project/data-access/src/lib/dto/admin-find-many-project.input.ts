import { PagingInput } from '@islanddao-platform/api-core-data-access'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminFindManyProjectInput extends PagingInput() {
  @Field({ nullable: true })
  communityId?: string
  @Field({ nullable: true })
  search?: string
}
