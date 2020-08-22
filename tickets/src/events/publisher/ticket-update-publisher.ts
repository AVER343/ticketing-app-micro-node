import {Subjects,TicketUpdatedEvent,Publisher} from '@avertickets/common'
export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
   readonly subject = Subjects.TicketUpdated
}