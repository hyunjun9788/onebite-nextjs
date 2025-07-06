import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect } from "react";
import style from "./index.module.css";
import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

//컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러오는 함수
export const getStaticProps = async () => {
  const [allBooks, recoBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);

  console.log(allBooks);
  return {
    props: {
      allBooks,
      recoBooks,
    },
  };
};

//서버에서도 한번 실행(사전 렌더링 떄문)
export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(allBooks);

  useEffect(() => {
    console.log(window);
  });

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
