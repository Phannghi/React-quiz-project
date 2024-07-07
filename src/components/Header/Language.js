import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';
import "/node_modules/flag-icons/css/flag-icons.min.css";

const Language = (props) => {
    const { i18n } = useTranslation();
    const lngs = {
        vi: { nativeName: 'Tiếng Việt', flag: 'vn' },
        en: { nativeName: 'English', flag: 'gb' }
    };
    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language);
        //console.log(i18n.language);
    }
    return (
        <>
            <NavDropdown title={<div className='d-flex align-items-center'>
                <span className={`fi fis fi-${lngs[i18n.language].flag} flag-circle`}></span>
                {/* {lngs[i18n.language].nativeName} */}
            </div>}
                id="basic-nav-dropdown2" className='nav-language'>
                {Object.keys(lngs).map(lng => (
                    <NavDropdown.Item
                        key={lng}
                        onClick={() => handleChangeLanguage(lng)}>
                        {lngs[lng].nativeName}
                    </NavDropdown.Item>
                ))}
            </NavDropdown>
        </>
    )
}
export default Language;