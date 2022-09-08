import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  let badgeColor = "m-1 badge bg-";

  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== id));
  };

  const renderPhrase = () => {
    let singlePlural = ''
    users.length === 1 || users.length >= 5 
    ? singlePlural = 'человек'
    : singlePlural = 'человека'
    return (
      <span className="badge bg-primary fs-3 mt-1 mb-2">
        {users.length} {singlePlural} тусанёт с тобой сегодня
      </span>
    );
  };

  const renderTable = () => {
    return users.map((user) => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>
          {user.qualities.map((quality) => (
            <span key={quality._id} className={badgeColor + quality.color}>
              {quality.name}
            </span>
          ))}
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}/5</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(user._id)}
          >
            delete
          </button>
        </td>
      </tr>
    ));
  };

  if(users.length === 0) {
    return (
      <span className="badge bg-danger fs-3 mt-1 mb-2">
      Никто с тобой не тусанёт
    </span>
    )
  }

  return (
    <>
      {renderPhrase()}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </>
  );
};

export default Users;
