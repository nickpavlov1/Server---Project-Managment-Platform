import { createParamDecorator } from '@nestjs/common';

export const Token = createParamDecorator((_, req) => req.args[0].headers.authorization);
