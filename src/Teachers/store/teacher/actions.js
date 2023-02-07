import axios from 'axios';

import {
    TEACHER_LOGIN_USER,
    TEACHER_LOGIN_USER_SUCCESS,
    TEACHER_LOGIN_USER_ERROR,
    GET_TEACHERS_BY_ID
} from '../../../redux/actions.js';
import { URL, KEY } from '../../../constants/defaultValues.js';
import {
    setCurrentUser,
    getNormalHeaders,
    openNotificationWithIcon
} from '../../../helpers/Utils.js';

export const teacherLoginUserSuccess = (user) => async (dispatch) => {
    dispatch({
        type: TEACHER_LOGIN_USER_SUCCESS,
        payload: user
    });
};
export const getTeacherByIdSuccess = (user) => async (dispatch) => {
    dispatch({
        type: GET_TEACHERS_BY_ID,
        payload: user
    });
};
export const teacherLoginUserError = (message) => async (dispatch) => {
    dispatch({
        type: TEACHER_LOGIN_USER_ERROR,
        payload: { message }
    });
};

export const getTeacherByID = (id) => async (dispatch) => {
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .get(`${URL.getTeacherById}${id}`, axiosConfig)
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const item = result.data.data[0];
            dispatch(getTeacherByIdSuccess(item));
        } else {
            openNotificationWithIcon('error', 'Something went wrong');
        }
    } catch (error) {
        dispatch(getTeacherByIdSuccess(''));
    }
};
export const teacherCreateMultipleStudent =
    (data, history, setIsClicked) => async () => {
        try {
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);
            const result = await axios
                .post(`${URL.createMultiStudent}`, data, axiosConfig)
                .then((user) => user)
                .catch((err) => {
                    return err.response;
                });
            if (result && result.status === 201) {
                openNotificationWithIcon('success', result.data.data);
                history.push('/teacher/teamlist');
                setIsClicked(false);
            } else {
                openNotificationWithIcon('error', 'Something went wrong');
                setIsClicked(false);
            }
        } catch (error) {
            openNotificationWithIcon('error', error?.response?.data?.message);
            setIsClicked(false);
        }
    };
export const studentResetPassword = (body) => async () => {
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .put(`${URL.studentResetPwd}`, body, axiosConfig)
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            openNotificationWithIcon(
                'success',
                'Password Successfully Updated'
            );
        } else {
            openNotificationWithIcon('error', 'Something went wrong');
        }
    } catch (error) {
        openNotificationWithIcon('error', 'Something went wrong');
    }
};
export const teacherLoginUser = (data, history, module) => async (dispatch) => {
    try {
        const loginData = {
            ...data,
            passwordConfirmation: data.password
        };
        dispatch({ type: TEACHER_LOGIN_USER });
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .post(`${URL.teacherLogin}`, loginData, axiosConfig)
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const item = result.data;
            setCurrentUser(item);
            localStorage.setItem('module', module);
            dispatch(teacherLoginUserSuccess(result));
            history.push('/teacher/dashboard');
        } else {
            openNotificationWithIcon('error', 'Enter the correct credentials');
            dispatch(teacherLoginUserError(result.statusText));
        }
    } catch (error) {
        dispatch(teacherLoginUserError({}));
        // NotificationManager.error(
        //   "Server down! Please try again later.",
        //   "Error",
        //   3000
        // );
    }
};

export const teacherLoginUserLogOut = (history) => async () => {
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios

            .get(`${URL.teacherLogOut}`, axiosConfig)
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            setCurrentUser();
            localStorage.removeItem('headerOption');
            history.push('/teacher');
        }
    } catch (error) {
        console.log('Somethinng went wrong in teachers actions');
    }
};
