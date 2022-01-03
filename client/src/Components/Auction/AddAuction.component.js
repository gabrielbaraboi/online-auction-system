import React from "react";
import AuthVerify from "../../Services/auth.service";

const AddAuction = (props) => {

  const user = props.user;

  return (
    <div>
      <h1>Add Auction</h1>
      <p>
        <strong>User:</strong> {user.firstName}
      </p>
    </div>
  );
}

export default AddAuction;