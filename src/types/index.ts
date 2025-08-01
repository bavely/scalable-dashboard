export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // allow extras
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number | string; // local added users can use string UUIDs
  name: string;
  username?: string;
  email: string;
  phone?: string;
  website?: string;
  address?: Address;
  company?: Company;
}
