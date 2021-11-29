export interface BaseCustomer {
  name: string;
  gender: string;
  email: string;
  document: string;
}

export interface Customer extends BaseCustomer {
  id: number;
}