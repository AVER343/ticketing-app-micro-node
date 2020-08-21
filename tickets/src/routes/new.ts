import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@sgtickets/common';
import { Ticket } from '../models/ticket';
import { TicketCreatedPublisher } from '../events/publisher/ticket-created-publisher';
import { natsWrapperInstance } from '../nats-wrapper';

const router = express.Router();
router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    new TicketCreatedPublisher(natsWrapperInstance.client).publish({
      id:ticket.id,
      title:String(ticket.title),
      price:ticket.price,
    })
    await ticket.save(); 
    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
