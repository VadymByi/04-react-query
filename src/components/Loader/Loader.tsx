import css from "./Loader.module.css";
import DancingMonkey from "../DancingMonkey/DancingMonkey";

interface LoaderProps {
  duration?: number;
}

export default function Loader({ duration = 2000 }: LoaderProps) {
  return (
    <div className={css.loaderWrapper}>
      <p className={css.text}>Loading movies, please wait...</p>
      <DancingMonkey duration={duration} />
    </div>
  );
}
// export default function Loader() {
//   return <p className={css.text}>Loading movies, please wait...</p>;
// }
