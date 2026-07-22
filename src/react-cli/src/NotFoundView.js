import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function NotFoundView() {
    const { t } = useTranslation();
    return (
        <div>
            <div className="w-full max-w-screen-xl mx-auto px-4">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full px-4">
                        <div className="error-template">
                            <h1>{t('notFound.title')}</h1>
                            <h2> 404 Not Found</h2>
                            <div className="text-yellow-800 bg-yellow-100 border border-yellow-300 rounded-lg px-4 py-3" role="alert">
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