import Agency from "../Agency/Agency.entity";
import Category from "../Category/Category.entity";

export interface PropertyBody {
    title: string;
    town: string;
    street: string;
    price: number;
    categoryId: number;
    category?: Category;
    surfaceArea: number;
    buildYear: number;
    agencyId: number;
    agency?: Agency;
    description: string;
    bathrooms: number;
    bedrooms: number;
    type: string;
    isSold: boolean;
    avatar?: string | null;
}