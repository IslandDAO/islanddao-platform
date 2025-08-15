import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@islanddao-platform/api-core-data-access'
import { Project } from './project.entity'

@ObjectType()
export class ProjectPaging extends PagingResponse<Project>(Project) {}
