import { Outlet } from "react-router-dom";
import Container from "../Design/Container";
import Header from "./Shared/Generic/Header/Header";

const AppLayout = () => {

    return (
        <>
            <Header />
            <Container>
                <Outlet />
            </Container>
        </>
    );
};

export default AppLayout;
