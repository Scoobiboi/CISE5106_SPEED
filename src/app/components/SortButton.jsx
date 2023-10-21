import "./SortButton.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function SortButton({ sortFunction, sortStatus, className, text }) {
  const statusNoType = sortStatus.replace("-asc", "").replace("-desc", "");
  const type = sortStatus
    .replace("button-year-", "")
    .replace("button-title-", "")
    .replace("button-rating-", "");

  return (
    <div onClick={sortFunction} className={className + " button"}>
      <div>{text}</div>
      <div className="arrows">
        <KeyboardArrowUpIcon
          color={
            statusNoType == className && type == "asc" ? "success" : "disabled"
          }
        />
        <KeyboardArrowDownIcon
          color={
            statusNoType == className && type == "desc" ? "success" : "disabled"
          }
        />
      </div>
    </div>
  );
}

export default SortButton;
