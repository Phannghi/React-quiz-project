import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
const ModalResult = (props) => {
    const { show, setShow, dataModalResult } = props;
    const [isDisabled, setIsDisabled] = useState(false);

    const { t } = useTranslation();
    const handleClose = () => setShow(false);

    const handleShowAnswer = () => {
        handleClose();
        props.setIsShowModalResult(false);
        props.setIsShowAnswer(true);
        setIsDisabled(true);
    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('modalResult.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='mb-2'>
                        {t('modalResult.totalQuestion')}{' '}
                        <span className='badge bg-danger ms-2 px-3 py-1 fs-6'>{dataModalResult.countTotal}</span>
                    </div>
                    <div>
                        {t('modalResult.totalCorrect')}{' '}
                        <span className='badge bg-primary ms-2 px-3 py-1 fs-6'>{dataModalResult.countCorrect}</span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        disabled={isDisabled}
                        variant="secondary"
                        onClick={() => handleShowAnswer()}>
                        {t('modalResult.showAnswerButton')}
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        {t('modalResult.closeButton')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;