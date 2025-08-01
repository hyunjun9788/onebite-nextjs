import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";

export const getStaticPaths = () => {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }, { params: { id: "3" } }],
    fallback: true,

    //false: 404 Not Found
    //blocking: SSR 방식
    //true: SSR방식 + 데이터가 없는 폴백 상태의 페이지부터 반환
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  if (!book)
    return {
      notFound: true,
    };

  return {
    props: {
      book,
    },
  };
};

export default function Page({ book }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (!book) return "문제가 발생했습니다 다시 시도해주세요";
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  if (router.isFallback) return "로딩중입니다.";
  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div>
        {author} | {publisher}
      </div>

      <div className={style.description}>{description}</div>
    </div>
  );
}

//optional catch all segment
//book 뒤에 어떤 경로가 들어오든 안들어오든 모두 대응 가능 (대괄호 2개 [[...id]])
