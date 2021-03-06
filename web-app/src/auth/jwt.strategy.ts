import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './auth.constant';
import { JWTPayload, UserDataInjectedInRequestAfterAuth } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(
    payload: JWTPayload,
  ): Promise<UserDataInjectedInRequestAfterAuth> {
    return {
      id: payload.sub,
      username: payload.username,
      admin: payload.admin,
    };
  }
}
