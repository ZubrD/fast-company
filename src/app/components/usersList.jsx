import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import { paginate } from "../utils/paginate";
import UserTable from "./usersTable";
import _ from "lodash";
import api from "../api";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import SearchPerson from "./searchPerson";

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, SetSelectedProf] = useState();
    const [dataSearch, setDataSearch] = useState({ search: "" });

    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const pageSize = 8;
    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
        });
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfessions(data);
        });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, dataSearch]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleProfessionSelect = (item) => {
        setDataSearch({});
        SetSelectedProf(item);
        document.getElementById("search").value = "";
    };

    const handleDataSearch = ({ target }) => {
        SetSelectedProf();
        setDataSearch((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    if (users) {
        // const filteredUsers = selectedProf       //Eslint неправильно выставляет пробелы
        // ? users.filter(                          // поэтому этот правильный вариант закомментировал
        //     (user) =>
        //         JSON.stringify(user.profession) ===
        //         JSON.stringify(selectedProf)
        // )
        // : users;

        let filteredUsers;
        if (selectedProf) {
            filteredUsers = users.filter(
                (user) => user.profession.name === selectedProf.name
            );
        } else if (dataSearch.search) {
            filteredUsers = users.filter(
                (item) => item.name.indexOf(dataSearch.search) !== -1
            );
        } else {
            filteredUsers = users;
        }

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );

        const userCrop = paginate(sortedUsers, currentPage, pageSize); // данные на одной странице

        const clearFilter = () => {
            SetSelectedProf();
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
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
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <SearchPerson
                        dataSearch={dataSearch}
                        onSearch={handleDataSearch}
                    />
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading...";
};

UsersList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
};

export default UsersList;
