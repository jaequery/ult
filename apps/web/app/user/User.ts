export interface User {
  id: number;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  countryCode?: string;
  gender?: string;
  verified?: string;
  visited?: string;
  authenticated?: string;
  deleted?: string;
  updated?: string;
  created: string;
}
