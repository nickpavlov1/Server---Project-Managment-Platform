import { createParamDecorator } from '@nestjs/common';

export const Token = createParamDecorator(
  (_, req) => {
    console.log(req.args);
    console.log(req.args[0]);
    console.log(req.args.connection);
    console.log((req as any).headers);
    req.args[0].headers.authorization
  }
);
