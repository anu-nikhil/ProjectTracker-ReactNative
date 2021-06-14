import { USERDETAILS } from '../types/actions';

export const setUserDetails = data => {
    return {
        type: USERDETAILS.SET_USERDETAILS,
        payload: data,
    };
};
export const setUserProjects = data => {
    return {
        type: USERDETAILS.SET_USERPROJECTS,
        payload: data,
    };
};
export const setUserProfilePic = data => {
    return {
        type: USERDETAILS.SET_PROFILE_PIC,
        payload: data,
    };
};
export const logOut = data => {
    return {
        type: USERDETAILS.LOGOUT,
        payload: data,
    };
};
