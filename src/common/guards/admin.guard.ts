
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { WorkPosition } from '../../models/enums/work-position.emun';

@Injectable()
export class AdminGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return user && user.role.includes(WorkPosition.admin);
  }
}