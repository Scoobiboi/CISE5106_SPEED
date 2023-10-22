import "./AddArticleButton.css";
import PublishIcon from "@mui/icons-material/Publish";

function AddArticleButton({ submitArticle }) {
  return (
    <div onClick={submitArticle} className="button disable-selection">
      <div>Submit an article</div>
      <div className="arrows">
        <PublishIcon />
      </div>
    </div>
  );
}

export default AddArticleButton;
