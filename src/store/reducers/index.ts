import { combineReducers } from "redux";
import { web3State, tokenState, exchangeState } from "../types";
import { ActionType, Web3Action, TokenAction, ExchangeAction } from '../types';


// WEB3 REDUCER
function web3(state: web3State = { account: null, balance: null, connection: null}, action: Web3Action) {
  switch (action.type) {
    case ActionType.WEB3_LOADED:
      return { ...state, connection: action.connection };
    case ActionType.WEB3_ACCOUNT_LOADED:
      return { ...state, account: action.account };
    case ActionType.ETHER_BALANCE_LOADED:
      return { ...state, balance: action.balance };
    default: {
      return state;
    }
  }
}

// TOKEN REDUCER
function token(state: tokenState = { contract: undefined, tokenLoaded: false, balance: undefined }, action: TokenAction) {
  switch (action.type) {
    case ActionType.TOKEN_LOADED:
      return { ...state, contract: action.contract, tokenLoaded: true };
    case ActionType.TOKEN_BALANCE_LOADED:
      return { ...state, balance: action.balance};
    default: {
      return state;
    }
  }
}

// EXCHANGE REDUCER
function exchange(state: exchangeState = { 
  contract: null, 
  exchangeLoaded: false, 
  etherBalance: undefined,
  tokenWithdrawAmount: null,
  allOrders: { data: [],  loaded: false}, 
  filledOrders: { data: [],  loaded: false}, 
  cancelledOrders:  { data: [],  loaded: false}}, 
  action: ExchangeAction) {
  switch (action.type) {
    case ActionType.EXCHANGE_LOADED:
      return { ...state, contract: action.contract, exchangeLoaded: true };
    case ActionType.CANCELLED_ORDERS_LOADED:
      return {
        ...state,
        cancelledOrders: { loaded: true, data: action.cancelledOrders },
      };
    case ActionType.FILLED_ORDERS_LOADED:
      return {
        ...state,
        filledOrders: { loaded: true, data: action.filledOrders },
      };
    case ActionType.ALL_ORDERS_LOADED:
      return { ...state, allOrders: { loaded: true, data: action.allOrders } };
    case ActionType.ORDER_CANCELLING:
      return { ...state, orderCancelling: true };
    case ActionType.ORDER_CANCELLED:
      return {
        ...state,
        orderCancelling: false,
        cancelledOrders: {
          ...state.cancelledOrders,
          date: {
            ...state.cancelledOrders.data,
            action,
          },
        },
      };
    case ActionType.ORDER_FILLING:
      return {
        ...state,
        orderFilling: true,
      };
    case ActionType.ORDER_FILLED:
      // check order
      let index = action.filledOrders.findIndex(
        (order) => order._id === action.order._id
      );
      let data;
      if ((index = -1)) {
        data = [...action.filledOrders, action.order];
      } else {
        data = [...action.filledOrders];
      }

      return {
        ...state,
        orderFilling: false,
        filledOrders: {
          ...state.filledOrders,
          data,
        },
      };
    case ActionType.EXCHANGE_ETHER_BALANCE_LOADED:
      return {
        ...state,
        etherBalance: action.balance
      };
    case ActionType.EXCHANGE_TOKEN_BALANCE_LOADED:
      return {
        ...state,
        tokenBalance: action.balance
      }
    case ActionType.BALANCES_LOADING:
      return {
        ...state,
        balancesLoading: true
      }
    case ActionType.BALANCES_LOADED:
      return {
        ...state,
        balancesLoading: false
      }
    case ActionType.TOKEN_WITHDRAW_AMOUNT_CHANGED:
      return {
        ...state,
        tokenWithdrawAmount: action.amount
      }
    default: {
      return state;
    }
  }
}

// COMBINE THEM ALL
const rootReducer = combineReducers({
  web3,
  token,
  exchange
});

export default rootReducer;