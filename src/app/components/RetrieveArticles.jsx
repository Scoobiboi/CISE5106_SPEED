"use client";
import { useState, useEffect } from "react";
import "./RetrieveArticles.css";
import Rating from "@mui/material/Rating";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import HelpIcon from "@mui/icons-material/Help";
import ErrorIcon from "@mui/icons-material/Error";

const url = "http://localhost:8080";
// const url = "https://cise-5106-speed-backend.vercel.app";

function sortByDate(articles) {
  return articles.sort((a, b) => a.Publication_year - b.Publication_year);
}

export function ArticlesComponent() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await getArticles();
        setArticles(sortByDate(data));
      } catch (error) {
        console.error(error);
      }
    }

    fetchArticles();
  }, []);

  return (
    <div className="articles-container">
      {articles.map((article) => (
        <div className="article" key={article._id}>
          <h2 className="title article-text">{article.title}</h2>
          <div className="authors article-text">
            <b>Authors:</b>
            <span className="space-between-text"> {article.Authors}</span>
          </div>
          <div className="publication-year article-text">
            <b>Publication Year: </b>{" "}
            <span className="space-between-text">
              {article.Publication_year}
            </span>
          </div>
          <div className="journal-name article-text">
            <b>Journal Name: </b>
            <span className="space-between-text"> {article.Journal_Name}</span>
          </div>
          <div className="moderation-status article-text">
            <b>Moderation Status: </b>{" "}
            <span
              className={
                "space-between-text " +
                (article.Moderation_status === "Approved"
                  ? "approved"
                  : article.Moderation_status === "Awaiting"
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
            ) : article.Moderation_status === "Awaiting" ? (
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
      ))}
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
      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}
