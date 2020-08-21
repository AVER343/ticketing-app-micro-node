
import nats from 'node-nats-streaming'
import { Subjects } from './events/subject'
import { TicketCreatedPublisher } from './events/ticket-publisher'
const stan = nats.connect('ticketing','abc',{
    url:'http://localhost:4222'
})
console.clear()
stan.on('connect',async ()=>{
    const publisher = new TicketCreatedPublisher(stan)
    publisher.publish({
        id:'HEY',
        price:20,
        title:'YEAH I WANNA SHOOT !'
    })
  stan.on('close',()=>{
      console.log('closed')
  })
    console.log("CONNECTED TO NATS SERVER !")
})