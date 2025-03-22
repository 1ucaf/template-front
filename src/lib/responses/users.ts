import { Role } from "../enums/role.enum";
import { PaginatedResponse } from "./paginated";

export type IUserResponse = {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  date_created: string;
  roles?: Role[];
  permissions?: string[];
  isDeleted?: boolean;
}

export type PaginatedUsersResponse = PaginatedResponse<IUserResponse>;