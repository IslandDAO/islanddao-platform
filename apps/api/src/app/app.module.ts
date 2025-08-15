import { Module } from '@nestjs/common'
import { ApiCoreFeatureModule } from '@islanddao-platform/api-core-feature'

@Module({
  imports: [ApiCoreFeatureModule],
})
export class AppModule {}
