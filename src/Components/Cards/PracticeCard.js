import { useParams } from "react-router-dom";

export default function PracticeCard() {
  const { cardId } = useParams();
  return <div>Hey I'm card {cardId}</div>;
}
