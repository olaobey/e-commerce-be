/* eslint-disable prettier/prettier */
import { BaseUser } from './base-user.dto';
export class UpdateUserDto extends BaseUser {
  updatedAt: Date;
}
