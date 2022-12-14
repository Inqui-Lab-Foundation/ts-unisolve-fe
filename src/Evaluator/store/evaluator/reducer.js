// Foulders Reducers //
import {
    EVALUATOR_LOGIN_USER,
    EVALUATOR_LOGIN_USER_SUCCESS,
    EVALUATOR_LOGIN_USER_ERROR,
    GET_SUBMITTED_IDEA_LIST,
} from '../../../redux/actions.js';


const INIT_STATE = {
    currentUser: {},
    loading: false,
    error: '',
    submittedIdeaList:null,
    processedRound1List:null,
    yetToProcessRound1List:null,
};
// const dummy = {
//     challenge_response_id: 159,
//     challenge_id: 1,
//     others: '',
//     sdg: 'INDUSTRY, INNOVATION AND INFRASTRUCTURE',
//     team_id: 299,
//     response: {
//         1: {
//             challenge_question_id: '1',
//             selected_option: ['h'],
//             question:
//                 'Write the problem that you have chosen to solve and why? (not more than 1000 characters)',
//             word_limit: 1000,
//             question_type: 'TEXT',
//             question_no: 2
//         },
//         2: {
//             challenge_question_id: '1',
//             selected_option: ['h'],
//             question:
//                 'Write your teams idea/solution for the problem identified above. Give as much detail as possible and explain your solution clearly. (not more than 3000 characters)',
//             word_limit: 3000,
//             question_type: 'TEXT',
//             question_no: 3
//         },
//         5: {
//             challenge_question_id: '1',
//             selected_option: ['Experience'],
//             question:
//                 'Which of the following problem finding techniques did your team used to FIND a problem',
//             word_limit: 5000,
//             question_type: 'MCQ',
//             question_no: 4
//         },
//         6: {
//             challenge_question_id: '1',
//             selected_option: ['Mind-Map'],
//             question:
//                 'Which of the following Activities/ techniques did your team use to EXPLORE  the problem deeper?',
//             word_limit: 5000,
//             question_type: 'MCQ',
//             question_no: 5
//         },
//         7: {
//             challenge_question_id: '1',
//             selected_option: ['What-If Technique'],
//             question:
//                 'Which of the following IDEATION TECHNIQUES did your team make use of to come-up with a solution? ',
//             word_limit: 5000,
//             question_type: 'MCQ',
//             question_no: 6
//         },
//         8: {
//             challenge_question_id: '1',
//             selected_option: [
//                 'We made changes to our idea after collecting feedback'
//             ],
//             question:
//                 'Which of the below feedback mechanisms did your team adopt? ',
//             word_limit: 5000,
//             question_type: 'MCQ',
//             question_no: 7
//         },
//         9: {
//             challenge_question_id: '1',
//             selected_option: ['h'],
//             question:
//                 'Mention at least one feedback that your team found to be most helpful in creating the final solution to your problem. (not more than 500 characters)',
//             word_limit: 500,
//             question_type: 'TEXT',
//             question_no: 9
//         },
//         10: {
//             challenge_question_id: '1',
//             selected_option: ['No'],
//             question: 'Did your team make a prototype to test your solution?',
//             word_limit: 5000,
//             question_type: 'MRQ',
//             question_no: 10
//         },
//         11: {
//             challenge_question_id: '1',
//             selected_option: [
//                 'https://unisole-assets.s3.ap-south-1.amazonaws.com/ideas/299/IMG_0030.HEIC'
//             ],
//             question:
//                 'If yes, upload images of your prototype. (THIS IS NOT MANDATORY)',
//             word_limit: 5000,
//             question_type: 'DRAW',
//             question_no: 11
//         },
//         13: {
//             challenge_question_id: '1',
//             selected_option: ['h'],
//             question:
//                 "Title/Name of your team's idea (Not more than 100 characters) ",
//             word_limit: 100,
//             question_type: 'TEXT',
//             question_no: 1
//         },
//         14: {
//             challenge_question_id: '1',
//             selected_option: ['Yes'],
//             question:
//                 'Did your team complete and submit worksheets to your School SIDP Guide Teacher?',
//             word_limit: 100,
//             question_type: 'MRQ',
//             question_no: 8
//         }
//     },
//     initiated_by: 878,
//     submitted_by: 878,
//     status: 'SUBMITTED',
//     openIdeas: 34,
//     evaluatedIdeas: 3
// };

export default (state = INIT_STATE, action) => {
    const newState = { ...state };
    switch (action.type) {
    case EVALUATOR_LOGIN_USER:
        return { ...state, loading: true, error: '' }; 
    case EVALUATOR_LOGIN_USER_SUCCESS:
        return {
            ...state,
            loading: false,
            currentUser: action.payload, 
            error: '',
        };
    case EVALUATOR_LOGIN_USER_ERROR:
        return {
            ...state,
            loading: false,
            currentUser: null,
            error: action.payload.message,
        };
    case GET_SUBMITTED_IDEA_LIST:
        return {
            ...state,
            submittedIdeaList:action.payload,
        };
    default:
        return newState;
    }
};
