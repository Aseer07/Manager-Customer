import { useState } from "react";
import { Customer } from "../../types/Customer";

type Props = {
  customer: Customer;
  onEditCustomer: (customer: Customer) => void;
};

export function useEditCustomerForm({ customer, onEditCustomer }: Props) {
  const [editedCustomer, setEditedCustomer] = useState(customer);

  if (customer.id !== editedCustomer.id) {
    setEditedCustomer({ ...customer });
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onEditCustomer(editedCustomer);
    setEditedCustomer({} as Customer);
  };

  return { editedCustomer, handleInputChange, handleSubmit };
}
