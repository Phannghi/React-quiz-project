import { useState, useEffect } from "react";
import { updateUserProfile } from "../../redux/action/userAction";
import { postUpdateProfile } from "../../services/apiService";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import _ from 'lodash';

const Information = (props) => {
    const account = useSelector(state => state.user.account)
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [role, setRole] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const dispatch = useDispatch();
    const { t } = useTranslation();
    useEffect(() => {
        if (account && !_.isEmpty(account)) {
            setUsername(account.username);
            setEmail(account.email);
            setRole(account.role);
            setImage("");
            if (account.image)
                setPreviewImage(`data:image/jpeg;base64, ${account.image}`);
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
        reader.onload = () => {
            let base64String = reader.result;
            // Xóa phần 'data:image/jpeg;base64,' từ chuỗi base64 nếu tồn tại
            base64String = base64String.replace(/^data:image\/[a-z]+;base64,/, '');
            resolve(base64String);
        }
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
        if (image) {
            updateAccount.image = await toBase64(image);
            //console.log('update account: ', updateAccount.image);
        }
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
                    <label className="form-label">{t('profile.information.username')}:</label>
                    <input type="text" className="form-control" value={username}
                        onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">{t('profile.information.email')}:</label>
                    <input type="email" className="form-control" value={email} readOnly disabled />
                </div>
                <div className="mb-3">
                    <label className="form-label">{t('profile.information.role')}:</label>
                    <input type="text" className="form-control" value={role} readOnly disabled />
                </div>
            </div>
            <div className="col-md-8 d-flex justify-content-center align-items-center">
                <div className="img-wrapper">
                    <div className="img-preview-user">
                        {previewImage ? <img src={previewImage} alt="" />
                            : <span>{t('profile.information.previewImage')}</span>
                        }
                    </div>
                    <div className="d-flex align-items-center gap-3 mt-3">
                        <div className="btn-upload">
                            <label className='form-label-img' htmlFor='labelUpload'>
                                {t('profile.information.upload')}
                            </label>
                            <input type="file" id='labelUpload' hidden
                                onChange={(event) => handleUpLoadImage(event)} />
                        </div>
                        <div className="btn-delete">
                            <button
                                className="btn btn-danger"
                                onClick={(event) => handleDeleteImage(event)}
                            >{t('profile.information.delete')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div className="ps-3">
            <Button variant="primary" onClick={() => handleSubmitUpdateUser()}>
                {t('profile.save')}
            </Button>
        </div>
    </>)
}
export default Information;