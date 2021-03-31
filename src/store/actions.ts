import Order from "../types/Order";
import { ActionType,  Web3Action, TokenAction, ExchangeAction } from './types';

// WEB3
export function web3Loaded(connection: any): Web3Action {
    return {
      type: ActionType.WEB3_LOADED,
      connection
    }
  }
  
  export function web3AccountLoaded(account: any): Web3Action {
    return {
      type: ActionType.WEB3_ACCOUNT_LOADED,
      account
    }
  }

  
  // TOKEN
  export function tokenLoaded(contract: any): TokenAction {
    return {
      type: ActionType.TOKEN_LOADED,
      contract
    }
  }

  
  // EXCHANGE
  export function exchangeLoaded(contract: any): ExchangeAction {
    return {
      type: ActionType.EXCHANGE_LOADED,
      contract
    }
  }
  
  export function cancelledOrdersLoaded(cancelledOrders: Order[]): ExchangeAction {
    return {
      type: ActionType.CANCELLED_ORDERS_LOADED,
      cancelledOrders
    }
  }
  
  export function filledOrdersLoaded(filledOrders: Order[]): ExchangeAction {
    return {
      type: ActionType.FILLED_ORDERS_LOADED,
      filledOrders
    }
  }
  
  export function allOrdersLoaded(allOrders: Order[]): ExchangeAction {
    return {
      type: ActionType.ALL_ORDERS_LOADED,
      allOrders
    }
  }
  
  // Cancel Order
  export function orderCancelling(): ExchangeAction {
    return {
      type: ActionType.ORDER_CANCELLING,
    }
  }
  
  export function orderCancelled(order: Order): ExchangeAction {
    return {
      type: ActionType.ORDER_CANCELLED,
      order
    }
  }

  export function fillOrder(filledOrders: Order[], order: Order): ExchangeAction {
    return {
      type: ActionType.ORDER_FILLED,
      filledOrders,
      order
    }
  }

  export function fillingOrder(): ExchangeAction {
    return {
      type: ActionType.ORDER_FILLING,
    }
  }

  // BALANCES
  export function etherBalanceLoaded(balance: number): Web3Action {
    return {
      type: ActionType.ETHER_BALANCE_LOADED,
      balance
    }
  }
  
  export function tokenBalanceLoaded(balance: number): TokenAction {
    return {
      type: ActionType.TOKEN_BALANCE_LOADED,
      balance
    }
  }
  
  export function exchangeEtherBalanceLoaded(balance: number): ExchangeAction {
    return {
      type: ActionType.EXCHANGE_ETHER_BALANCE_LOADED,
      balance
    }
  }
  
  export function exchangeTokenBalanceLoaded(balance: number): ExchangeAction {
    return {
      type: ActionType.EXCHANGE_TOKEN_BALANCE_LOADED,
      balance
    }
  }

  export function balancesLoading(): ExchangeAction {
    return {
      type: ActionType.BALANCES_LOADING
    }
  }  

  export function balancesLoaded(): ExchangeAction {
    return {
      type: ActionType.BALANCES_LOADED
    }
  }
  
  export function etherDepositAmountChanged(amount: number) {
    return {
      type: 'ETHER_DEPOSIT_AMOUNT_CHANGED',
      amount
    }
  }
  
  export function etherWithdrawAmountChanged(amount: number) {
    return {
      type: 'ETHER_WITHDRAW_AMOUNT_CHANGED',
      amount
    }
  }
  
  export function tokenDepositAmountChanged(amount: number) {
    return {
      type: 'TOKEN_DEPOSIT_AMOUNT_CHANGED',
      amount
    }
  }
  
  export function tokenWithdrawAmountChanged(amount: number) {
    return {
      type: ActionType.TOKEN_WITHDRAW_AMOUNT_CHANGED,
      amount
    }
  }