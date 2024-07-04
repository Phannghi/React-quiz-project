import CountDown from "./CountDown";

const RightContent = (props) => {
    const { dataQuiz } = props;
    //console.log('check data quiz: ', dataQuiz);
    const timeUp = () => {
        props.handleFinish();
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
                            <span key={`question-${index}`} className="question">{index + 1}</span>
                        )
                    })
                }
            </div>
        </>
    )
}
export default RightContent;