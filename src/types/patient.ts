export interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password?: string;
  address?: string;
  gender?: string;
  age?: string;
  bloodGroup?: string;
  condition?: string;
  status?: string;     
}
