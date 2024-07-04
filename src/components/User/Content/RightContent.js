import CountDown from "./CountDown";
import { useRef } from "react";

const RightContent = (props) => {
    const { dataQuiz } = props;
    const refDiv = useRef([]);

    const timeUp = () => {
        props.handleFinish();
    }
    // console.log('check data quiz: ', dataQuiz);

    const getClassQuestion = (question) => {
        // nếu câu hỏi có ít nhất 1 câu trả lời được check thì tô xám câu hỏi đó
        if (question && question.answers.length > 0) {
            let select = question.answers.some(answer => answer.isSelected);
            if (select)
                return 'question selected';
        }
        return 'question';
    }
    const handleClickQuestion = (question, index) => {
        props.setIndex(index);
        if (refDiv.current) {
            //console.log(refDiv.current);
            refDiv.current.forEach(item => {
                if (item && item.classList.contains('clicked')) {
                    item.classList.remove('clicked');
                }
            })
        }
        refDiv.current[index].classList.add('clicked');
    }
    return (
        <>
            <div className="main-timer">
                <CountDown onTimeUp={timeUp} />
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <span key={`question-${index}`}
                                className={getClassQuestion(item)}
                                onClick={() => handleClickQuestion(item, index)}
                                ref={element => refDiv.current[index] = element}
                            >{index + 1}</span>
                        )
                    })
                }
            </div>
        </>
    )
}

export default RightContent;