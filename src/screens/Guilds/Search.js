import React from 'react';

function Search(props) {
  return (
    <div className="row" style={{ marginTop: '11px' }}>
      <div className="col-xl-12">
        <div className="border-faded bg-faded p-3 mb-g d-flex">
          <input
            type="text"
            name="filter-guilds"
            className="form-control shadow-inset-2 form-control-lg"
            placeholder="Filter Guilds"
            value={props.search}
            onChange={props.handleSearchChange}
          />
          <div
            className="btn-group btn-group-lg btn-group-toggle hidden-lg-down ml-3"
            data-toggle="buttons"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Search;
