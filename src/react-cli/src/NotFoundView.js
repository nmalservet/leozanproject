import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function NotFoundView() {
    const { t } = useTranslation();
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="error-template">
                            <h1>{t('notFound.title')}</h1>
                            <h2> 404 Not Found</h2>
                            <div className="alert alert-warning" role="alert">
                            {t('notFound.message')}<br/>
                            {t('notFound.goHome')} <Link to='/'>{t('notFound.home')}</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}