import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@islanddao-platform/api-core-data-access'

@InputType()
export class FaqItemUserFindManyInput {
  @Field({ nullable: true })
  search?: string
}
