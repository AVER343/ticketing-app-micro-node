import nats from 'node-nats-streaming'
import Listener from './base-listener'
import { Subjects } from './subject'
import { TicketCreatedEvent } from './ticket-created-event'
class TicketCreatedListener extends Listener<TicketCreatedEvent>{
    readonly subject = Subjects.TicketCreated                                             
    queueGroupName: string ='payment-service'
    OnMessage(data: TicketCreatedEvent['data'], msg: nats.Message): void {
       console.log(data)
        msg.ack()
    }
}
export default TicketCreatedListener