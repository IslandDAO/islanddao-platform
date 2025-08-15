import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@islanddao-platform/api-core-data-access'
import { Community } from './community.entity'

@ObjectType()
export class CommunityPaging extends PagingResponse<Community>(Community) {}
