import {Subjects,TicketCreatedEvent,Publisher} from '@avertickets/common'
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    readonly subject=Subjects.TicketCreated
}