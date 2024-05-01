// import "./message.css";
// import { format } from "timeago.js";

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <p className="messageText">{message.text}</p>
    </div>
  );
}