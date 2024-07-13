import { toast } from "react-toastify";
import { useState } from "react";
import { postChangePassword } from "../../services/apiService";
import { useTranslation } from "react-i18next";

const Password = (props) => {
    const [currentpassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValidCurrent, setIsValidCurrent] = useState(true);
    const [isValidNew, setIsValidNew] = useState(true);
    const [isValidConfirm, setIsValidConfirm] = useState(true);
    const { t } = useTranslation();

    const handleCurrentPassword = (value) => {
        setCurrentPassword(value);
        setIsValidCurrent(true);
    }
    const handleNewPassword = (value) => {
        setNewPassword(value);
        setIsValidNew(true);
    }

    const handleConfirmNewPassword = (value) => {
        setConfirmPassword(value);
        setIsValidConfirm(true);
        if (newPassword !== value) {
            setIsValidConfirm(false);
        } else {
            setIsValidConfirm(true);
        }
    }

    const handleSubmitChangePassword = async (event) => {
        event.preventDefault();
        if (!currentpassword) {
            setIsValidCurrent(false);
            return;
        }
        if (!newPassword) {
            setIsValidNew(false);
            return;
        }

        if (!confirmPassword) {
            setIsValidConfirm(false);
            return;
        }

        let res = await postChangePassword(currentpassword, newPassword);
        //console.log(res);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            setIsValidCurrent(false);
            return;
        }
    }

    return (
        <>
            <form className="form-password-container">
                <div className="col-4">
                    <div className="mb-3">
                        <label className="form-label">{t('profile.password.currentPassword')}:</label>
                        <input type="password" className={!isValidCurrent ? 'form-control is-invalid' : 'form-control'} value={currentpassword}
                            onChange={(event) => handleCurrentPassword(event.target.value)} required />
                        {!isValidCurrent ? <div className='invalid-feedback'>{t('profile.password.invalidCurrentPassword')}.</div> : ''}
                    </div>
                </div>
                <div className="col-4">
                    <div className="mb-3">
                        <label className="form-label">{t('profile.password.newPassword')}:</label>
                        <input type="password" className={!isValidNew ? 'form-control is-invalid' : 'form-control'} value={newPassword}
                            onChange={(event) => handleNewPassword(event.target.value)} required />
                        {!isValidNew ? <div className='invalid-feedback'>{t('profile.password.requiredNewPassword')}.</div> : ''}
                    </div>
                </div>
                <div className="col-4">
                    <div className="mb-3">
                        <label className="form-label">{t('profile.password.confirmNewPassword')}:</label>
                        <input type="password" className={!isValidConfirm ? 'form-control is-invalid' : 'form-control'}
                            onChange={(event) => handleConfirmNewPassword(event.target.value)} value={confirmPassword} required />
                        {!isValidConfirm ? <div className='invalid-feedback'>{t('profile.password.passwordMismatch')}</div> : ''}
                    </div>
                </div>

                <div className="col-4 mt-2">
                    <button
                        className="w-100 btn btn-primary"
                        onClick={(event) => handleSubmitChangePassword(event)}
                        type="submit">
                        {t('profile.save')}
                    </button>
                </div>
            </form>
        </>
    )
}
export default Password;
