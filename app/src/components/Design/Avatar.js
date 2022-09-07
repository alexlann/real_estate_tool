import { BiUser } from "react-icons/bi";
import PropTypes from "prop-types";

const Avatar = ({ alt, src, hasIcon=false }) => {
    return hasIcon ?
        <BiUser className="w-12 h-12 rounded-full bg-gray text-green" />
    : <img alt={alt} src={src} className="w-12 h-12 rounded-full object-cover"/>
};

Avatar.propTypes = {
    alt: PropTypes.string,
    hasIcon: PropTypes.bool,
    src: PropTypes.any.isRequired,
};

export default Avatar;
