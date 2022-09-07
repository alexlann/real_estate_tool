import Property from "../Property/Property.entity";

export interface ImageBody {
    name: string;
    propertyId: number;
    property?: Property;
}