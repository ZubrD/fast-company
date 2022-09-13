import React from "react";
import Quality from "./quality";

const User = (props) => {
    const user = props.user
    return (
        <tr>
        <td>{user.name}</td>
        <td>
            <Quality user={user.qualities} />
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate} /5</td>
        <td>
          <button
            onClick={() => props.onDelete(user._id)}
            className="btn btn-danger"
          >
            delete
          </button>
        </td>
      </tr>
    )
}

export default User