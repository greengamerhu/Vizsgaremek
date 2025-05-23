import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-http-bearer";
import { AuthService } from "./auth.service";
import { Logger } from 'nestjs-pino';


@Injectable()
export default class TokenStrategy extends PassportStrategy(Strategy) {
   constructor(private authService : AuthService, private readonly logger: Logger) {
    super();
   }
    async validate(token :string) {
        const user = await this.authService.findUserByToken(token)
        
        if (user == null) {
            this.logger.warn("Megpróbáltak elérni egy védett útvonalat token nélkül")
            throw new UnauthorizedException();
        }
        return user;
    }
}