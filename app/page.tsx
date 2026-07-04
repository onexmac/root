import { topics } from "@/data/topics";
import { IndexScreen } from "@/components/IndexScreen";

export default function Home() {
  return <IndexScreen topics={topics} />;
}
