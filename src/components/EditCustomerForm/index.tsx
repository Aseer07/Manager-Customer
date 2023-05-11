import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Customer } from "../../types/Customer";
import { useEditCustomerForm } from "./hooks";

type Props = {
  customer?: Customer;
  onEditCustomer: (customer: Customer) => void;
};

const EditCustomerForm = ({
  customer = {} as Customer,
  onEditCustomer,
}: Props) => {
  const { editedCustomer, handleInputChange, handleSubmit } =
    useEditCustomerForm({ customer, onEditCustomer });

  return (
    <>
      <div>
        <h2>Edit Customer</h2>
        <Form onSubmit={handleSubmit}>
          <div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name: </Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={editedCustomer.firstName || ""}
                placeholder="Enter First Name..."
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>

          <div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name: </Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={editedCustomer.lastName || ""}
                placeholder="Enter Last Name..."
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label> Location: </Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={editedCustomer.location || ""}
                placeholder="Enter Location..."
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              save
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default EditCustomerForm;
