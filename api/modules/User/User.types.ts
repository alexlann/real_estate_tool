import Agency from "../Agency/Agency.entity";

export interface UserBody {
    firstname: string;
    lastname: string;
    email: string;
    phonenumber: string;
    password?: string;
    role: string;
    agencyId: number | null;
    agency?: Agency;
    avatar?: string | null;
}
