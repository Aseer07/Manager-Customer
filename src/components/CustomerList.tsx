import React from "react";
import { Customer } from "../types/Customer";
import { Table, Form, Button } from "react-bootstrap";

interface props {
  customers: Customer[];
  sortField: keyof Customer;
  sortDirection: string;
  checkedCustomers: number[];
  isAllChecked: boolean;
  handleSort: (field: keyof Customer) => void;
  handleCheckChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckUncheckAllChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onEditCustomerChange: (id: number) => void;
  onDelete: (index: number) => void;
}

const CustomerList = ({
  customers,
  sortField,
  sortDirection,
  isAllChecked,
  checkedCustomers,
  handleSort,
  handleCheckChange,
  handleCheckUncheckAllChange,
  onEditCustomerChange,
  onDelete,
}: props) => (
  <Table striped bordered hover size="sm">
    <thead>
      <tr>
        <th
          style={{
            cursor: "pointer",
          }}
          onClick={() => handleSort("id")}
        >
          ID {sortField === "id" ? (sortDirection === "asc" ? "▲" : "▼") : ""}
        </th>
        <th
          style={{ cursor: "pointer" }}
          onClick={() => handleSort("firstName")}
        >
          First Name{" "}
          {sortField === "firstName"
            ? sortDirection === "asc"
              ? "▲"
              : "▼"
            : ""}
        </th>
        <th
          style={{ cursor: "pointer" }}
          onClick={() => handleSort("lastName")}
        >
          Last Name{" "}
          {sortField === "lastName"
            ? sortDirection === "asc"
              ? "▲"
              : "▼"
            : ""}
        </th>
        <th
          style={{ cursor: "pointer" }}
          onClick={() => handleSort("location")}
        >
          Location{" "}
          {sortField === "location"
            ? sortDirection === "asc"
              ? "▲"
              : "▼"
            : ""}
        </th>
        <th>
          <Form.Check
            type="checkbox"
            checked={isAllChecked}
            onChange={handleCheckUncheckAllChange}
          />
        </th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {customers.map((customer) => (
        <tr key={customer.id}>
          <td>{customer.id}</td>
          <td>{customer.firstName}</td>
          <td>{customer.lastName}</td>
          <td>{customer.location}</td>
          <td>
            <Form.Check
              type="checkbox"
              checked={checkedCustomers.includes(customer.id)}
              value={customer.id}
              onChange={handleCheckChange}
            />
          </td>
          <td>
            <Button
              variant="warning"
              onClick={() => onEditCustomerChange(customer.id)}
            >
              Edit
            </Button>{" "}
            <Button variant="danger" onClick={() => onDelete(customer.id)}>
              Delete
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default CustomerList;
