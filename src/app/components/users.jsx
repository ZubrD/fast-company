import React from "react";
import User from "./user";
import SearchStatus from "./searchStatus";

const Users = (props) => {
  const users = props.users;
  return (
    <>
      <SearchStatus users={users} onRenderPhrase={props.onRenderPhrase} />
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User key={user._id} user={user} onDelete={props.onDelete} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
