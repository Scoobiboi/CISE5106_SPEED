"use client";
import { useState, useEffect } from "react";
import "./RetrieveArticles.css";
import Rating from "@mui/material/Rating";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import HelpIcon from "@mui/icons-material/Help";
import ErrorIcon from "@mui/icons-material/Error";
import Cookies from "universal-cookie";
import CryptoJS from "crypto-js";
import SortButton from "./SortButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";

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

  return (
    <div className="articles-outer-container">
      <div onClick={logout} className="logout">
        <Link href="/">
          <LogoutIcon />
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
      </div>
      <div className="articles-container">
        {filteredArticles.map((article) => (
          <div key={article._id} className="article-outer">
            <div className="article">
              <h2 className="title article-text">{article.title}</h2>
              <div className="authors article-text">
                <b>Authors:</b>
                <span className="space-between-text"> {article.Authors}</span>
              </div>
              <div className="publication-year article-text">
                <b>Publication Year: </b>
                <span className="space-between-text">
                  {article.Publication_year}
                </span>
              </div>
              <div className="journal-name article-text">
                <b>Journal Name: </b>
                <span className="space-between-text">
                  {" "}
                  {article.Journal_Name}
                </span>
              </div>
              <div className="moderation-status article-text">
                <b>Moderation Status: </b>{" "}
                <span
                  className={
                    "space-between-text " +
                    (article.Moderation_status === "Approved"
                      ? "approved"
                      : article.Moderation_status === "Awaiting Approval"
                      ? "awaiting"
                      : article.Moderation_status === "Rejected"
                      ? "rejected"
                      : "unknown")
                  }
                >
                  {article.Moderation_status}
                </span>
                {article.Moderation_status === "Approved" ? (
                  <CheckCircleIcon color="success" />
                ) : article.Moderation_status === "Awaiting Approval" ? (
                  <HelpIcon color="warning" />
                ) : article.Moderation_status === "Rejected" ? (
                  <RemoveCircleIcon color="error" />
                ) : (
                  <ErrorIcon />
                )}
              </div>
              <div className="rating article-text">
                <b>Rating:</b>{" "}
                <span className="space-between-text">
                  <Rating
                    name="size-small"
                    defaultValue={article.Rating}
                    size="small"
                    onChange={(event, newValue) => {
                      console.log(newValue);
                      if (newValue != null) {
                        updateArticleRating(article._id, Number(newValue));
                      }
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
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
