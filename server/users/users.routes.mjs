import {Router} from 'express';
import { addUser, editUser, getAllUsers, getUserById, removeUser , getUserByNameAndEmail} from './users.data.mjs';
import { getDogsByUserId } from '../dogs/dogs.data.mjs';

export const UsersRouter = Router();

/**
 * GET All
 * Get by ID
 * POST
 * PUT by ID
 * DELET by ID
 */

//  READ - GET All
 UsersRouter.get('/', async (req, res) => {
   res.send(await getAllUsers());
 });

 //  READ - GET by ID
 UsersRouter.get('/:id', async (req, res) => {
   res.send(await getUserById(req.params.id));
 });

 //READ - Get dog(s) by (User) ID
 UsersRouter.get('/:id/dogs', async (req, res) => {
    res.send(await getDogsByUserId(req.params.id));
 });

//  להביא יוזר עם האימייל והסיסמא ששמנו בלוג אין post 
// res.end מחזירה את היוזר לקליינט
UsersRouter.post('/login', async (req, res) => {
  res.send(await getUserByNameAndEmail(req.body.email, req.body.password));
});

// post - אובייקט מהקליינט לסרבר שמוסיף את היוזר ומחזיר אותו לקליינט
UsersRouter.post('/signup', async (req, res) => {
  res.send(await addUser(req.body));
});

//  POST - add user
//  UsersRouter.post('/', async (req, res) => {
//    res.send(await addUser(req.body));
//  });

 //UPDATE - PUT by ID
 UsersRouter.put('/:id', (req, res) => {
   res.send(editUser(req.params.id, req.body));
 });
 
 //DELETE - DELET by ID
 UsersRouter.delete('/:id', async (req, res) => {
  await removeUser(req.params.id)
  res.send('ok');
 });