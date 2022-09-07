import useFetch from "../../../../core/hooks/useFetch";
import Alert from "../../../Design/Alert";
import LoadingIndicator from "../../Shared/Generic/LoadingIndicator/LoadingIndicator";
import { useTranslation } from "react-i18next";
import Title from "../../../Design/Typography/Title";
import PageHeader from "../../../Design/PageHeader";
import useTitle from "../../../../core/hooks/useTitle";
import useRole from "../../../../core/hooks/useRole";
import Title2 from "../../../Design/Typography/Title2";
import { useUser } from "../../Auth/AuthProvider";
import MessageCard from "../../Shared/Messages/Card/MessageCard";
import PropertyCard from "../../Shared/Properties/Card/PropertyCard";
import UserCard from "../../Shared/Users/Card/UserCard";
import AgencyCard from "../../Shared/Agencies/Card/AgencyCard";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AgencyRoutes, MessageRoutes, PropertyRoutes, route, UserRoutes } from "../../../../core/routing";

const DashboardScreen = () => {
    const { t } = useTranslation();
    const user = useUser();

    const agencyId = user.agency.id;
    const messagesPath = useRole("messages");
    const propertiesPath = useRole("properties");
    const usersPath = useRole("users");
    const agenciesPath = useRole("agencies");

    // Get all the data to display on dashboard
    const { isLoading: messagesIsLoading, data: messages, error: messagesError } = useFetch(`/${messagesPath}`);
    const { isLoading: propertiesIsLoading, data: properties, error: propertiesError } = useFetch(`/${propertiesPath}`);
    const { isLoading: usersIsLoading, data: users, error: usersError } = useFetch(`/${usersPath}`);
    const { isLoading: agencyIsLoading, data: agency, error: agencyError } = useFetch(`/${agenciesPath}/${agencyId}`);

    useTitle(t("dashboard.title"));

    if(messagesIsLoading || propertiesIsLoading || usersIsLoading || agencyIsLoading) {
        return <LoadingIndicator />;
    }

    // Display all the different errors
    const errors = [messagesError, propertiesError, usersError, agencyError];
    for (let i = 0; i < errors.length; i++) {
        if(errors[i]) {
            return <Alert color="red">{errors[i]}</Alert>;
        }
    }

    return (
        <>
            <PageHeader>
                <Title>{t("dashboard.title")}</Title>
            </PageHeader>

            <div className="mb-8">
                <Link
                    to={MessageRoutes.Index}>
                    <div className="flex items-center align-between hover:text-green">
                        <Title2>
                            {messages.length} {messages.length === 1 ? t("dashboard.messages.count") : t("dashboard.messages.counts")} - { Object.values(messages).filter(item => item.isRead === false).length } {t("dashboard.unread")}
                        </Title2>
                        <div className="ml-2">
                            <FaAngleRight />
                        </div>
                    </div>
                </Link>
                {messages.length > 0 ? (
                    <MessageCard
                        message={messages[0]}
                    />
                ) : (
                    <Alert color="green">
                        {t("messages.overview.nothing")}
                    </Alert>
                )}
            </div>

            <div className="mb-8">
                <Link
                    to={PropertyRoutes.Index}>
                    <div className="flex items-center align-between hover:text-green">
                        <Title2>
                            {properties.length} {properties.length === 1 ? t("properties.overview.count") : t("properties.overview.counts")}
                        </Title2>
                        <div className="ml-2">
                            <FaAngleRight />
                        </div>
                    </div>
                </Link>
                {properties.length > 0 ? (
                    <PropertyCard
                        property={properties[0]}
                        user={user}
                        showImage={true}
                    />
                ) : (
                    <Alert color="green">
                        {t("properties.overview.nothing")}
                    </Alert>
                )}
            </div>
 
            <div className="mb-8">
                <Link
                    to={UserRoutes.Index}>
                    <div className="flex items-center align-between hover:text-green">
                        <Title2>
                            {users.length} {users.length === 1 ? t("users.overview.count") : t("users.overview.counts")}
                        </Title2>
                        <div className="ml-2">
                            <FaAngleRight />
                        </div>
                    </div>
                </Link>
                {users.length > 0 ? (
                    <UserCard
                        user={users[0]}
                        showAgency={false}
                    />
                ) : (
                    <Alert color="green">
                        {t("users.overview.nothing")}
                    </Alert>
                )}
            </div>

            <div className="mb-8">
                <Link
                    to={route(AgencyRoutes.Edit, {
                        id: user.agency.id,
                    })}>
                    <div className="flex items-center align-between hover:text-green">
                        <Title2>
                            {t("dashboard.profile")}
                        </Title2>
                        <div className="ml-2">
                            <FaAngleRight />
                        </div>
                    </div>
                </Link>
                {agency ? (
                    <AgencyCard
                        agency={agency}
                    />
                ) : (
                    <Alert color="green">
                        {t("agencies.overview.nothing")}
                    </Alert>
                )}
            </div>
        </>
    );
};

export default DashboardScreen;
