import { IBookResponse } from "../../../../lib/responses/books";
import { FormattedBook } from "../types/FormattedBook";


export const formatBooks = (books: IBookResponse[] | undefined): FormattedBook[] => {
  return books?.map((book) => {
    return {
      ...book,
      createdAt: new Date(book.date_created).toLocaleString(),
    };
  }) || [];
};