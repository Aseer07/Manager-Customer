import { Customer } from "../types/Customer";
import { PAGE_SIZE } from "../constants";

export class CustomerService {
  public static filter(list: Array<Customer>, keyword: string) {
    if (!keyword) return list;
    const keywordInLowercase = keyword.toLowerCase();
    return list.filter(
      (cust) =>
        (cust.firstName &&
          cust.firstName.toLowerCase().includes(keywordInLowercase)) ||
        (cust.lastName &&
          cust.lastName.toLowerCase().includes(keywordInLowercase)) ||
        (cust.location &&
          cust.location.toLowerCase().includes(keywordInLowercase))
    );
  }

  public static applySorting = (
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
  };

  public static applyPaging = (list: Array<Customer>, currPage: number) => {
    return list.slice((currPage - 1) * PAGE_SIZE, currPage * PAGE_SIZE);
  };
}
