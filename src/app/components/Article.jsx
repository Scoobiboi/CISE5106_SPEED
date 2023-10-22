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
import HowToRegIcon from "@mui/icons-material/HowToReg";
import VerifiedIcon from "@mui/icons-material/Verified";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [approvalReason, setApprovalReason] = useState("");

  const handleEvidenceUpdated = () => {
    setEditingEvidence(false);
    updateFunction();
  };

  const handleEditingEvidence = () => {
    setEditingEvidence(!editingEvidence);
  };

  const handleAnalysis = (reason) => {
    handleUpdatingApproval(
      article._id,
      "Requiring Analysis",
      reason,
      handleEvidenceUpdated
    );
    setEditingEvidence(false);
  };

  const handleApproval = (reason) => {
    handleUpdatingApproval(
      article._id,
      "Approved",
      reason,
      handleEvidenceUpdated
    );
    setEditingEvidence(false);
  };
  const handleRejection = (reason) => {
    handleUpdatingApproval(
      article._id,
      "Rejected",
      reason,
      handleEvidenceUpdated
    );
    setEditingEvidence(false);
  };

  useEffect(() => {
    if (editingEvidence) {
      const resultDiv = document.getElementById("result " + article._id);
      resultDiv.textContent = "";
    }
  }, [editingEvidence]);

  return (
    <div
      id={"root-container" + article._id}
      className="article-and-options-container"
    >
      <div className="option-menu">
        {" "}
        <div className="rating-number article-text">
          <span className="space-between-text">
            <Rating
              name="size-small"
              defaultValue={article.Rating}
              size="small"
              onChange={(event, newValue) => {
                if (newValue != null) {
                  updateArticleRating(article._id, Number(newValue));
                }
              }}
            />
          </span>
          {article.no_Ratings} Ratings
        </div>
        <div className="moderation-status article-text">
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
        {(user == "admin" || user == "serc" || user == "mod") &&
          (editingEvidence ? (
            <div
              onClick={() => {
                setEditingEvidence(false);
              }}
              className="cancel-button disable-selection"
            >
              Cancel
            </div>
          ) : (
            <div
              className="edit disable-selection"
              alt="Edit evidence"
              onClick={() => {
                handleEditingEvidence();
              }}
            >
              Edit
              <EditNoteIcon />
            </div>
          ))}
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
          <div className="evidence article-text">
            {editingEvidence &&
            (user == "serc" || user == "admin" || user == "mod") ? (
              <div className="text-field-container">
                <div className="evidence-header">Add or edit evidence </div>
                <ThemeProvider theme={theme}>
                  <TextField
                    label="Evidence"
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
                    onClick={() =>
                      handleUpdatingEvidence(
                        newEvidence,
                        article._id,
                        handleEvidenceUpdated
                      )
                    }
                    className="update-evidence-button disable-selection"
                  >
                    {" "}
                    Update evidence
                  </div>
                </div>
                <div className="approval-header">
                  Approve this article or Request further analysis
                </div>
                <div className="approval-container">
                  <ThemeProvider theme={theme}>
                    <TextField
                      label={"Reason"}
                      placeholder={"Reason"}
                      autoFocus={true}
                      fullWidth
                      multiline
                      defaultValue={article.Moderation_reason}
                      id="outlined-multiline-flexible"
                      sx={{ input: { color: "white" } }}
                      onChange={(event) => {
                        setApprovalReason(event.target.value);
                      }}
                    />
                  </ThemeProvider>
                  <div className="approval-button-container">
                    <div
                      onClick={() => {
                        handleRejection(approvalReason);
                      }}
                      className="reject-button disable-selection"
                      alt="Reject Article"
                    >
                      Reject
                      <DeleteIcon />
                    </div>
                    <div
                      onClick={() => {
                        handleApproval(approvalReason);
                      }}
                      className="approve-button disable-selection"
                      alt="Approve Article"
                    >
                      Approve
                      <VerifiedIcon />
                    </div>
                    <div
                      onClick={() => {
                        handleAnalysis(approvalReason);
                      }}
                      className="analysis-button disable-selection"
                      alt="Approve Article"
                    >
                      Analysis
                      <HowToRegIcon />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="evidence-main-container">
                <b>Evidence:</b>
                <span className="space-between-text evidence-text">
                  {article.Evidence}
                </span>
                {(user == "serc" || user == "mod" || user == "admin") && (
                  <>
                    {" "}
                    <b>Moderation reason:</b>
                    <span className="space-between-text evidence-text">
                      {article.Moderation_reason}
                    </span>
                  </>
                )}
              </div>
            )}
            <span className="result-container">
              <div id={"result " + article._id}></div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const handleUpdatingEvidence = async (evidence, id, handleEvidenceUpdated) => {
  const resultDiv = document.getElementById("result " + id);
  const formData = new URLSearchParams();
  formData.append("evidence", evidence);
  try {
    const response = await fetch(`${url}` + `/api/articles/${id}/evidence`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (response.status === 200 || response.status === 201) {
      handleEvidenceUpdated();
      resultDiv.textContent = "Evidence successfully updated!";
    } else {
      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

const handleUpdatingApproval = async (
  id,
  status,
  reason,
  handleEvidenceUpdated
) => {
  const formData = new URLSearchParams();
  formData.append("status", status);
  formData.append("reason", reason);
  try {
    const response = await fetch(`${url}` + `/api/articles/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (response.status === 200 || response.status === 201) {
      handleEvidenceUpdated();
    } else {
      resultDiv.textContent =
        "Article status unable to be updated. Please try again.";
      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

export default Article;
