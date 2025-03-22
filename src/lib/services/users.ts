import axios from "axios";
import { Role } from "../enums/role.enum";

export type GetUsersQueryType = {
  page: number;
  pageSize: number;
  search?: string;
  startDate?: string;
  endDate?: string;
  role?: string;
  isActive?: boolean;
  showDeleted?: boolean;
};

export const httpGETUsers = (query: GetUsersQueryType) => axios.get('/users', { params: query });

export const httpEditUser = (
  {userId, name, email, roles}: {userId: string, name: string, email: string, roles: Role[]}
) => axios.put(`/users/${userId}`, { name, email, roles });

export const httpActivateUser = ({userId, roles}: {userId: string, roles: Role[]}) =>
  axios.patch(`/users/activate/${userId}`, { roles });

export const httpEditUserPermissions = ({userId, permissions}: {userId: string, permissions: string[]}) =>
  axios.patch(`/users/permissions/${userId}`, permissions);