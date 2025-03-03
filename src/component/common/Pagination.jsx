import React from "react";
import "../../style/pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [...Array(totalPages).keys()].map((i) => i + 1);
    
    return (
        <div className="pagination">
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={page === currentPage ? "active" : ""}
                >
                    {page}
                </button>
            ))}
        </div>
    );
}

export default Pagination;
