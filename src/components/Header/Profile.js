import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './Profile.scss';
import Information from './Information';
import Password from './Password';
import History from './History';
import { useTranslation } from "react-i18next";

const Profile = (props) => {
    const { show, setShow } = props;
    const [key, setKey] = useState('information');
    const { t } = useTranslation();

    const handleClose = () => {
        setShow(false);
    }

    return (<>
        <Modal
            className='modal-add-user'
            show={show}
            onHide={handleClose}
            size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>{t('profile.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs
                    id="tab"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="information" title={t('profile.information.title')}>
                        <Information />
                    </Tab>
                    <Tab eventKey="password" title={t('profile.password.title')}>
                        <Password />
                    </Tab>
                    <Tab eventKey="history" title={t('profile.history.title')}>
                        <History />
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t('profile.close')}
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}
export default Profile;