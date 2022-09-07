import { Link } from "react-router-dom";
// import isVoid from "../../../../../core/helpers/isVoid";
import { AgencyRoutes, route } from "../../../../../core/routing";
import Card from "../../../../Design/Card/Card";
import Title2 from "../../../../Design/Typography/Title2";
// import { getImagePath } from "../../../../../core/helpers/api";
import Avatar from "../../../../Design/Avatar";
import EditButton from "../../../../Design/Buttons/EditButton";
import DeleteButton from "../../Generic/Buttons/DeleteButton";
import PropTypes from "prop-types";
import createRandomImage from "../../../../../core/helpers/createRandomImage";

const AgencyCard = ({ agency, handleDelete=undefined }) => {
    return (
        <Card key={agency.id} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                    <Avatar
                        // LOCAL
                        // show icon when no image available
                        // hasIcon={isVoid(agency.avatar)}
                        // src={getImagePath(agency.avatar)}
                        // ONLINE with postgress and ranom img generator
                        src={createRandomImage("agency")}
                        alt={agency.name}
                    />
                <Title2>
                    <Link
                        to={route(AgencyRoutes.Edit, {
                            id: agency.id,
                        })}>
                        {agency.name}
                    </Link>
                </Title2>
            </div>
            {handleDelete && (
                <div>
                    <div className="mt-1 flex gap-x-2">
                        <EditButton
                            href={route(AgencyRoutes.Edit, { id: agency.id })}
                        />
                        <DeleteButton
                            size="sm"
                            id={agency.id}
                            scope="agencies"
                            onSuccess={handleDelete}
                        />
                    </div>
                </div>
            )}
        </Card>
    );
};

AgencyCard.propTypes = {
    handleDelete: PropTypes.func,
    ...Card.propTypes,
};

export default AgencyCard;


