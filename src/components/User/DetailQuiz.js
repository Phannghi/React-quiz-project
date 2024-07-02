import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from 'lodash';
import './DetailQuiz.scss';
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";

const DetailQuiz = (props) => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});

    useEffect(() => {
        fetchQuestion();
    }, [quizId]);

    const fetchQuestion = async () => {
        const res = await getDataQuiz(quizId)
        //console.log('check quesiton', res);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                .groupBy("id")
                .map((value, key) => {
                    let answers = [];
                    let description, image = null;
                    //console.log('key: ', key, ' value: ', value);
                    value.forEach((item, index) => {
                        if (index === 0) {
                            //chỉ cần lặp 1 lần để lấy des và image vì các lần sau des và image cũng giống nhau 
                            description = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    })
                    return { questionId: key, answers, description, image }
                })
                .value()
            setDataQuiz(data);
            //console.log(data);
        }
    }
    //console.log('check data quiz: ', dataQuiz);

    const handleBack = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1);
    }
    const handleNext = () => {
        if (dataQuiz && index + 1 < dataQuiz.length)
            setIndex(index + 1);
    }

    const handleFinish = async () => {
        // {
        //     "quizId": 1,
        //     "answers": [
        //         { 
        //             "questionId": 1,
        //             "userAnswerId": [3]
        //         },
        //         { 
        //             "questionId": 2,
        //             "userAnswerId": [6]
        //         }
        //     ]
        // }
        console.log('check data before submit: ', dataQuiz);
        let payload = {
            quizId: +quizId,
            answers: []
        }
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(item => {
                let questionId = item.questionId;
                let userAnswerId = [];

                item.answers.forEach(a => {
                    if (a.isSelected)
                        userAnswerId.push(a.id);
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            payload.answers = answers;
            console.log('payload: ', payload)
            // submit api
            let res = await postSubmitQuiz(payload);
            console.log('check res: ', res);
            if (res && res.EC === 0) {
                setIsShowModalResult(true);
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizdata: res.DT.quizdata
                });
            } else {

            }
        }
    }
    const handleCheckboxD = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz); //react hook ko co merge state 
        let question = dataQuizClone.find(item => +item.questionId === +questionId);
        if (question && question.answers) {
            let b = question.answers.map(item => {
                if (+item.id === +answerId)
                    item.isSelected = !item.isSelected;
                return item;
            })
            //console.log(b)
            question.answers = b;
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId);
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }

    }
    return (
        <div className="detail-quiz-container container">
            <div className="row gy-2">
                <div className="col-md-8">
                    <div className="left-content h-100">
                        <h2 className="title">
                            Quiz {quizId}: {location?.state?.quizTitle}
                        </h2>
                        <div className="q-body">
                            <img src="" alt="" />
                        </div>
                        <div className="q-content">
                            <Question
                                handleCheckboxD={handleCheckboxD}
                                index={index}
                                data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []} />
                        </div>
                        <div className="footer">
                            {index > 0 ? <button
                                className="btn btn-light border-dark px-3"
                                onClick={() => handleBack()}>Back</button> : ''
                            }
                            {index >= 0 && index + 1 < dataQuiz.length ?
                                <button
                                    className="btn btn-light border-dark px-3"
                                    onClick={() => handleNext()}>Next</button> : ''
                            }
                            <button
                                className="btn btn-danger px-3"
                                onClick={() => handleFinish()}>Finish</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="right-content h-100">
                        <RightContent
                            dataQuiz={dataQuiz} />
                    </div>
                </div>
                <ModalResult
                    show={isShowModalResult}
                    setShow={setIsShowModalResult}
                    dataModalResult={dataModalResult}
                />
            </div>
        </div>
    )
}
export default DetailQuiz;