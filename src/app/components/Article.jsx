import Rating from "@mui/material/Rating";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import HelpIcon from "@mui/icons-material/Help";
import ErrorIcon from "@mui/icons-material/Error";
import EditNoteIcon from "@mui/icons-material/EditNote";
import "./Article.css";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

// const url = "http://localhost:8080";
const url = "https://cise-5106-backend.vercel.app";

const theme = createTheme({
  palette: {
    text: {
      primary: "white",
    },
  },
});

function Article({ article, user, updateArticleRating, updateFunction }) {
  const [editingEvidence, setEditingEvidence] = useState(false);
  const [newEvidence, setNewEvidence] = useState(article.Evidence);

  const handleEvidenceUpdated = () => {
    setEditingEvidence(false);
    updateFunction();
  };

  const handleEditingEvidence = () => {
    setEditingEvidence(!editingEvidence);
  };

  useEffect(() => {
    if (editingEvidence) {
      const resultDiv = document.getElementById("result");
      resultDiv.textContent = "";
    }
  }, [editingEvidence]);

  return (
    <div className="article-and-options-container">
      <div className="option-menu">
        {" "}
        <div className="rating-number article-text">
          {article.no_Ratings} Ratings
        </div>
        {(user == "admin" || user == "serc") && (
          <div className="edit" alt="Edit evidence">
            <EditNoteIcon
              onClick={() => {
                handleEditingEvidence();
              }}
            />
          </div>
        )}
      </div>
      <div className="article-outer">
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
            <span className="space-between-text"> {article.Journal_Name}</span>
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
          <div className="evidence article-text">
            <b>Evidence:</b>{" "}
            {editingEvidence ? (
              <div className="text-field-container">
                <ThemeProvider theme={theme}>
                  <TextField
                    autoFocus={true}
                    fullWidth
                    id="outlined-multiline-flexible"
                    defaultValue={article.Evidence}
                    sx={{ input: { color: "white" } }}
                    multiline
                    onChange={(event) => {
                      setNewEvidence(event.target.value);
                    }}
                  />
                </ThemeProvider>

                <div className="edit-buttons">
                  <div
                    onClick={() => {
                      setEditingEvidence(false);
                    }}
                    className="cancel-button"
                  >
                    Cancel
                  </div>
                  <div
                    onClick={() =>
                      handleUpdatingEvidence(
                        newEvidence,
                        article._id,
                        handleEvidenceUpdated
                      )
                    }
                    className="update-evidence-button"
                  >
                    {" "}
                    Update evidence
                  </div>
                </div>
              </div>
            ) : (
              <span className="space-between-text evidence-text">
                {article.Evidence}
              </span>
            )}
            <span className="space-between-text">
              <div id="result"></div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const handleUpdatingEvidence = (evidence, id, handleEvidenceUpdated) => {
  const resultDiv = document.getElementById("result");
  fetch(`${url}` + `/api/articles/${id}/evidence`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // Set the appropriate content type
    },
    body: JSON.stringify({ evidence }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      handleEvidenceUpdated();
      console.log("evidence successfully updated");
      resultDiv.textContent = "Evidence successfully updated!";
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      resultDiv.textContent = "Evidence not updated, please try again.";
    });
};

export default Article;
