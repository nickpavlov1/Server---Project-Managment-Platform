"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.Token = common_1.createParamDecorator((_, req) => req.args[0].headers.authorization);
//# sourceMappingURL=token.decorator.js.map