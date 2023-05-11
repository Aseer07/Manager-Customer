import SearchBar from "../SearchBar";
import CustomerList from "../CustomerList";
import CustomerPagination from "../CustomerPagination";
import EditCustomerForm from "../EditCustomerForm";
import { useManageCustomer } from "./hooks";
import { PAGE_SIZE } from "../../constants";

const ManageCustomer = () => {
  const {
    customers,
    currentPage,
    sortField,
    sortDirection,
    checkedCustomers,
    editCustomerId,
    handleCustomerCheckChange,
    handleCheckUncheckAllChange,
    handleSearch,
    handlePageChange,
    handleSort,
    customerData,
    paginatedData,
    handleEditCustomer,
    handleDelete,
    handleEditCustomerChange,
  } = useManageCustomer();
  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <CustomerList
        customers={paginatedData}
        sortField={sortField}
        sortDirection={sortDirection}
        checkedCustomers={checkedCustomers}
        isAllChecked={customers.length === checkedCustomers.length}
        handleSort={handleSort}
        handleCheckChange={handleCustomerCheckChange}
        handleCheckUncheckAllChange={handleCheckUncheckAllChange}
        onEditCustomerChange={handleEditCustomerChange}
        onDelete={handleDelete}
      />
      <CustomerPagination
        currentPage={currentPage}
        totalItems={customerData.length}
        onPageChange={handlePageChange}
        pageSize={PAGE_SIZE}
      />
      <EditCustomerForm
        customer={
          editCustomerId > 0
            ? customers.find((c) => c.id === editCustomerId)
            : undefined
        }
        onEditCustomer={handleEditCustomer}
      />
    </>
  );
};
export default ManageCustomer;
