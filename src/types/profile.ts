export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password?: string;
  address?: string;
  role?:string;
  gender?: string;
  status?: string;     
  image?: string; 
    doctor?: {
    specialization?: string;
    dept?: string;
    work_history?: string;
    available_days?: string[];
    available_times?: string[];
  }; 
    patient?: {
    medical_history?:string;
    dob?:string;
  };
  
}
