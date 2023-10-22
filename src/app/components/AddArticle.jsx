import "./AddArticle.css";
import Rating from "@mui/material/Rating";
import HelpIcon from "@mui/icons-material/Help";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

// const url = "http://localhost:8080";
const url = "https://cise-5106-backend.vercel.app";

function submitArticle(title, author, year, name, handleFinishSubmission) {
  sendArticle(title, author, year, name, handleFinishSubmission);
}

function AddArticle({ callback }) {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthors, setNewAuthors] = useState("");
  const [publicationYear, setNewPublicationYear] = useState("");
  const [journalName, setNewJournalName] = useState("");

  function handleFinishSubmission() {
    setNewTitle("");
    setNewAuthors("");
    setNewPublicationYear("");
    setNewJournalName("");

    var fieldTitle = document.getElementById(
      "outlined-multiline-flexible field-title"
    );
    var fieldAuthors = document.getElementById(
      "outlined-multiline-flexible field-authors"
    );
    var fieldYear = document.getElementById(
      "outlined-multiline-flexible field-year"
    );
    var fieldName = document.getElementById(
      "outlined-multiline-flexible field-name"
    );
    fieldTitle.value = "";
    fieldAuthors.value = "";
    fieldYear.value = "";
    fieldName.value = "";
    callback();
    const resultDiv = document.getElementById("result-new");
    resultDiv.textContent = "";
  }

  return (
    <div
      id="root-container-new"
      className="article-and-options-container slide-in-top"
    >
      <div className="option-menu">
        {" "}
        <div className="rating-number article-text">
          <span className="space-between-text">
            <Rating name="size-small" defaultValue={0} size="small" />
          </span>
          0 Ratings
        </div>
        <div className="moderation-status article-text">
          <span className="Awaiting Approval">Awaiting Approval</span>
          <HelpIcon color="warning" />
        </div>
      </div>
      <div className="article-outer">
        <div className="article new-article">
          <div className="add-title">Title: </div>
          <div className="title article-text">
            <TextField
              required
              label="Title"
              autoFocus={true}
              fullWidth
              id="outlined-multiline-flexible field-title"
              placeholder="Title"
              sx={{ input: { color: "white" } }}
              onChange={(event) => {
                setNewTitle(event.target.value);
              }}
            />
          </div>
          <div className="add-title">Authors: </div>
          <div className="authors article-text">
            <TextField
              required
              label="Author/s"
              fullWidth
              id="outlined-multiline-flexible field-authors"
              placeholder="Author/s"
              sx={{ input: { color: "white" } }}
              onChange={(event) => {
                setNewAuthors(event.target.value);
              }}
            />
          </div>
          <div className="add-title">Publication Year:: </div>
          <div className="publication-year article-text">
            <TextField
              required
              label="PublicationYear"
              fullWidth
              id="outlined-multiline-flexible field-year"
              placeholder="Publication Year"
              sx={{ input: { color: "white" } }}
              onChange={(event) => {
                setNewPublicationYear(event.target.value);
              }}
            />
          </div>
          <div className="add-title">Journal Name: </div>
          <div className="journal-name article-text">
            <TextField
              required
              label="Journal name"
              fullWidth
              id="outlined-multiline-flexible field-name"
              placeholder="Journal name"
              sx={{ input: { color: "white" } }}
              onChange={(event) => {
                setNewJournalName(event.target.value);
              }}
            />
          </div>
          <div className="article-text buttons-final">
            <Button
              onClick={() =>
                submitArticle(
                  newTitle,
                  newAuthors,
                  publicationYear,
                  journalName,
                  handleFinishSubmission
                )
              }
              variant="contained"
            >
              Submit
            </Button>
          </div>
          <div id="result-new"></div>
        </div>
      </div>
    </div>
  );
}

const sendArticle = async (
  title,
  author,
  year,
  name,
  handleFinishSubmission
) => {
  const formData = new URLSearchParams();
  formData.append("title", title);
  formData.append("Authors", author);
  formData.append("Journal_Name", name);
  formData.append("Publication_year", year);
  const resultDiv = document.getElementById("result-new");
  try {
    if (
      title.trim() === "" ||
      author.trim() === "" ||
      name.trim() === "" ||
      isNaN(year)
    ) {
      console.log(title.trim(), author.trim(), name.trim(), year);
      throw new Error(`Invalid fields input.`);
    }
    //  throw new Error(`Request failed with status: ${response.status}`);
    const response = await fetch(`${url}` + `/api/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (response.status === 200 || response.status === 201) {
      handleFinishSubmission();
    } else {
      resultDiv.textContent =
        "Article unable to be submitted. Please try again.";
      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    resultDiv.textContent =
      "Unable to submit article. Please make sure that all fields are valid.";
    console.error(error);
  }
};

export default AddArticle;
