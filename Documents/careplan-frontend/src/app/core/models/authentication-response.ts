import { User } from './user';

export interface AuthenticationResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
