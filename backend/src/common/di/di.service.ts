import 'reflect-metadata';

import { Container } from 'inversify';
import { TYPES } from './types';
import { Application } from '../../application';
import { Constants, ConstantsService } from '../constants';
import { Logger, LoggerService } from '../logger';
import { Luis, LuisService } from '../../services/luis';
import { Database, DatabaseService } from '../database';

let container = new Container();

container.bind<Application>(TYPES.Application).to(Application);
container.bind<Constants>(TYPES.Constants).to(ConstantsService).inSingletonScope();
container.bind<Database>(TYPES.Database).to(DatabaseService).inSingletonScope();
container.bind<Logger>(TYPES.Logger).to(LoggerService).inSingletonScope();
container.bind<Luis>(TYPES.Luis).to(LuisService).inSingletonScope();

export { container };