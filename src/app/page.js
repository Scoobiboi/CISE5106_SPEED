import "./home.css";
import LoginContainer from "./components/LoginContainer";

export default function Home() {
  return (
    <div className="home-container">
      <div className="books-container">
        <div className="books"></div>
        <div className="books"></div>
        <div className="books"></div>
        <div className="books"></div>
        <div className="books"></div>
        <div className="books"></div>
        <div className="books"></div>
        <div className="books"></div>
        <div className="books"></div>
        <div className="books"></div>
        <div className="books"></div>
      </div>
      <div className="title-container">
        <div className="title-main">CISE SPEED Database</div>
        <div className="title-secondary">
          A website for querying academic articles
        </div>
      </div>
      <LoginContainer />
    </div>
  );
}
