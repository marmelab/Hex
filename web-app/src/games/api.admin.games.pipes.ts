import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { GamesSearchParams } from './api.admin.games.service';

@Injectable()
export class GamesSearchParamsPipe
  implements PipeTransform<any, GamesSearchParams>
{
  transform(value: any, _metadata: ArgumentMetadata): GamesSearchParams | null {
    if (value) {
      return JSON.parse(value) as GamesSearchParams;
    } else {
      return null;
    }
  }
}
