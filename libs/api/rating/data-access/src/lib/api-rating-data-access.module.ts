import { ApiCoreDataAccessModule } from '@islanddao-platform/api-core-data-access'
import { ApiProjectDataAccessModule } from '@islanddao-platform/api-project-data-access'
import { Module } from '@nestjs/common'
import { ApiAdminRatingService } from './api-admin-rating.service'
import { ApiManagerRatingService } from './api-manager-rating.service'
import { ApiRatingService } from './api-rating.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiProjectDataAccessModule],
  providers: [ApiRatingService, ApiManagerRatingService, ApiAdminRatingService],
  exports: [ApiRatingService],
})
export class ApiRatingDataAccessModule {}
