import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Result = { 'ok' : string } |
  { 'err' : string };
export interface _SERVICE {
  'fetchBinanceOrderbook' : ActorMethod<[], string>,
  'getOrderBook' : ActorMethod<
    [],
    { 'asks' : Array<[number, number]>, 'bids' : Array<[number, number]> }
  >,
  'getPriceData' : ActorMethod<[], Array<[number, number]>>,
  'placeTrade' : ActorMethod<
    [boolean, number, number, boolean, number],
    Result
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
