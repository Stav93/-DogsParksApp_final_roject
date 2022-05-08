import {Router} from 'express';
import { addPark, editPark, getAllParks, getParkById, getParksByUserId, removePark } from './parks.data.mjs';
import {addUserLike} from "./parks.data.mjs"
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
//  ParksRouter.get('/users/:id', async (req, res) => {
//   res.send(await getParksByUserId(req.params.id));
// });
 
//  POST - add user
 ParksRouter.post('/', async (req, res) => {
   res.send(await addPark(req.body));
 });

//  POST - like to park by user - add userid to users array
ParksRouter.post("/:id/like/", async (req, res) => {
  res.send(await addUserLike(req.params.id, req.body.userId));
})  

 //UPDATE - PUT by ID
 ParksRouter.put('/:id', (req, res) => {
   res.send(editPark(req.params.id, req.body));
 });
 
 //DELETE - DELET by ID
 ParksRouter.delete('/:id', async (req, res) => {
  await removePark(req.params.id)
  res.send('ok');
 });