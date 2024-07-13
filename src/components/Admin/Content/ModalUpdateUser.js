import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../services/apiService'
import _ from 'lodash';
const ModalUpdateUser = (props) => {
    const { show, setShow, dataUpdate, setDataUpdate } = props;
    const handleClose = () => {
        setShow(false);
        setEmail("");
        setUsername("");
        setPassword("");
        setRole("USER");
        setImage("");
        setPreviewImage("");
        // Set lại dataUpdate bằng rỗng để lần sau mở modal update data sẽ được cập nhật lại và
        //hàm useEffect sẽ chạy
        setDataUpdate({});
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    // Nếu dataUpdate giữ nguyên thì useEffect sẽ không chạy, useEffect chỉ chạy khi dataUdate thay đổi
    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
            setImage("");
            if (dataUpdate.image)
                setPreviewImage(`data:image/jpeg;base64, ${dataUpdate.image}`);
        }
    }, [dataUpdate])
    console.log(previewImage);
    const handleUpLoadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmitCreateUser = async () => {
        //validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid email');
            return;
        }

        let data = await putUpdateUser(dataUpdate.id, email, username, role, image);
        //console.log('>>>component update respone:', data);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // Sau khi đóng modal thì gọi lại hàm fetch từ props để set lại ListUsers
            //await props.fetchListUsers();
            await props.fetchListUsersWithPaginate(props.currentPage);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (
        <>
            <Modal
                className='modal-add-user'
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
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email}
                                onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password"
                                className="form-control"
                                value={password}
                                disabled
                                placeholder='••••••••'
                                onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" value={username}
                                onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select
                                className="form-select"
                                onChange={(event) => setRole(event.target.value)}
                                value={role}>
                                <option value='USER'>USER</option>
                                <option value='ADMIN'>ADMIN</option>
                            </select>
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
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalUpdateUser;