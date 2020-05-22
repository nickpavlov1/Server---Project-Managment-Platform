"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.User = common_1.createParamDecorator((_, req) => req.args[0].res.req.user);
//# sourceMappingURL=user.decorator.js.map