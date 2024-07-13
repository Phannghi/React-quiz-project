import { useEffect, useState } from 'react';
import { putUpdateQuiz } from '../../../../services/apiService';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import '../ManageUser.scss';
import _ from 'lodash';
import Select from 'react-select';

const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdate, setDataUpdate } = props;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' }
    ]

    // Nếu dataUpdate giữ nguyên thì useEffect sẽ không chạy, useEffect chỉ chạy khi dataUdate thay đổi
    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name);
            setDescription(dataUpdate.description);
            setType(options.find(option => option.value === dataUpdate.difficulty));
            setImage('');
            setPreviewImage(`data:image/jpeg;base64, ${dataUpdate.image}`);
        }
    }, [dataUpdate])

    const handleClose = () => {
        setShow(false);
        setName('');
        setDescription('');
        setType('');
        setImage("");
        setPreviewImage("");
        // Set lại dataUpdate bằng rỗng để lần sau mở modal update data sẽ được cập nhật lại và
        //hàm useEffect sẽ chạy
        setDataUpdate({});
    }

    const handleUpLoadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    }

    const handleSubmitUpdateQuiz = async () => {
        if (!name) {
            toast.error('Invalid name');
            return;
        }

        if (!description) {
            toast.error('Invalid description');
            return;
        }

        let data = await putUpdateQuiz(dataUpdate.id, description, name, type?.value, image);
        //console.log(data);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            await props.fetchAllQuiz();
            handleClose();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }

    }
    return (
        <>
            <Modal
                className='modal-add'
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>Update user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" value={name}
                                onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input type="text"
                                className="form-control"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Type</label>
                            <Select
                                options={options}
                                defaultValue={type}
                                onChange={setType}
                                value={type}
                                placeholder={"Quiz type..."} />
                        </div>
                        <div className="col-md-12">
                            <label className='form-label-img' htmlFor='labelUpload'>
                                <FcPlus /> Upload file Image
                            </label>
                            <input type="file" id='labelUpload' hidden
                                onChange={(event) => handleUpLoadImage(event)} />
                        </div>
                        <div className="col-md-12 img-preview">
                            {previewImage ? <img src={previewImage} alt="" />
                                : <span>Preview image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalUpdateQuiz;