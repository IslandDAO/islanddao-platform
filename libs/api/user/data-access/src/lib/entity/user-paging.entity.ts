import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@islanddao-platform/api-core-data-access'
import { User } from './user.entity'

@ObjectType()
export class UserPaging extends PagingResponse<User>(User) {}
