import { TYPES } from './common/di';
import { container } from './common/di/di.service';
import { Application } from './application';

const application = container.get<Application>(TYPES.Application).getApplication;

export { application };