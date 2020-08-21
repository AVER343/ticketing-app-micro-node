import {Subjects} from './subject'
export interface TicketUpdatedEvent{
    subject:Subjects.TicketCreated,
    data:{
        id:string,
        title:string,
        price:number,
        userId:string
    }
}