import {TYPES, container} from '@Common/di';
import {Application} from './application';

const application = container
    .get<Application>(TYPES.Application)
    .getApplication;

export {application};
