import { CUSTOMERS } from "../../constants";
import { useState } from "react";
import { Customer } from "../../types/Customer";
import { CustomerService } from "../../services/CustomerService";
import { PAGE_SIZE } from "../../constants";

export function useManageCustomer() {
  const [customers, setCustomers] = useState(CUSTOMERS);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Customer>("firstName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [checkedCustomers, setCheckedCustomers] = useState<number[]>([]);
  const [editCustomerId, setEditCustomerId] = useState(0);

  const handleCustomerCheckChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const customerId = Number(event.target.value);
    if (event.target.checked) {
      setCheckedCustomers([...checkedCustomers, customerId]);
    } else {
      setCheckedCustomers(checkedCustomers.filter((id) => id !== customerId));
    }
  };

  const handleCheckUncheckAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.checked);
    if (event.target.checked) {
      setCheckedCustomers(customers.map((item) => item.id));
    } else {
      setCheckedCustomers([]);
    }
  };

  const handleSearch = (keyword: string) => setSearchKeyword(keyword);

  /*   const applySorting = (
        list: Array<Customer>,
        sortField: string,
        sortDirection: string
      ) => {
        return list.sort((a, b) => {
          const fieldA = a[sortField as keyof Customer];
          const fieldB = b[sortField as keyof Customer];
          if (fieldA < fieldB) {
            return sortDirection === "asc" ? -1 : 1;
          }
          if (fieldA > fieldB) {
            return sortDirection === "asc" ? 1 : -1;
          }
          return 0;
        });
      }; */

  /* const applyPaging = (list: Array<Customer>, currPage: number) => {
        return list.slice((currPage - 1) * PAGE_SIZE, currPage * PAGE_SIZE);
      }; */

  const applyFilterAndSort = (
    list: Array<Customer>,
    keyword: string,
    sortField: string,
    sortDirection: string
  ) => {
    const filtered = CustomerService.filter(list, keyword);
    return CustomerService.applySorting(filtered, sortField, sortDirection);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    console.log("page number", pageNumber);
  };
  const handleSort = (field: keyof Customer) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const customerData = applyFilterAndSort(
    [...customers],
    searchKeyword,
    sortField,
    sortDirection
  );

  const paginatedData = CustomerService.applyPaging(customerData, currentPage);

  const handleEditCustomer = (customer: Customer) => {
    const customerIndex = customers.findIndex((c) => c.id === customer.id);
    const newCustomers = [...customers];
    if (customerIndex === -1) {
      const nextId = Math.max(...customers.map((item) => item.id)) + 1;
      newCustomers.push({ ...customer, id: nextId });
    } else {
      newCustomers[customerIndex] = { ...customer };
    }
    setCustomers(newCustomers);

    /* setCustomers((prevState) =>
          prevState.findIndex((c) => c.id === customer.id) === -1
            ? [
                ...prevState,
                {
                  ...customer,
                  id: Math.max(...prevState.map((item) => item.id)) + 1,
                },
              ]
            : prevState.map((c) => (c.id === customer.id ? { ...customer } : c))
        ); */

    setEditCustomerId(0);
  };

  const handleDelete = (id: number) => {
    setCustomers((prevState) => prevState.filter((cust) => cust.id !== id));

    const totalItemsLeft = customers.length - 1;
    const totalPages = Math.ceil(totalItemsLeft / PAGE_SIZE);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  };

  const handleEditCustomerChange = (id: number) => {
    console.log("edit id ", id);
    setEditCustomerId(id);
  };

  return {
    customers,
    searchKeyword,
    currentPage,
    sortField,
    sortDirection,
    checkedCustomers,
    editCustomerId,
    handleCustomerCheckChange,
    handleCheckUncheckAllChange,
    handleSearch,
    applyFilterAndSort,
    handlePageChange,
    handleSort,
    customerData,
    paginatedData,
    handleEditCustomer,
    handleDelete,
    handleEditCustomerChange,
  };
}
