import { Resolver } from '@nestjs/graphql'
import { ApiFaqItemService } from '@islanddao-platform/api-faq-item-data-access'
import { FaqItem } from '@islanddao-platform/api-faq-item-data-access'

@Resolver(() => FaqItem)
export class ApiFaqItemResolver {
  constructor(private readonly service: ApiFaqItemService) {}
}
