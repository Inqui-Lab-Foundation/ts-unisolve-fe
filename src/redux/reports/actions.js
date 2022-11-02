import axios from 'axios';

import { GET_SURVEY_REPORT } from '../actions';
import { URL, KEY } from '../../constants/defaultValues';
import {
    getNormalHeaders,
    openNotificationWithIcon
} from '../../helpers/Utils';

export const getSurveyReportSuccess = (data) => async (dispatch) => {
    dispatch({
        type: GET_SURVEY_REPORT,
        payload: data
    });
};
export const getMentorRegStatusReportSuccess = (data) => async (dispatch) => {
    dispatch({
        type: GET_MRNTOR_REG_STATUS_REPORT,
        payload: data
    });
};
export const getSurveyReport = (surveyId, role, status) => async (dispatch) => {
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            // /quizSurveys/1/surveyStatus?role=MENTOR&quizSurveyStatus=INCOMPLETE
            .get(`${URL.getAdminReports}${surveyId}/surveyStatus?role=${role}&quizSurveyStatus=${status}`, axiosConfig)
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const data = result.data.data && result.data.data.length > 0 ? result.data.data : []
            dispatch(getSurveyReportSuccess(data));
            openNotificationWithIcon("success","Survey fetched successfully")
        }
    } catch (error) {
        dispatch(getSurveyReportSuccess([]))
        openNotificationWithIcon("error","Survey fetched failed")
    }
};
export const getMentorRegStatusReport = (surveyId, role, status) => async (dispatch) => {
    try {
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            // /quizSurveys/1/surveyStatus?role=MENTOR&quizSurveyStatus=INCOMPLETE
            .get(`${URL.getAdminMentorRegStatusReports}`, axiosConfig)
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const data = result.data.data && result.data.data.length > 0 ? result.data.data : []
            dispatch(getMentorRegStatusReportSuccess(data));
            openNotificationWithIcon("success","Teacher data fetched successfully")
        }
    } catch (error) {
        dispatch(getSurveyReportSuccess([]))
        openNotificationWithIcon("error","Teacher data fetched failed")
    }
};
