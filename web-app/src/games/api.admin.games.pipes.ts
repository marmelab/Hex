import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class SimpleJsonParsePipe<T> implements PipeTransform<any, T> {
  transform(value: any, _metadata: ArgumentMetadata): T | null {
    if (value) {
      return JSON.parse(value) as T;
    } else {
      return null;
    }
  }
}
