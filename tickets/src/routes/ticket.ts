import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError,} from '@avertickets/common';
import { body } from 'express-validator';
import Ticket from '../models/tickets';
const router =express.Router()
router.put('/api/tickets/:id',[body('title').not().isEmpty().withMessage('Title should be valid.'),body('price').not().isEmpty().withMessage('Price should be valid!')],
async(req:Request,res:Response)=>{
    const {id} = req.params
    const response = await Ticket.findById(id)
    
    if(!response)
    {
        throw new NotFoundError()
    }
    if(response.id!==req.currentUser)
    {
        throw new NotAuthorizedError()
    }
    response.set({
        title:req.body.title,
        price:req.body.price
    })
    await response.save()
    res.send(response)
})