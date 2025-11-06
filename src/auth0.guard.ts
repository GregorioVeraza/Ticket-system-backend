import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { auth } from 'express-oauth2-jwt-bearer';
import { Request } from 'express';

@Injectable()
export class Auth0Guard implements CanActivate {
  private jwtCheck = auth({
    audience: 'https://eventos.com', // tu API identifier
    issuerBaseURL: 'https://dev-sywqwklbhi1vifgt.us.auth0.com/',
    tokenSigningAlg: 'RS256',
  });

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    try {
      const res = context.switchToHttp().getResponse();

    return new Promise<boolean>((resolve, reject) => {
      this.jwtCheck(req, res, (err) => {
        if (err) reject(new UnauthorizedException(err.message));
        else resolve(true);
      });
    });
      
    } catch (error) {
      console.error('AuthGuard Error:', error);
      throw new UnauthorizedException(error.message);
    }
    
  }
}
