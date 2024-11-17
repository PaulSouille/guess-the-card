import { Link } from "@nextui-org/react";
import styles from "./header.module.css";

export default function Header() {
  {
    return (
      <div
        className={`${styles.borderTest} flex justify-between h-16 content-center flex-wrap `}
      >
        <div className="grow basis-0 flex justify-center	flex-wrap content-center h-full	">
          <Link isBlock className=" font-semibold" href="/">
            <div className="text-2xl">🌹</div>
          </Link>
        </div>
        <div className="h-full  flex-wrap content-center	">
          <Link isBlock className=" font-semibold" href="/">
            Guess the card
          </Link>
        </div>
        <div className="grow basis-0	flex	justify-center flex-wrap content-center h-full">
          <div className="text-2xl">🌹</div>
        </div>
      </div>
    );
  }
}
