import { IBookResponse } from "../../../../lib/responses/books";

export type FormattedBook = IBookResponse & {
  createdAt: string;
};