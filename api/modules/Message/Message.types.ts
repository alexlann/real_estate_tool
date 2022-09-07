import Property from "../Property/Property.entity";
import User from "../User/User.entity";

export interface MessageBody {
    propertyId: number;
    property?: Property;
    userId: number;
    user?: User;
    message: string;
    isRead: boolean | false;
}