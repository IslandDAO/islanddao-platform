import { User } from '@islanddao-platform/api-user-data-access'
import { Injectable } from '@nestjs/common'
import { UserRole } from '@prisma/client'
import { ApiCommunityDataService } from './api-community-data.service'
import { ManagerCreateCommunityInput } from './dto/manager-create-community.input'
import { ManagerFindManyCommunityInput } from './dto/manager-find-many-community.input'
import { ManagerUpdateCommunityInput } from './dto/manager-update-community.input'
import { CommunityPaging } from './entity/community-paging.entity'
import { getManagerCommunityWhereInput } from './helpers/get-manager-community-where.input'

@Injectable()
export class ApiCommunityDataManagerService {
  constructor(private readonly data: ApiCommunityDataService) {}

  async addCommunityManager(userId: string, communityId: string, managerId: string) {
    await this.data.ensureCommunityAdmin({ communityId, userId })

    return this.data.addCommunityManager(userId, communityId, managerId)
  }

  async createCommunity(userId: string, input: ManagerCreateCommunityInput) {
    // Only admins can create communities
    await this.data.core.ensureUserRoleAdmin(userId)

    return this.data.createCommunity(userId, input)
  }

  async deleteCommunity(userId: string, communityId: string) {
    await this.data.ensureCommunityAdmin({ communityId, userId })

    return this.data.deleteCommunity(userId, communityId)
  }

  async getCommunityManagers(communityId: string) {
    return this.data.getCommunityManagers(communityId)
  }

  async getCommunityManager(userId: string, communityId: string) {
    return this.data.getCommunityManager({ userId, communityId })
  }

  async findManyCommunity(user: User, input: ManagerFindManyCommunityInput): Promise<CommunityPaging> {
    return this.data.findManyCommunity({
      orderBy: { name: 'asc' },
      where: getManagerCommunityWhereInput(user, input),
      limit: input.limit ?? 10,
      page: input.page ?? 1,
      include: { managers: true, projects: true },
    })
  }

  async findOneCommunity({ id: userId, role }: User, communityId: string) {
    return this.data.findOneCommunity(communityId, { userId: role === UserRole.Admin ? undefined : userId })
  }

  async updateCommunity(userId: string, communityId: string, input: ManagerUpdateCommunityInput) {
    await this.data.ensureCommunityAdmin({ communityId, userId })
    return this.data.updateCommunity(communityId, input)
  }

  async removeCommunityManager(userId: string, communityId: string, managerId: string) {
    await this.data.ensureCommunityAdmin({ communityId, userId })
    return this.data.removeCommunityManager(userId, communityId, managerId)
  }

  async toggleCommunityAdmin(userId: string, communityId: string, managerId: string) {
    await this.data.ensureCommunityAdmin({ communityId, userId })
    if (userId === managerId) {
      throw new Error('Cannot toggle self')
    }
    return this.data.toggleCommunityAdmin(userId, communityId, managerId)
  }
}
