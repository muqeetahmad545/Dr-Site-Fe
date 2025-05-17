  export interface Doctor {
    id: string;
    first_name?: string;
    last_name?: string;
    email: string;
    phone?: string;
    password?: string;
    address?: string;
    gender?: string;
    specialization?: string;
    pastExperience?: string;
    status?: string;  doctor: {
    id: number;
    user_id: number;
    specialization: string | null;
    dept: string | null;
    work_history: string | null;
    available_days: string | null;
    available_times: string | null;
  };
  }