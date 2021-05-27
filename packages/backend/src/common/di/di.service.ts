import 'reflect-metadata';

import {Container} from 'inversify';
import {TYPES} from './types';
import {Application} from '@App/application';
import {Constants, ConstantsService} from '@Common/constants';
import {Logger, LoggerService} from '@Common/logger';
import {Luis, LuisService} from '@Services/luis';
import {Database, DatabaseService} from '@Common/database';

const container = new Container();

container.bind<Application>(TYPES.Application).to(Application);
container.bind<Constants>(TYPES.Constants).to(ConstantsService).inSingletonScope();
container.bind<Database>(TYPES.Database).to(DatabaseService).inSingletonScope();
container.bind<Logger>(TYPES.Logger).to(LoggerService).inSingletonScope();
container.bind<Luis>(TYPES.Luis).to(LuisService).inSingletonScope();

export {container};
