interface Address {
  buildingNumber: string;
  city: string;
  country: string;
  county_code: string;
  id: number;
  latitude: number;
  longitude: number;
  street: string;
  streetName: string;
  zipcode: string;
}

export interface Person {
  address: Address;
  birthday: string;
  email: string;
  firstname: string;
  gender: string;
  id: number;
  image: string;
  lastname: string;
  phone: string;
  website: string;
}
