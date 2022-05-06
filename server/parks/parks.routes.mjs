import {Router} from 'express';
import { addPark, editPark, getAllParks, getParkById, getParksByUserId, removePark } from './parks.data.mjs';
// import { getProductBySellerId } from '../products/products.data.mjs';

export const ParksRouter = Router();

/**
 * GET All
 * Get by ID
 * POST
 * PUT by ID
 * DELET by ID
 */

//  READ - GET All
 ParksRouter.get('/', async (req, res) => {
   res.send(await getAllParks());
 });

 //  READ - GET by ID
 ParksRouter.get('/:id', async (req, res) => {
   res.send(await getParkById(req.params.id));
 });

 //READ - Get Parks By User ID
 ParksRouter.get('/users/:id', async (req, res) => {
  res.send(await getParksByUserId(req.params.id));
});

 //READ
 ParksRouter.get('/:id/products', async (req, res) => {
    res.send(await getProductBySellerId(req.params.id));
 });
 
//  POST - add user
 ParksRouter.post('/', async (req, res) => {
   res.send(await addPark(req.body));
 });

 //UPDATE - PUT by ID
 ParksRouter.put('/:id', (req, res) => {
   res.send(editPark(req.params.id, req.body));
 });
 
 //DELETE - DELET by ID
 ParksRouter.delete('/:id', async (req, res) => {
  await removePark(req.params.id)
  res.send('ok');
 });