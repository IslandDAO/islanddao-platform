import { User } from '@islanddao-platform/api-user-data-access'
import { Prisma, UserRole } from '@prisma/client'

export function getProjectWhereManagerAccessInput({ id: userId, role }: User): Prisma.ProjectWhereInput {
  if (role === UserRole.Admin) {
    return {}
  }
  return {
    AND: {
      OR: [
        // You are a manager of the project
        { members: { some: { userId } } },
        // Or you are a manager of the community
        { community: { managers: { some: { userId } } } },
      ],
    },
  }
}
