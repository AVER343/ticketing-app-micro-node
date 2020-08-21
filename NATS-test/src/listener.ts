import nats,{Message, Stan} from 'node-nats-streaming'
import { randomBytes } from 'crypto'
import TicketCreatedListener from './events/ticket-created-listener'
import Listener from './events/base-listener'
const stan = nats.connect('ticketing',randomBytes(4).toString('hex'),{
    url:'http://localhost:4222'
})
console.clear()
stan.on('connect',()=>{
    stan.on('close',()=>{
        process.exit()
    })
    new TicketCreatedListener(stan).listener()
})
process.on('SIGTERM',stan.close)
process.on('SIGINT',stan.close)

