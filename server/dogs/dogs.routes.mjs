import {Router} from 'express';
import { addDog, editDog, getAllDogs, getDogById, removeDog, getDogsByUserId } from './dogs.data.mjs';

export const DogsRouter = Router();

/**
 * GET All
 * Get by ID
 * POST
 * PUT by ID
 * DELET by ID
 */

//  READ - GET All
 DogsRouter.get('/', async (req, res) => {
   res.send(await getAllDogs());
 });

 //  READ - GET by ID
 DogsRouter.get('/:id', async (req, res) => {
   res.send(await getDogById(req.params.id));
 });

 
//  POST - add dog
 DogsRouter.post('/', async (req, res) => {
   res.send(await addDog(req.body));
 });

 //UPDATE - PUT by ID
 DogsRouter.put('/:id', async (req, res) => {
   res.send(await editDog(req.params.id, req.body));
 });
 
 //DELETE - DELET by ID
 DogsRouter.delete('/:id', async (req, res) => {
  await removeDog(req.params.id)
  res.send('ok');
 });