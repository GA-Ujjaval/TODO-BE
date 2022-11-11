import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService
    ) { }
    generateJwtToken(info: any) {
        console.log('payload', info)
        let payload = info
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
