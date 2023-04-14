import { Router } from 'express';
import { UsersRouter } from './users/users.routes.mjs';
import { ParksRouter } from './parks/parks.routes.mjs';
import { DogsRouter } from './dogs/dogs.routes.mjs';

export const AppRouter = Router();

AppRouter.use('/users', UsersRouter);
AppRouter.use('/parks', ParksRouter);
AppRouter.use('/dogs', DogsRouter);