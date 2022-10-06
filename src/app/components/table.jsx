import React from "react";
import PropTypes from "prop-types";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ onSort, selectedSort, caretPosition, columns, data, children }) => {
    return (
        <table className="table">
            {children || (
                <>
                    <TableHeader {...{ onSort, caretPosition, selectedSort, columns }} />
                    <TableBody {...{ columns, data }} />
                </>
            )}
        </table>
    );
};

Table.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    caretPosition: PropTypes.string,
    columns: PropTypes.object,
    data: PropTypes.array,
    children: PropTypes.array
};

export default Table;
