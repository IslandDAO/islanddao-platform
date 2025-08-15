import { ApiAuthFeatureModule } from '@islanddao-platform/api-auth-feature'
import { ApiCoreDataAccessModule } from '@islanddao-platform/api-core-data-access'
import { ApiDiscordFeatureModule } from '@islanddao-platform/api-discord-feature'
import { ApiIdentityFeatureModule } from '@islanddao-platform/api-identity-feature'
import { ApiProjectFeatureModule } from '@islanddao-platform/api-project-feature'
import { ApiCommentFeatureModule } from '@islanddao-platform/api-comment-feature'
import { ApiRatingFeatureModule } from '@islanddao-platform/api-rating-feature'
import { ApiReviewFeatureModule } from '@islanddao-platform/api-review-feature'
import { ApiCommunityFeatureModule } from '@islanddao-platform/api-community-feature'
import { ApiUserFeatureModule } from '@islanddao-platform/api-user-feature'
import { Module } from '@nestjs/common'
import { ApiCoreController } from './api-core.controller'
import { ApiCoreResolver } from './api-core.resolver'
import { ApiFaqItemFeatureModule } from '@islanddao-platform/api-faq-item-feature'

const imports = [
  // The api-feature generator will add the imports here
  ApiAuthFeatureModule,
  ApiCoreDataAccessModule,
  ApiDiscordFeatureModule,
  ApiIdentityFeatureModule,
  ApiProjectFeatureModule,
  ApiCommentFeatureModule,
  ApiRatingFeatureModule,
  ApiReviewFeatureModule,
  ApiCommunityFeatureModule,
  ApiUserFeatureModule,
  ApiFaqItemFeatureModule,
]

@Module({
  controllers: [ApiCoreController],
  imports: [...imports],
  providers: [ApiCoreResolver],
})
export class ApiCoreFeatureModule {}
