import { ProjectMember } from '@islanddao-platform/api-project-data-access'
import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { Comment, Rating } from '@prisma/client'

@ObjectType()
export class Review {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => ProjectMember, { nullable: true })
  projectMember?: ProjectMember
  @Field()
  projectMemberId!: string
  @HideField()
  comments?: Comment & { ratings?: Rating[] }[]
}
