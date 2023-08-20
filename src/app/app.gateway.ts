import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway');

  handleConnection(client: any, ...args: any[]) {
    this.logger.log('Client Connected...' + client.id);
  }

  handleDisconnect(client: any) {
    this.logger.log('Client Disconnected...' + client.id);
  }
  afterInit(server: any) {
    this.logger.log('Initialised Websockets');
  }

  @SubscribeMessage('msgToServer')
  handleMessage(
    client: Socket,
    data: { user: { name: string; age: string }; message: string },
  ): any {
    this.wss.emit('msgToClient', data);
    // return { event: 'msgToClient', data: text };
  }
}
