import Property from "../Property/Property.entity";
import User from "../User/User.entity";

export interface LikeBody {
    propertyId: number;
    property?: Property;
    userId: number;
    user?: User;
}