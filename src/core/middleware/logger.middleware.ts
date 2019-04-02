import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('----------------------------------------------------------------------------------');    
    console.info('Request: ', req.path);
    console.info('Request IP: ', req.ip);
    console.info('Method: ', req.method);
    console.info('Params: ', req.params);
    console.log('----------------------------------------------------------------------------------');
    next();
  }
}
