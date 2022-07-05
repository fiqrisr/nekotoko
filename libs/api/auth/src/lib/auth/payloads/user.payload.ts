import { User } from '@nekotoko/db-monolithic';

export class UserPayload {
  user: Partial<User>;
  accessToken: string;
}
