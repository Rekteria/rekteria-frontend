import React from 'react';
import ReactPaginate from 'react-paginate';
import './styles.css';

const Pagination = ({ totalDevices, devicesPerPage, handlePageClick }) => {
  return (
    <div className="d-flex justify-content-center">
      <ReactPaginate
        pageCount={Math.ceil(totalDevices / devicesPerPage)}
        pageRangeDisplayed={4}
        marginPagesDisplayed={4}
        onPageChange={handlePageClick}
        containerClassName="paginate-container"
        previousClassName="paginate-previous"
        nextClassName="paginate-next"
        pageClassName="paginate-page"
        pageLinkClassName="pagination-a"
        activeClassName="paginate-active"
        disabledClassName="paginate-disabled"
      ></ReactPaginate>
    </div>
  );
};

export default Pagination;
