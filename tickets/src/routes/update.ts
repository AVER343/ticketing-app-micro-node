import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from '@sgtickets/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      throw new NotFoundError();
    }
    const { title, price } = req.body;
    ticket.set({
      title,
      price,
      userId: req.currentUser!.id
    })
    await ticket.save()
    new TicketUpdatedPublisher(natsWrapper.client).publish({
      title:ticket.title,
      price:ticket.price,
      id:ticket.id,
      userId: ticket.id
    })
    res.send(ticket);
  }
);

export { router as updateTicketRouter };
