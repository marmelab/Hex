import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import {
  GamesDeleteParams,
  GamesSearchParams,
} from './api.admin.games.service';

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

@Injectable()
export class GamesDeleteParamsPipe
  implements PipeTransform<any, GamesDeleteParams>
{
  transform(value: any, _metadata: ArgumentMetadata): GamesDeleteParams | null {
    if (value) {
      return JSON.parse(value) as GamesDeleteParams;
    } else {
      return null;
    }
  }
}
