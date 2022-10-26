import React from "react";
import PropTypes from "prop-types";

const SearchPerson = ({ dataSearch, onSearch }) => {
    return (
        <form>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    name="search"
                    id="search"
                    value={dataSearch.value}
                    onChange={onSearch}
                />
            </div>
        </form>
    );
};

SearchPerson.propTypes = {
    dataSearch: PropTypes.object,
    onSearch: PropTypes.func
};

export default SearchPerson;
