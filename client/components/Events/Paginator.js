import React from "react";
import Pagination from "@mui/material/Pagination";

export const Paginator = ({
  postsPerPage,
  totalPosts,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Pagination
      count={pageNumbers.length}
      page={currentPage}
      onChange={(e, val) => {
        setCurrentPage(val);
      }}
      size="large"
    />
  );
};
