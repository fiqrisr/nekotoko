import { ExecutionContext } from '@nestjs/common';
import jwt_decode from 'jwt-decode';
import { createRolesGuard } from 'nestjs-roles';

import { Role } from './enum/role.enum';

function getRole(context: ExecutionContext) {
  const request = context.switchToHttp().getRequest();
  const jwtToken = jwt_decode(request.headers.authorization);

  return jwtToken['roles'][0];
}

export const RoleGuard = createRolesGuard<Role>(getRole);
