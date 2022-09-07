import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../Buttons/Button";
import { t } from "i18next";
import { useUser } from "../../App/Auth/AuthProvider";
import { AuthRoutes, PropertyRoutes } from "../../../core/routing";
import { BiMenu, BiX } from "react-icons/bi";
import { useState } from "react";

const NavBar = ({ navItems = [], onLogout }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const user = useUser();

    const handleMenuOpen = () => {
        setMenuOpen(true);
    }

    const handleMenuClose = () => {
        setMenuOpen(false);
    }

    return (
        <nav>
            {/* Show a different menu layout when logged in */}
            {user ? (
                <>
                    <ul className={`${menuOpen ? "" : "hidden"} z-50 bg-white absolute px-8 py-14 right-0 top-0 text-right h-full w-full sm:h-fit sm:bg-transparent sm:static sm:text-left sm:p-0 sm:flex sm:no-wrap sm:justify-end gap-4`} id="navbarNav">
                        <Button color="black" className="text-4xl sm:hidden" onClick={handleMenuClose}>
                            <BiX />
                        </Button>
                        {navItems.map((navItem) => (
                            // close menu when redirected
                            <li onClick={handleMenuClose} className="pr-4 font-bold text-2xl text-green my-4 hover:text-black sm:text-black sm:hover:text-green sm:my-0 sm:text-lg sm:font-medium sm:leading-normal" key={navItem.href}>
                                <Link
                                    className={` ${
                                        navItem.isActive ? "text-black sm:text-green" : ""
                                    }`}
                                    to={navItem.href}>
                                    {navItem.label}
                                </Link>
                            </li>
                        ))}
                        <Button color="outline" className="my-4 mr-4 sm:mr-0 sm:-mt-1" onClick={onLogout}>
                            {t("navigation.logout")}
                        </Button>
                    </ul>
                    <Button color="black" className={`${!menuOpen ? "" : "hidden"} sm:hidden text-4xl absolute mx-8 my-14 right-0 top-0`} onClick={handleMenuOpen}>
                        <BiMenu />
                    </Button>
                </>
            ) : (
                <div className="flex no-wrap justify-end gap-4">
                    <p className="hover:text-black text-green text-lg font-medium">
                            <Link
                                to={PropertyRoutes.Index}>
                                {t("navigation.properties")}
                            </Link>
                    </p>
                    <Button href={AuthRoutes.Login}>
                        {t("navigation.login")}
                    </Button>
                </div>
            )}
            
        </nav>
    );
};

NavBar.propTypes = {
    onLogout: PropTypes.func.isRequired,
    navItems: PropTypes.arrayOf(
        PropTypes.shape({
            to: PropTypes.string,
            label: PropTypes.string,
        })
    ).isRequired,
};

export default NavBar;
