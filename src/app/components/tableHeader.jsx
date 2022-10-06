import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, caretPosition, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        // role={columns[column].path && "button"}
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        {columns[column].name}
                        <span
                            className={
                                columns[column].path === caretPosition
                                    ? selectedSort.order === "asc"
                                        ? "bi bi-caret-down-fill"
                                        : "bi bi-caret-up-fill"
                                    : ""
                            }
                        ></span>
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    caretPosition: PropTypes.string,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
