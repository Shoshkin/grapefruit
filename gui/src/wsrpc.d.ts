import { Socket } from 'socket.io-client';
import VueRouter from 'vue-router'

export type RPC = {
  [key: string]: RPC;
  (...args: any): any;
}

type WSEvent = 'ready' | 'destroyed' | 
  'exception' | 'detached' | 'console' | 'crash' |
  'download' | 'delivery'

interface Options {
  router: VueRouter;
}

interface Context {
  socket?: Socket;
}

interface RpcResponse {
  status: 'ok' | 'error';
  data: any;
  error: string;
}

interface WS {
  ready(): Promise<boolean>;
  on(event: WSEvent, cb: Function): WS;
  off(event: WSEvent, cb: Function): WS;
  once(event: WSEvent, cb: Function): WS;
  send(event: string, ...args: any[]): Promise<any>;
}

declare module 'vue/types/vue' {
  interface Vue {
    $rpc: RPC;
    $ws: WS;
    $bus: Vue;
  }
}

declare module "*.json" {
  const value: any;
  export default value;
}
