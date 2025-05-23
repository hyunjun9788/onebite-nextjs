import BookItem from "@/components/book-item";
import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import books from "@/mock/books.json";

export default function Page() {
  //query string읽을 때 한번 더 호출되면서 콘솔 두번 찍힘
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
