import { Pagination } from "react-bootstrap";

type Props = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (pageNumber: number) => void;
};

const CustomerPagination = ({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
}: Props) => {
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalItems) return;
    onPageChange(pageNumber);
  };
  const renderPaginationItems = () => {
    let items = [];
    const totalPages = Math.ceil(totalItems / pageSize);
    console.log("totalItems", totalItems);
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <div>
      <Pagination>
        <Pagination.First
          disabled={currentPage === 1}
          onClick={() => handlePageChange(1)}
        />
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        />
        {renderPaginationItems()}
        <Pagination.Next
          disabled={currentPage === totalItems}
          onClick={() => handlePageChange(currentPage + 1)}
        />
        <Pagination.Last
          disabled={currentPage === totalItems}
          onClick={() => handlePageChange(totalItems)}
        />
      </Pagination>
    </div>
  );
};

export default CustomerPagination;
