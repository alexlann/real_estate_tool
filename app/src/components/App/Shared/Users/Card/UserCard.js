import { Link } from "react-router-dom";
// import isVoid from "../../../../../core/helpers/isVoid";
import { route, UserRoutes } from "../../../../../core/routing";
import Card from "../../../../Design/Card/Card";
import Title2 from "../../../../Design/Typography/Title2";
import DeleteButton from "../../Generic/Buttons/DeleteButton";
import PropTypes from "prop-types";
import { formatName } from "../../../../../core/modules/users/utils";
// import { getImagePath } from "../../../../../core/helpers/api";
import EditButton from "../../../../Design/Buttons/EditButton";
import Avatar from "../../../../Design/Avatar";
import createRandomImage from "../../../../../core/helpers/createRandomImage";


const userCard = ({ user, handleDelete=undefined, showAgency=true }) => {

    return (
        <Card key={user.id} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Avatar
                    // LOCAL
                    // show icon when no image available
                    // hasIcon={isVoid(user.avatar)}
                    // src={getImagePath(user.avatar)}
                    // ONLINE with postgress and random image generator
                    src={createRandomImage("user")}
                    alt={formatName(user)}
                />
                <div>
                    <Title2>
                        <Link
                            to={route(UserRoutes.Edit, {
                                id: user.id,
                            })}>
                            {formatName(user)}
                        </Link>
                    </Title2>
                    {showAgency && (
                        <p>{user.role} {user.role === "AGENT" ? user.agency.name : ''}</p>
                    )}
                </div>
            </div>
            {handleDelete && (
                <div>
                    <div className="mt-1 flex gap-x-2">
                        <EditButton
                            href={route(UserRoutes.Edit, { id: user.id })}
                        />
                        <DeleteButton
                            size="sm"
                            id={user.id}
                            scope="users"
                            onSuccess={handleDelete}
                        />
                    </div>
                </div>
            )}
        </Card>
    );
};

userCard.propTypes = {
    showAgency: PropTypes.bool,
    handleDelete: PropTypes.func,
    ...Card.propTypes,
};

export default userCard;


