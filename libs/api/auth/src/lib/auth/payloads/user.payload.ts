import { User } from '@nekotoko/prisma/monolithic';

export class UserPayload implements Partial<User> {
  id: string;
  username: string;
  roles: string[];
  accessToken: string;
}
