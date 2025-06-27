export interface Profile {
  id?: string;
  role?: string;
  profile_image?: string;
  verifiedToken?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  password?: string;
  address?: string;
  gender?: string;
  status?: string;
  passport_number?: string;
  address_document?: string;

  doctor?: {
    imc?: string;
    specialization?: string;
    available_days?: string[];
    doctor_availabilities?: string[];
    available_times?: string[];

    education?: {
      degree_name: string;
      institution_name: string;
      degree_document: string;
    }[];

    insurance?: {
      insurance_number: string;
      insurance_company: string;
      insurance_document: string;
    }[];
  };

  // Patient is not required by the backend payload you shared, so it's optional
  patient?: {
    medical_history?: string;
    dob?: string;
  };
}
export interface ProfileSetupProps {
  form: any;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}
