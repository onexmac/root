import { materias } from "@/data/topics";
import { IndexScreen } from "@/components/IndexScreen";

export default function Home() {
  return <IndexScreen materias={materias} />;
}
