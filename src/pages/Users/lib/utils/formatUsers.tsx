import { Role } from "../../../../lib/enums/role.enum";
import { IUserResponse } from "../../../../lib/responses/users";
import { FormattedUser } from "../types/FormattedUser";

export const getUserMainRole = (user: IUserResponse) => {
  if(
    !user.roles ||
    user.roles.length === 0
  ) return;
  if(
    user.roles.length === 1
  ) return user.roles[0];
  if(
    user.roles.includes(Role.ADMIN)
  ) return Role.ADMIN;
  return Role.USER;
};

export const formatUsers = (users: IUserResponse[] | undefined): FormattedUser[] => {
  return users?.map((user) => {
    return {
      ...user,
      role: getUserMainRole(user),
      createdAt: new Date(user.date_created).toLocaleString(),
    };
  }) || [];
};