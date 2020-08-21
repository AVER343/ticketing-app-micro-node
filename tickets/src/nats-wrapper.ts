import nats,{Stan} from 'node-nats-streaming'
class natsWrapper{
    private _client?:Stan;
    get client(){
        if(!this._client){
            throw new Error(" Cannot access client before connecting !")
        }
        return this._client
    }
    connect (clusterID:string,clientID:string,url:string){
        this._client= nats.connect(clusterID,clientID,{url})
        return new Promise((resolve,reject)=>{
            this._client!.on('connect',()=>{
                console.log("NATS CONNECTED !")
                resolve()
            })
            this._client!.on('error',()=>{
                reject()
            })
        })
    }
}
export const natsWrapperInstance  = new natsWrapper()