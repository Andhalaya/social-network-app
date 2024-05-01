import moment from 'moment';

export default function Message({ message, own }) {

  function calculateTimeAgo(timestamp) {
    return moment(timestamp).format("LT");
}

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">
        {calculateTimeAgo(message.createdAt)}
      </div>
    </div>
  );
}