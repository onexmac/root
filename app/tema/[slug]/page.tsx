import { notFound } from "next/navigation";
import { getTopic, topics } from "@/data/topics";
import { ReelScreen } from "@/components/ReelScreen";

export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export default async function TemaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  return <ReelScreen topic={topic} />;
}
