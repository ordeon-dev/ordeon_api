import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserContextService } from './user-context.service';

export const GetActualUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    const userContextService = new UserContextService();

    userContextService.setUser(user);
    return user;
  },
);