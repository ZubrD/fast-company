import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";
import api from "../api";

const UserCard = ({ match }) => {
    const params = useParams();
    const history = useHistory();
    const { userId } = params;
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
    }, []);

    const handleReturnToUsers = () => {
        history.replace("/users");
    };

    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                {user.qualities.map((item) => (
                    <span
                        key={item._id}
                        className={"badge m-1 bg-" + item.color}
                    >
                        {item.name}
                    </span>
                ))}
                <p>CompletedMeetings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>
                <button onClick={handleReturnToUsers}>
                    Все пользователи
                </button>
            </>
        );
    }
};

export default UserCard;

UserCard.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
};
