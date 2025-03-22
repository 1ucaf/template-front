import { Role } from "../../../../lib/enums/role.enum";
import { IUserResponse } from "../../../../lib/responses/users";
import { FormattedUser } from "../types/FormattedUser";

export const getUserMainRole = (user: IUserResponse) => {
  if(
    !user.roles ||
    user.roles.length === 0
  ) return;
  return (
    user.roles?.find(role => role === Role.MASTER) ||
    user.roles?.find(role => role === Role.OWNER) ||
    user.roles?.find(role => role === Role.ADMIN) ||
    Role.USER
  )
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