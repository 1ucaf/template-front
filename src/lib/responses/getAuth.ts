import { Role } from "../enums/role.enum";

export type IGetAuthResponse = {
  email: string;
  id: string;
  name: string;
  isActive: boolean;
  roles: Role[];
  permissions: string[];
}