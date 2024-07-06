import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';
const Language = (props) => {
    const { i18n } = useTranslation();
    const lngs = {
        vi: { nativeName: 'Tiếng Việt' },
        en: { nativeName: 'English' }
    };
    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language);
        //console.log(i18n.language);
    }
    return (
        <>
            <NavDropdown title={lngs[i18n.language].nativeName} id="basic-nav-dropdown2" className='nav-language'>
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