import { getNewsData } from "@/lib/api";
import { Suspense } from "react";

interface NewsPageProps {
  id: string;
}

async function NewsPage({ id }: NewsPageProps) {
  const news = await getNewsData(id);
  return <div>News {id}</div>;
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className="container-default py-16" />}>
      <NewsPage id={id} />
    </Suspense>
  );
}
