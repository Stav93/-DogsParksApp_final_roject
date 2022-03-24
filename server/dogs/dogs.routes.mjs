import {Router} from 'express';
import { addDog, editDog, getAllDogs, getDogById, removeDog } from './dogs.data.mjs';
// import { getProductBySellerId } from '../products/products.data.mjs';

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

 //READ
 DogsRouter.get('/:id/products', async (req, res) => {
    res.send(await getProductBySellerId(req.params.id));
 });
 
//  POST - add user
 DogsRouter.post('/', async (req, res) => {
   res.send(await addDog(req.body));
 });

 //UPDATE - PUT by ID
 DogsRouter.put('/:id', (req, res) => {
   res.send(editDog(req.params.id, req.body));
 });
 
 //DELETE - DELET by ID
 DogsRouter.delete('/:id', async (req, res) => {
  await removeDog(req.params.id)
  res.send('ok');
 });