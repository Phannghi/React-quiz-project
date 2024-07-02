import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { useState } from 'react';

const Question = (props) => {
    const { data, index } = props;
    const [isPreviewImage, setIsPreviewImage] = useState(false);

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
                Question {index + 1}: {data.description} ?
            </div>
            <div className="answer">
                {data.answers && data.answers.length > 0 &&
                    data.answers.map((item, idx) => {
                        return (
                            <div key={`ans-${idx}`} className="answer-child">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        id={`ans-${idx}`}
                                        checked={item.isSelected}
                                        onChange={() => handleCheckbox(item.id, data.questionId)} />
                                    <label className="a-label" htmlFor={`ans-${idx}`}>
                                        {item.description}
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