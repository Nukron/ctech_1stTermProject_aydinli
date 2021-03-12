
import axios from "axios";
import retry from "p-retry";
//import WebSocket from 'ws';
import _ from 'lodash';

class UnrealEngine {
  constructor() {
    this.requestQueue = [];
    this.abortTimestamp = Date.now();
    this.canSendRequest = true;
    this.timeout = null;
    this.connection= WebSocket;
    this.notification = WebSocket;
    this.wsRequest = 1;
    this.httpRequest = 1;
    this.pendings = {id: (reply) => {} }
  }

  async initialize() {
    this.connect();
  };

  isConnected() {
    return (this.connection.readyState === WebSocket.OPEN);
  };

  connect(){
      if (this.connection.readyState === WebSocket.OPEN || this.connection.readyState === WebSocket.CONNECTING){
        console.log('Connected to UE Remote WebSocket');
        return;
      }

      const address = `ws://localhost:30020`;
      this.connection = new WebSocket(address);
      this.connection.onmessage = (event) => {
        this.onMessage(event)
      }
      

      
       //      .on('open', this.onConnected())
      //       .on('message', onMessage())
            // .on('error', onError())
      //       .on('close', onClose());

            this.notification = new WebSocket(address);
            // notification
            // .on('open', onConnected())
            // .on('message', onMessage())
            // .on('error', () => {});
        };

        onConnected() {          
            if (this.connection.readyState !== WebSocket.OPEN || this.notification.readyState !== WebSocket.OPEN)
              return;
        
            // if (quitTimout) {
            //   clearTimeout(quitTimout);
            //   quitTimout = undefined;
            // }
            
            console.log('Connected to UE Remote WebSocket');
          };


        onError(error) {
            console.log('UE Remote WebSocket:', error.message);
        }


        verifyConnection() {
          if (this.connection.readyState !== WebSocket.OPEN || this.notification.readyState != WebSocket.OPEN)
            throw new Error('Websocket is not connected');
        }






        async getProperty(message, objectPath, propertyName, retryCount = 0, sync = false, socket) {
          this.verifyConnection();
          const RequestId = this.httpRequest++;
          socket = this.connection;
          
          let requestBody = {
            "ObjectPath": objectPath,
            "PropertyName": propertyName,
            "Access": "READ_ACCESS"
          };

          let parameters = {
            "Url" : "/remote/object/property",
            "Verb" : "PUT",
            "RequestId" : RequestId,
            "Body" : requestBody,
          };


     

          socket.send(JSON.stringify({ MessageName: message, Parameters: parameters }));


         
          return new Promise(resolve => {
           // if(this.pendings[RequestId] != null){
            //resolve(this.pendings[RequestId]);
            //console.log("Orkunenenen" + this.pendings[1]);
            resolve(this.pendings);
          //}
          
          });


     
      
        };


        


        setProperty(message, objectPath, propertyName, value, retryCount = 0, sync = false, socket) {
          this.verifyConnection();

          socket = this.connection;
          
          let requestBody = {
            "ObjectPath": objectPath,
            "PropertyName": propertyName,
            "PropertyValue": value,
            "Access": "WRITE_TRANSACTION_ACCESS"
          };

          let parameters = {
            "Url" : "/remote/object/property",
            "Verb" : "PUT",
            "Body" : requestBody,
          };

          socket.send(JSON.stringify({ MessageName: message, Parameters: parameters }));
      
        };



        send(message, parameters, socket) {
          this.verifyConnection();
          const Id = this.wsRequest++;
          socket = connection;
          //socket.send(JSON.stringify({ MessageName: message, Id, Parameters: parameters }));
        };
      

        onMessage(event) {

          
          try {
            if (event.data instanceof Blob) {
             let reader = new FileReader();
              reader.onload = () => {
                  let message = JSON.parse(reader.result);
                  console.log(message)
                  if (message.RequestId) {
                   this.pendings[message.RequestId] = message.ResponseBody

                   console.log(this.pendings[message.RequestId])
                   //console.log(this.pendings); 
                 
                    

                  }
              };
              reader.readAsText(event.data);
            }
            
    
            // if (message.RequestId) {
            //   const promise = pendings[message.RequestId];
            //   if (!promise)
            //     return;
      
            //   delete pendings[message.RequestId];
            //   promise?.(message.ResponseBody);
            //   return;
            // }
      
          } catch (error) {
            console.log('Failed to parse answer', error.message, JSON.stringify(message.data));
          }
          
         
   
        };
  



}

export default new UnrealEngine();


