import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import path from 'path/posix';

import { Socket, Server } from 'socket.io';

@WebSocketGateway(3001, {
  path: '/websocket',
  serveClient: true,
  namespace: '/',
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() sww: Server;

  private logger: Logger = new Logger('AppGateWay');

  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected: ', client.id);
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Client connected: ', client.id);
  }
  afterInit(server: Server) {
    this.logger.log('Inittttttvvv');
  }
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): void {
    this.sww.emit('msgToClient', text);
    // return { event: 'msgToClient', data: text };
  }
}
