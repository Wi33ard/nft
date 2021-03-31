import Order from "../types/Order";

// WEB3 STATE
export interface web3State {
  account: any,
  balance: number | null,
  connection: any    
}

// TOKEN STATE
export interface tokenState {
  contract: any,
  tokenLoaded: boolean  ,
  balance?: number | string
}

// EXCHANGE STATE
export interface exchangeState {
  etherBalance?: number | string,
  contract: any,
  exchangeLoaded: boolean,
  allOrders: {
    data: Order[],
    loaded: boolean
  },
  cancelledOrders: {
    data: Order[],
    loaded: boolean
  },
  filledOrders: {
    data: Order[],
    loaded: boolean
  },
  tokenWithdrawAmount: number | null
}

// ALL TOGETHER NOW
export interface AppState {
  web3: web3State,
  token: tokenState,
  exchange: exchangeState,
}

// ACTION TYPES
export enum ActionType {
  WEB3_LOADED = 'WEB3_LOADED',
  WEB3_ACCOUNT_LOADED = 'WEB3_ACCOUNT_LOADED',
  ETHER_BALANCE_LOADED = 'ETHER_BALANCE_LOADED',
  TOKEN_LOADED = 'TOKEN_LOADED',
  TOKEN_BALANCE_LOADED = 'TOKEN_BALANCE_LOADED',
  EXCHANGE_LOADED = 'EXCHANGE_LOADED',
  CANCELLED_ORDERS_LOADED = 'CANCELLED_ORDERS_LOADED',
  FILLED_ORDERS_LOADED = 'FILLED_ORDERS_LOADED',
  ALL_ORDERS_LOADED = 'ALL_ORDERS_LOADED',
  ORDER_CANCELLING = 'ORDER_CANCELLING',
  ORDER_CANCELLED = 'ORDER_CANCELLED',
  ORDER_FILLING = 'ORDER_FILLING',
  ORDER_FILLED = 'ORDER_FILLED',
  EXCHANGE_ETHER_BALANCE_LOADED = 'EXCHANGE_ETHER_BALANCE_LOADED',
  EXCHANGE_TOKEN_BALANCE_LOADED = 'EXCHANGE_TOKEN_BALANCE_LOADED',
  BALANCES_LOADING = 'BALANCES_LOADING',
  BALANCES_LOADED = 'BALANCES_LOADED',
  TOKEN_WITHDRAW_AMOUNT_CHANGED = 'TOKEN_WITHDRAW_AMOUNT_CHANGED'  
}

// WEB3 ACTIONS
interface Web3LoadedAction {
  type: ActionType.WEB3_LOADED,
  connection: any
}
interface Web3AccountLoadedAction {
  type: ActionType.WEB3_ACCOUNT_LOADED,
  account: any
}
interface EtherBalanceLoadedAction {
  type: ActionType.ETHER_BALANCE_LOADED,
  balance: number
}
export type Web3Action = 
| Web3LoadedAction
| Web3AccountLoadedAction
| EtherBalanceLoadedAction;

// TOKEN ACTIONS
interface TokenLoadedAction {
  type: ActionType.TOKEN_LOADED,
  contract: any
}
interface TokenBalanceLoadedAction {
  type: ActionType.TOKEN_BALANCE_LOADED,
  balance: number
}
export type TokenAction =
| TokenLoadedAction
| TokenBalanceLoadedAction;

// EXCHANGE ACTIONS
interface ExchangeLoadedAction {
  type: ActionType.EXCHANGE_LOADED,
  contract: any
}
interface CancelledOrdersLoadedAction {
  type: ActionType.CANCELLED_ORDERS_LOADED,
  cancelledOrders: Order[]
}
interface FilledOrdersLoadedAction {
  type: ActionType.FILLED_ORDERS_LOADED,
  filledOrders: Order[]
}
interface AllOrdersLoadedAction {
  type: ActionType.ALL_ORDERS_LOADED,
  allOrders: Order[]
}
interface OrderCancellingAction {
  type: ActionType.ORDER_CANCELLING
}
interface OrderCancelledAction {
  type: ActionType.ORDER_CANCELLED,
  order: Order
}
interface OrderFillingAction {
  type: ActionType.ORDER_FILLING
}
interface OrderFilledAction {
  type: ActionType.ORDER_FILLED,
  filledOrders: Order[],
  order: Order
}
interface ExchangeEtherBalanceLoadedAction {
  type: ActionType.EXCHANGE_ETHER_BALANCE_LOADED,
  balance: number
}
interface ExchangeTokenBalanceLoadedAction {
  type: ActionType.EXCHANGE_TOKEN_BALANCE_LOADED,
  balance: number
}
interface BalancesLoadingAction {
  type: ActionType.BALANCES_LOADING
}
interface BalancesLoadedAction {
  type: ActionType.BALANCES_LOADED
}
interface TokenWithdrawAmountChangedAction {
  type: ActionType.TOKEN_WITHDRAW_AMOUNT_CHANGED,
  amount: number
}
export type ExchangeAction =
| ExchangeLoadedAction
| CancelledOrdersLoadedAction
| FilledOrdersLoadedAction
| AllOrdersLoadedAction
| OrderCancellingAction
| OrderCancelledAction
| OrderFillingAction
| OrderFilledAction
| ExchangeEtherBalanceLoadedAction
| ExchangeTokenBalanceLoadedAction
| BalancesLoadingAction
| BalancesLoadedAction
| TokenWithdrawAmountChangedAction
;