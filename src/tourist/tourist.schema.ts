export class TouristResponse {
  id: string;
  name: string;
  email: string;
  passportNumber: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  trips?: object[];
}
