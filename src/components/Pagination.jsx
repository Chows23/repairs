import React from 'react';

//sfc
const Pagination = ({ itemCount, pageSize, currentPage, onPageChange }) => {
  // const Pagination = (props) => {
  // const { itemCount, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(itemCount / pageSize) + 1;
  const pages = [...Array(pagesCount).keys()].slice(1);
  // console.log(itemCount, pageSize, pagesCount, pages);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={page === currentPage ? "page-item active" : "page-item "}
            key={page}
          >
            <button onClick={() => onPageChange(page)} className="page-link">{page}</button>
          </li>
        ))}

      </ul>
    </nav>
  );
}

export default Pagination;