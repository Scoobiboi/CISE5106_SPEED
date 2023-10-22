import "./UserInfo.css";

function UserInfo() {
  return (
    <div className="info-details">
      <div className="red">Note - mock user details are as following:</div>
      <div>
        <b>email:</b> user@gmail.com <b>password:</b> user
      </div>
      <div>
        <b>email:</b> mod@gmail.com <b>password:</b> mod
      </div>
      <div>
        <b>email:</b> serc@gmail.com <b>password:</b> serc
      </div>
      <div>
        <b>email:</b> admin@gmail.com <b>password:</b> admin
      </div>
    </div>
  );
}
export default UserInfo;
