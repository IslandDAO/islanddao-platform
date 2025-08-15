import { ApiCoreService } from '@islanddao-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ApiUserEventService {
  constructor(private readonly core: ApiCoreService) {}
}
