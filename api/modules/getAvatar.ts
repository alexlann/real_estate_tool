import { UploadedFile } from "express-fileupload";
import { UPLOAD_FOLDER } from "../constants";

// if avatar passed, move to uploads folder and save path
const getAvatar = (avatarReq) => {
    if (avatarReq) {
        const avatar: UploadedFile = Array.isArray(avatarReq)
            ? avatarReq[0]
            : avatarReq;
        const path = `${UPLOAD_FOLDER}/${new Date().getTime()}_${avatar.name}`;
        avatar.mv(path);
        return path;
    }
    return null;
};



export default getAvatar;