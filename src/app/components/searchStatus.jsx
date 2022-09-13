import React from "react";

const SearchStatus = (props) => {
  const users = props.users;
  return (
    <h2>
      <span
        className={"badge " + (users.length > 0 ? "bg-primary" : "bg-danger")}
      >
        {users.length > 0
          ? `${
              users.length + " " + props.onRenderPhrase(users.length)
            } с тобой сегодня`
          : "Никто с тобой не тусанет"}
      </span>
    </h2>
  );
};

export default SearchStatus;
