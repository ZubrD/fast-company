import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import { paginate } from "../utils/paginate";
import User from "./user";
import api from "../api";
import PropTypes from "prop-types";
import GroupList from "./groupList";

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, SetSelectedProf] = useState();

    const pageSize = 2;

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = (item) => {
        // console.log(item);
        SetSelectedProf(item);
    };

    const filteredUsers = selectedProf
        ? allUsers.filter((user) => user.profession === selectedProf)
        : allUsers;
    const count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    const clearFilter = () => {
        SetSelectedProf();
    };

    return (
        <>
            <SearchStatus length={count} />
            {professions && (
                <>
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        // valueProperty="_id"      // Эти значения перенесены в
                        // contentProperty="name"   // GroupList.defaultProps
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить фильр
                    </button>
                </>
            )}

            {count > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Провфессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user) => (
                            <User key={user._id} {...rest} {...user} />
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
};

export default Users;
