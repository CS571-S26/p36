import { CompPost } from '../components/shared';

export default function Trending() {

  const exCompSpec = {
    title: "Yordle Pordle",
    username: "lulujoa",
    champions: ["Lulu", "Tristana", "Teemo", "Poppy", "Fizz", "Veygar", "Jiggs"],
    overview: "Yordle Pordle Time~",
    createdAt: "04/07/26",
    heartCount: 46,
    commentCount: 2,
  }

  return (
    <div>
      <CompPost compSpec={exCompSpec} />
    </div>
  );
}