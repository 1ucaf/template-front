import { IUserResponse } from "../../../../lib/responses/users";

export type FormattedUser = IUserResponse & {
  createdAt: string;
  role: string | undefined;
};