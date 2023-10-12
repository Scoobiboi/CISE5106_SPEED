import Link from "next/link";
import "./home.css";

export default function Home() {
  return (
    <div className="home-container">
      Home page to be completed.
      <Link href="/articles">
        <button>View all articles</button>
      </Link>
    </div>
  );
}
