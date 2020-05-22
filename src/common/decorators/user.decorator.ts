import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((_, req) => req.args[0].res.req.user);
