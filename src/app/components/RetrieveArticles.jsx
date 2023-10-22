"use client";
import { useState, useEffect } from "react";
import "./RetrieveArticles.css";
import Cookies from "universal-cookie";
import CryptoJS from "crypto-js";
import SortButton from "./SortButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import Article from "./Article";
import AddArticleButton from "./AddArticleButton";
import AddArticle from "./AddArticle";

// const url = "http://localhost:8080";
const url = "https://cise-5106-backend.vercel.app";

const encryptionKey = "2147000000maxcash";
const cookies = new Cookies();

const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

function retrieveUserStatus() {
  const email = cookies.get("email");
  const status = decryptData(email);
  if (status) {
    const newStatus = status.replace("@gmail.com", "");
    console.log("status uncrypted", newStatus);
    return newStatus;
  }
  return null;
}

function sortByDate(articles, type) {
  console.log("sorting by date", type);
  if (type == "asc") {
    return articles
      .slice()
      .sort((a, b) => a.Publication_year - b.Publication_year);
  } else {
    return articles
      .slice()
      .sort((a, b) => b.Publication_year - a.Publication_year);
  }
}
function sortByTitle(articles, type) {
  console.log("sorting by title");
  if (type == "asc") {
    return articles.slice().sort((a, b) => a.title.localeCompare(b.title));
  } else {
    return articles.slice().sort((a, b) => b.title.localeCompare(a.title));
  }
}

function sortByRating(articles, type) {
  console.log("sorting by rating");
  if (type == "asc") {
    return articles.slice().sort((a, b) => a.Rating - b.Rating);
  } else {
    return articles.slice().sort((a, b) => b.Rating - a.Rating);
  }
}

function sortByStatus(articles) {
  const statusSort = (a, b) => {
    // Sort by Moderation_status first
    if (a.Moderation_status < b.Moderation_status) return 1;
    if (a.Moderation_status > b.Moderation_status) return -1;
    else return 0;
  };
  return articles.slice().sort(statusSort);
}

export function ArticlesComponent() {
  const [articles, setArticles] = useState([]);
  const [userStatus, setUserStatus] = useState("");
  const [sortStatus, setSortStatus] = useState("");
  const [addingArticle, setAddingArticle] = useState("");

  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await getArticles();
        setArticles(sortByStatus(data));
        setUserStatus(retrieveUserStatus());
      } catch (error) {
        console.error(error);
      }
    }

    fetchArticles();
  }, []);

  function submitArticle() {
    setAddingArticle(!addingArticle);
  }
  function submitArticleCallback() {
    setAddingArticle(false);
  }

  const sortArticlesByDate = () => {
    if (sortStatus == "button-year-asc") {
      setArticles(sortByDate(articles, "desc"));
      setSortStatus("button-year-desc");
    } else {
      setArticles(sortByDate(articles, "asc"));
      setSortStatus("button-year-asc");
    }
  };

  const sortArticlesByTitle = () => {
    if (sortStatus == "button-title-asc") {
      setArticles(sortByTitle(articles, "desc"));
      setSortStatus("button-title-desc");
    } else {
      setArticles(sortByTitle(articles, "asc"));
      setSortStatus("button-title-asc");
    }
  };

  const sortArticlesByRating = () => {
    if (sortStatus == "button-rating-asc") {
      setArticles(sortByRating(articles, "desc"));
      setSortStatus("button-rating-desc");
    } else {
      setArticles(sortByRating(articles, "asc"));
      setSortStatus("button-rating-asc");
    }
  };

  function logout() {
    cookies.remove("email");
    cookies.remove("password");
  }

  // Filter articles based on userStatus
  const filteredArticles = articles.filter((article) => {
    if (userStatus === "user" && article.Moderation_status === "Approved") {
      return true;
    }
    if (
      userStatus === "mod" &&
      article.Moderation_status === "Awaiting Approval"
    ) {
      return true;
    }
    if (
      userStatus === "serc" &&
      article.Moderation_status === "Requiring Analysis"
    ) {
      return true;
    }
    if (userStatus === "admin") {
      return true;
    }
    return false;
  });

  const handleUpdateArticles = async () => {
    async function fetchArticles() {
      try {
        const data = await getArticles();
        setArticles(sortByStatus(data));
        setUserStatus(retrieveUserStatus());
      } catch (error) {
        console.error(error);
      }
    }

    fetchArticles();
  };

  return (
    <div className="articles-outer-container">
      <div onClick={logout} className="logout">
        <Link href="/">
          <LogoutIcon color="primary" />
        </Link>
      </div>
      <div className="sorting-container">
        <SortButton
          sortFunction={sortArticlesByDate}
          sortStatus={sortStatus}
          className="button-year"
          text="Sort by Publication Year"
        />
        <SortButton
          sortFunction={sortArticlesByTitle}
          sortStatus={sortStatus}
          className="button-title"
          text="Sort by Article Title"
        />
        <SortButton
          sortFunction={sortArticlesByRating}
          sortStatus={sortStatus}
          className="button-rating"
          text="Sort by Rating"
        />
        <AddArticleButton submitArticle={submitArticle} />
      </div>
      <div className="articles-container">
        {addingArticle && <AddArticle callback={submitArticleCallback} />}
        {filteredArticles.map((article) => (
          <Article
            key={article._id}
            article={article}
            updateArticleRating={updateArticleRating}
            user={userStatus}
            updateFunction={handleUpdateArticles}
          />
        ))}
      </div>
    </div>
  );
}

async function getArticles() {
  try {
    const response = await fetch(url + "/api/articles");

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}
async function updateArticleRating(id, rating) {
  try {
    const response = await fetch(`${url}` + `/api/articles/${id}/rate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating }),
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw Error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}
