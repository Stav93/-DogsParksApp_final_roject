import {Router} from 'express';
import { addPark, editPark, getAllParks, getParkById, getParksByUserId, removePark } from './parks.data.mjs';
import {addUserLike, removeUserLike,} from "./parks.data.mjs"
// import { getProductBySellerId } from '../products/products.data.mjs';

export const ParksRouter = Router();

/**
 * GET All
 * Get by ID
 * POST
 * PUT by ID
 * DELET by ID
 */

//  READ - GET All parks
 ParksRouter.get('/', async (req, res) => {
   res.send(await getAllParks());
 });

 //  READ - GET park by ID
 ParksRouter.get('/:id', async (req, res) => {
   res.send(await getParkById(req.params.id));
 });

//  POST - like to park by user (search by parkId) - remove userid from users array  in park
ParksRouter.post("/:id/like/", async (req, res) => {
  res.send(await addUserLike(req.params.id, req.body.userId));
})  

//  POST - dislike to park by user (search by parkId) - add userid to users array in park
ParksRouter.post("/:id/dislike/", async (req, res) => {
  res.send(await removeUserLike(req.params.id, req.body.userId));
})  

// ---------------------------------------------------------------------------------------- 

//  POST - add park
ParksRouter.post('/', async (req, res) => {
  res.send(await addPark(req.body));
});

 //UPDATE park - PUT by ID
 ParksRouter.put('/:id', (req, res) => {
   res.send(editPark(req.params.id, req.body));
 });
 
 //DELETE park - DELET by ID
 ParksRouter.delete('/:id', async (req, res) => {
  await removePark(req.params.id)
  res.send('ok');
 });