import { useEffect, useState } from 'react';
import Select from 'react-select';
import './QuizQA.scss';
import { RiImageAddFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { FaRegTrashAlt, FaMinus } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { toast } from 'react-toastify';
import {
    getAllQuizAdmin,
    postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion,
    getQuizWithQA,
    postUpsertQA
} from "../../../../services/apiService";

const QuizQA = (props) => {
    const initQuestions = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false,
                }
            ]
        },
    ];
    const [questions, setQuestions] = useState(initQuestions);
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        url: '',
        title: ''
    });
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});

    useEffect(() => {
        fetchAllQuiz();
        //console.log('questions: ', questions);
    }, []);

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value)
            fetchQuizWithQA();
    }, [selectedQuiz])

    const urltoFile = (url, filename, mimeType) => {
        if (url.startsWith('data:')) {
            var arr = url.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[arr.length - 1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            var file = new File([u8arr], filename, { type: mime || mimeType });
            return Promise.resolve(file);
        }
        return fetch(url)
            .then(res => res.arrayBuffer())
            .then(buf => new File([buf], filename, { type: mimeType }));
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const fetchQuizWithQA = async () => {
        let res = await getQuizWithQA(selectedQuiz.value);
        if (res && res.EC === 0) {
            // convert base64 to File Object
            let newQA = [], qa = res.DT.qa;
            for (const item of qa) {
                if (item.imageFile) {
                    item.imageName = `Question-${item.id}.png`;
                    item.imageFile = await urltoFile(`data:image/png;base64,${item.imageFile}`, `Question-${item.id}.png`, `image/png`)
                }
                newQA.push(item);
            }
            setQuestions(newQA);
            //console.log('check qa: ', newQA);
            //console.log('check res: ', res);
        }
    }

    const fetchAllQuiz = async () => {
        let res = await getAllQuizAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz);
        }
    }
    //console.log('list quiz: ', listQuiz);

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    }
                ]
            };
            setQuestions([...questions, newQuestion])
        }
        if (type === 'REMOVE') {
            let questionClone = _.cloneDeep(questions);
            questionClone = questionClone.filter(item => item.id !== id);
            setQuestions(questionClone);
        }
    }
    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        //let questionClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false,
            }
            // Cach 1:
            // let index = questions.findIndex(item => item.id === questionId);
            // if(index > -1) {
            //   questionClone[index].answers.push(newAnswer)
            //  }
            // setQuestions(questionClone);

            const updatedQuestion = questions.map(question => {
                if (question.id === questionId) {
                    return {
                        ...question, answers: [...question.answers, newAnswer]
                    }
                }
                return question;
            });
            setQuestions(updatedQuestion);
        }
        if (type === 'REMOVE') {
            const updatedQuestion = questions.map(question => {
                if (question.id === questionId) {
                    return {
                        ...question,
                        answers: question.answers.filter(a => a.id !== answerId)
                    }
                }
                return question;
            });
            setQuestions(updatedQuestion);
        }
    }

    const handleOnchange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            const updatedQuestion = questions.map(question => {
                if (question.id === questionId) {
                    return {
                        ...question, description: value
                    }
                }
                return question;
            })
            setQuestions(updatedQuestion);
        }
    }

    const handleOnchangeFileQuestion = (questionId, event) => {
        const updatedQuestion = questions.map(question => {
            if (question.id === questionId) {
                if (event.target && event.target.files && event.target.files[0]) {
                    return {
                        ...question,
                        imageFile: event.target.files[0],
                        imageName: event.target.files[0].name
                    }
                }
            }
            return question;
        })
        setQuestions(updatedQuestion);
    }

    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(question => question.id === questionId);
        if (index > -1) {
            questionClone[index].answers =
                questionClone[index].answers.map(answer => {
                    if (answer.id === answerId) {
                        if (type === 'CHECKBOX') answer.isCorrect = value;
                        if (type === 'INPUT') answer.description = value;
                    }
                    return answer;
                })
            setQuestions(questionClone);
        }
    }

    const handlePreviewImage = (questionId) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(question => question.id === questionId);
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionClone[index].imageFile),
                title: questionClone[index].imageName
            })
            setIsPreviewImage(true);
        }
    }

    const handleSubmitQuestionForQuiz = async () => {
        //validate data
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Please select a quiz');
            return;
        }
        // validate description
        let isValidAnswer = true, isValidQuestion = true, indexA = -1, indexQ = -1;
        for (const [index, question] of questions.entries()) {
            if (!question.description) {
                isValidQuestion = false;
                indexQ = index;
                break;
            }
            for (const [index, answer] of question.answers.entries()) {
                if (!answer.description) {
                    isValidAnswer = false;
                    indexA = index;
                    break;
                }
            }
            indexQ = index;
            if (!isValidAnswer || !isValidQuestion) break;
        }
        if (!isValidAnswer) {
            toast.error(`Not empty Answer ${indexA + 1} at question ${indexQ + 1}`);
            return;
        }
        if (!isValidQuestion) {
            toast.error(`Not empty description for question ${indexQ + 1}`);
            return;
        }

        // validate isCorrect
        for (const [index, question] of questions.entries()) {
            const isValidCorrect = question.answers.some(a => a.isCorrect);
            if (!isValidCorrect) {
                toast.error(`At least 1 answer must be correct at question ${index + 1}`);
                return;
            }
        }
        //submit question 
        let questionClone = _.cloneDeep(questions);
        //console.log(questionClone);
        for (const question of questionClone) {
            if (question.imageFile) {
                question.imageFile = await toBase64(question.imageFile);
            }
        }
        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionClone,
        })
        //console.log("res: ", res);
        console.log('questionClone: ', questionClone);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            fetchQuizWithQA();
        } else {
            toast.error(res.EM);
        }
    }

    return (
        <>
            <div className="question-container">
                <div className="add-new-quiz">
                    <div className="col-8 select-quiz">
                        <label className='form-label fs-6 fw-normal'>Select quiz:</label>
                        <Select
                            defaultValue={selectedQuiz}
                            onChange={setSelectedQuiz}
                            value={selectedQuiz}
                            options={listQuiz}
                        />
                    </div>
                    <h3 className="fs-6 fw-normal mt-3">Add question:</h3>
                    <div className="question-wrapper">
                        {questions && questions.length > 0 &&
                            questions.map((question, index) => {
                                return (
                                    <div key={question.id} className="question-main mb-3">
                                        <div className="question-content row g-4 align-items-center">
                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <input type="text"
                                                        className={`form-control`}
                                                        defaultValue={question.description}
                                                        placeholder="Description"
                                                        onChange={(event) => handleOnchange('QUESTION', question.id, event.target.value)} />
                                                    <label >Question {index + 1}</label>
                                                </div>
                                            </div>
                                            <div className="col-md-3 group-upload">
                                                <label className='form-label-img label-up' htmlFor={`img-${question.id}`}>
                                                    <RiImageAddFill size={'1.5em'} />
                                                </label>
                                                <input type="file" id={`img-${question.id}`} hidden
                                                    onChange={(event) => handleOnchangeFileQuestion(question.id, event)} />
                                                {<span
                                                    className='text-truncate'
                                                    style={{ maxWidth: '120px', cursor: 'pointer' }}>
                                                    {question.imageName ?
                                                        <span onClick={() => handlePreviewImage(question.id)}>{question.imageName}</span>
                                                        :
                                                        'No file choosen'}
                                                </span>}
                                            </div>
                                            <div className="col-md-2 btn-action-question">
                                                <span className='btn-add'
                                                    onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                                    <FaPlus size='1.5em' color='#0582ca' />
                                                </span>
                                                {questions.length > 1 &&
                                                    <span className='btn-remove'
                                                        onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                        <FaRegTrashAlt size='1.5em' color='#dd2d4a' />
                                                    </span>}
                                            </div>
                                        </div>
                                        {question.answers && question.answers.length > 0 &&
                                            question.answers.map((a, idx) => {
                                                return (
                                                    <div key={a.id} className="answer-content">
                                                        <div className="answer-item d-flex">
                                                            <div className="form-check ">
                                                                <input
                                                                    type="checkbox"
                                                                    id={`checkbox-${a.id}`}
                                                                    checked={a.isCorrect}
                                                                    onChange={(e) => handleAnswerQuestion('CHECKBOX', a.id, question.id, e.target.checked)}
                                                                />
                                                                <label className='a-label' htmlFor={`checkbox-${a.id}`}></label>
                                                            </div>
                                                            <div className="col-md-5">
                                                                <div className="form-floating">
                                                                    <input type="text"
                                                                        className={`form-control`}
                                                                        defaultValue={a.description}
                                                                        placeholder="Description"
                                                                        onChange={(e) => handleAnswerQuestion('INPUT', a.id, question.id, e.target.value)} />
                                                                    <label>Answer {idx + 1}</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-2 btn-action-question ms-3">
                                                                <span className='btn-add' onClick={() => handleAddRemoveAnswer('ADD', question.id)}>
                                                                    <FaPlus size='1.5em' color='#38a3a5' />
                                                                </span>
                                                                {question.answers.length > 1 &&
                                                                    <span className='btn-remove' onClick={() => handleAddRemoveAnswer('REMOVE', question.id, a.id)}>
                                                                        <FaMinus size='1.5em' color='#dd2d4a' />
                                                                    </span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                        {questions && questions.length > 0 &&
                            <div className="d-flex mt-4">
                                <button
                                    onClick={() => handleSubmitQuestionForQuiz()}
                                    className='btn btn-primary'>Save</button>
                            </div>
                        }
                        {isPreviewImage &&
                            <Lightbox image={dataImagePreview.url}
                                title={dataImagePreview.title}
                                onClose={() => setIsPreviewImage(false)}>
                            </Lightbox>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuizQA;