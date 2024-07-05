import axios from '../utils/axiosCustomize';
const postCreateNewUser = (email, password, username, role, image) => {
    const FormData = require('form-data');

    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data)
}

const putUpdateUser = (id, email, username, role, image) => {
    const FormData = require('form-data');

    const data = new FormData();
    data.append('id', id);
    data.append('email', email);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data)
}

const getAllUsers = () => {
    return axios.get('api/v1/participant/all')
}

const getAllUsersWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const deleteUsers = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } })
}

const postLogin = (userEmail, userPassword) => {
    return axios.post(`api/v1/login`, {
        email: userEmail,
        password: userPassword,
        delay: 3000
    })
}

const registerUser = (email, password, username) => {
    return axios.post(`api/v1/register`, { email, password, username })
}
// const postLogin1 = (email, password) => {
//     return axios.post(`api/v1/login`, { email, password })
//     // {a, b} = {a: a, b: b}
// }

const getQuizByUser = () => {
    return axios.get(`api/v1/quiz-by-participant`);
}

const getDataQuiz = (quizId) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`);
}

const postSubmitQuiz = (data) => {
    return axios.post(`api/v1/quiz-submit`, { ...data });
}

const postCreateNewQuiz = (description, name, difficulty, quizImage) => {
    const FormData = require('form-data');

    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);

    return axios.post('api/v1/quiz', data)
}

const getAllQuizAdmin = () => {
    return axios.get(`api/v1/quiz/all`);
}

const deleteQuiz = (id) => {
    return axios.delete(`api/v1/quiz/${id}`)
}

const putUpdateQuiz = (id, description, name, difficulty, quizImage) => {
    const FormData = require('form-data');

    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);

    return axios.put('api/v1/quiz', data)
}

const postCreateNewQuestionForQuiz = (id, description, questionImage) => {
    const FormData = require('form-data');

    const data = new FormData();
    data.append('quiz_id', id);
    data.append('description', description);
    data.append('questionImage', questionImage);

    return axios.post('api/v1/question', data)
}
const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
    return axios.post('api/v1/answer', {
        description, correct_answer, question_id
    });
}

const postAssignQuizToUser = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', { quizId, userId });
}
const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
}

const postUpsertQA = (data) => {
    return axios.post(`api/v1/quiz-upsert-qa`, { ...data });
}

const logOut = (email, refresh_token) => {
    return axios.post(`api/v1/logout`, { email, refresh_token });
}
export {
    postCreateNewUser, getAllUsers, putUpdateUser, deleteUsers,
    getAllUsersWithPaginate, postLogin, registerUser, getQuizByUser,
    getDataQuiz, postSubmitQuiz, postCreateNewQuiz, getAllQuizAdmin,
    deleteQuiz, putUpdateQuiz, postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion, postAssignQuizToUser, getQuizWithQA,
    postUpsertQA, logOut
}
