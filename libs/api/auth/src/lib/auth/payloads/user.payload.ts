import { User } from '@nekotoko/prisma/monolithic';

export class UserPayload {
  user: Partial<User>;
  accessToken: string;
}
