import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './Profile.scss';
import Information from './Information';
import Password from './Password';
import History from './History';

const Profile = (props) => {
    const { show, setShow } = props;
    const [key, setKey] = useState('information');
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
                <Modal.Title>Personal Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs
                    id="tab"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="information" title="Information">
                        <Information />
                    </Tab>
                    <Tab eventKey="password" title="Password">
                        <Password />
                    </Tab>
                    <Tab eventKey="history" title="History">
                        <History />
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}
export default Profile;