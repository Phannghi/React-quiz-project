import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { IoIosClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

const Question = (props) => {
    const { data, index, isShowAnswer } = props;
    const [isPreviewImage, setIsPreviewImage] = useState(false);

    const { t } = useTranslation();

    if (_.isEmpty(data)) {
        return (<></>)
    }
    const handleCheckbox = (answerId, questionId) => {
        //console.log('id:', answerId, questionId);
        props.handleCheckboxD(answerId, questionId);
    }
    return (
        <>
            {data && data.image ?
                <div className="q-image">
                    <img onClick={() => setIsPreviewImage(true)}
                        src={`data:image/jpeg;base64, ${data.image}`} alt="" />
                    {isPreviewImage &&
                        <Lightbox image={`data:image/jpeg;base64, ${data.image}`}
                            title={'Question image'}
                            onClose={() => setIsPreviewImage(false)}>
                        </Lightbox>}
                </div>
                : <div className="q-image"></div>
            }

            <div className="question">
                {`${t('detailQuiz.question')} ${index + 1}`} : {data.description} ?
            </div>
            <div className="answer">
                {data.answers && data.answers.length > 0 &&
                    data.answers.map((item, idx) => {
                        return (
                            <div key={`ans-${idx}`} className="answer-child">
                                <div className="form-check">
                                    <input
                                        disabled={isShowAnswer}
                                        type="checkbox"
                                        id={`ans-${idx}`}
                                        checked={item.isSelected}
                                        onChange={() => handleCheckbox(item.id, data.questionId)} />
                                    <label className="a-label" htmlFor={`ans-${idx}`}>
                                        {item.description}
                                        {isShowAnswer && <>
                                            {item.isSelected && item.isCorrect === false &&
                                                <IoIosClose className='ms-2' color='#FF0000' size='1.6em' />
                                            }
                                            {item.isCorrect === true &&
                                                <FaCheck className='ms-2' color='#29bf12' size='1.1em' />
                                            }
                                        </>}
                                    </label>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Question;