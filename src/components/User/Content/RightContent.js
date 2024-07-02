const RightContent = (props) => {
    const { dataQuiz } = props;
    console.log('check data quiz: ', dataQuiz);
    return (
        <>
            <div className="main-timer">
                10:10
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <span className="question">{index + 1}</span>
                        )
                    })
                }
            </div>
        </>
    )
}
export default RightContent;