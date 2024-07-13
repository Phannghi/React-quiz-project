import { useState, useEffect } from "react";
import { updateUserProfile } from "../../redux/action/userAction";
import { postUpdateProfile } from "../../services/apiService";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import _ from 'lodash';

const Information = (props) => {
    const account = useSelector(state => state.user.account)
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [role, setRole] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        if (account && !_.isEmpty(account)) {
            setUsername(account.username);
            setEmail(account.email);
            setRole(account.role);
            setImage("");
            if (account.image)
                setPreviewImage(`${account.image}`);
        }
    }, [account])
    //console.log("checkd account: ", account);

    const handleUpLoadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const handleDeleteImage = (event) => {
        event.preventDefault();
        setImage('');
        setPreviewImage('');
    }

    const handleSubmitUpdateUser = async () => {
        if (!username) {
            toast.error('Username is required');
            return;
        }
        let data = await postUpdateProfile(username, image);
        //console.log('check data: ', data);
        const updateAccount = { ...account, username };
        if (image)
            updateAccount.image = await toBase64(image);
        //console.log(updateAccount);

        dispatch(updateUserProfile(updateAccount));
        if (data && data.EC === 0) {
            toast.success(data.EM);
        } else {
            toast.error(data.EM);
            return;
        }
    }
    //console.log(image);
    return (<>
        <form className="row p-3">
            <div className="col-md-4">
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" value={username}
                        onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} readOnly disabled />
                </div>
                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <input type="text" className="form-control" value={role} readOnly disabled />
                </div>
            </div>
            <div className="col-md-8 d-flex justify-content-center align-items-center">
                <div className="img-wrapper">
                    <div className="img-preview-user">
                        {previewImage ? <img src={previewImage} alt="" />
                            : <span>Preview image</span>
                        }
                    </div>
                    <div className="d-flex align-items-center gap-3 mt-3">
                        <div className="btn-upload">
                            <label className='form-label-img' htmlFor='labelUpload'>
                                Upload
                            </label>
                            <input type="file" id='labelUpload' hidden
                                onChange={(event) => handleUpLoadImage(event)} />
                        </div>
                        <div className="btn-delete">
                            <button
                                className="btn btn-danger"
                                onClick={(event) => handleDeleteImage(event)}
                            >Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div className="ps-3">
            <Button variant="primary" onClick={() => handleSubmitUpdateUser()}>
                Save
            </Button>
        </div>
    </>)
}
export default Information;