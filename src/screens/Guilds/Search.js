import React from 'react';

function Search(props) {
  return (
    <input
      name="filter-guilds"
      className="form-control shadow-inset-2 form-control-lg mb-1"
      type="text"
      placeholder="Search.."
      value={props.search}
      onChange={props.handleSearchChange}
    />
  );
}

export default Search;
