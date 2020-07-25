import UnauthorizedAccessPage from './components/pages/UnauthorizedAccessPage';
import NotFoundPage from './components/pages/NotFoundPage';
import {prop} from 'ramda';

function getErrorStatusCodeComponent(errorStatusCode) {
    const renderComponents = {
        [403]: UnauthorizedAccessPage,
        [404]: NotFoundPage,
    };

    return prop(errorStatusCode, renderComponents) || null;
}

export default getErrorStatusCodeComponent;
