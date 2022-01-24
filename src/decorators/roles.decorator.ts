import { SetMetadata } from '@nestjs/common';
import { MemberRoles } from 'src/entities';

export const Roles = (...roles: MemberRoles[]) => SetMetadata('roles', roles);
