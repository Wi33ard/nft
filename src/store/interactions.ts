import Web3 from 'web3';
import { Dispatch } from "redux";
import {
  web3Loaded,
  web3AccountLoaded,
  tokenLoaded,
  exchangeLoaded,
  cancelledOrdersLoaded,
  filledOrdersLoaded,
  allOrdersLoaded,
  orderCancelling,
  orderCancelled,
  etherBalanceLoaded,
  tokenBalanceLoaded,
  exchangeEtherBalanceLoaded,
  exchangeTokenBalanceLoaded,
  balancesLoaded,
  balancesLoading
} from './actions';
import Exchange from '../abis/Exchange.json';
import Token from '../abis/Token.json';
import { ETHER_ADDRESS } from "../modules/helpers";


export const loadWeb3 = async (dispatch: Dispatch) => {
  // const web3 = new Web3( new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}'));
  const web3 = await new Web3( new Web3.providers.HttpProvider("http://localhost:7545"));
  dispatch(web3Loaded(web3));
  return web3;

  // MetaMask version
  if(typeof window.ethereum!=='undefined'){
    const web3 = new Web3(window.ethereum)
    dispatch(web3Loaded(web3))
    return web3
  } else {
    window.alert('Please install MetaMask')
    window.location.assign("https://metamask.io/")
  }
}

export const loadAccount = async (web3: Web3, dispatch: Dispatch) => {
  const accounts = await web3.eth.getAccounts()
  const account = accounts[0]
  const web3_updated = dispatch(web3AccountLoaded(account))
  return account
}

export const loadToken = async (web3: Web3, networkId, dispatch: Dispatch) => {
  try {
    const token = new web3.eth.Contract(Token.abi, Token.networks[networkId].address)
    dispatch(tokenLoaded(token))
    return token
  } catch (error) {
    console.log('Contract not deployed to the current network. Please select another network with Metamask.')
    return null
  }
}

export const loadExchange = async (web3: Web3, networkId, dispatch: Dispatch) => {
  try {
    const exchange = new web3.eth.Contract(Exchange.abi, Exchange.networks[networkId].address)
    dispatch(exchangeLoaded(exchange))
    return exchange
  } catch (error) {
    console.log('Contract not deployed to the current network. Please select another network with Metamask.')
    return null
  }
}

export const loadAllOrders = async (exchange, dispatch: Dispatch) => {
  // Fetch cancelled orders with the "Cancel" event stream
  const cancelStream = await exchange.getPastEvents('Cancel', { fromBlock: 0, toBlock: 'latest' })
  // Format cancelled orders
  const cancelledOrders = cancelStream.map((event) => event.returnValues)
  // Add cancelled orders to the redux store
  dispatch(cancelledOrdersLoaded(cancelledOrders))

  // Fetch filled orders with the "Trade" event stream
  const tradeStream = await exchange.getPastEvents('Trade', { fromBlock: 0, toBlock: 'latest' })
  // Format filled orders
  const filledOrders = tradeStream.map((event) => event.returnValues)
  // Add cancelled orders to the redux store
  dispatch(filledOrdersLoaded(filledOrders))

  // Load order stream
  const orderStream = await exchange.getPastEvents('Order', { fromBlock: 0,  toBlock: 'latest' })
  // Format order stream
  const allOrders = orderStream.map((event) => event.returnValues)
  // Add open orders to the redux store
  dispatch(allOrdersLoaded(allOrders))
}

export const cancelOrder = (dispatch: Dispatch, exchange, order, account) => {
  exchange.contract.methods.cancelOrder(order.id).send({ from: account })
  .on('transactionHash', (hash) => {
     dispatch(orderCancelling())
  })
  .on('error', (error: Error) => {
    console.log(error)
    window.alert('There was an error!')
  })
}

export const subscribeToEvents = async (exchange, dispatch: Dispatch) => {
  exchange.events.Cancel({}, (error: Error, event) => {
    dispatch(orderCancelled(event.returnValues))
    if (error){
      console.log('errors', error)
    }
  })
}

export const loadBalances = async ( dispatch: Dispatch, web3, exchange, token, account ) => {
  if (typeof account !== "undefined") {
    // Ether balance in wallet
    const etherBalance = await web3.connection.eth.getBalance(account);
    dispatch(etherBalanceLoaded(etherBalance));

    // Token balance in wallet
    console.log("INTERACTIONS loadBalances token: ", token);
    const tokenBalance = await token.methods.balanceOf(account).call();
    dispatch(tokenBalanceLoaded(tokenBalance));

    // Ether balance in exchange
    const exchangeEtherBalance = await exchange.methods
      .balanceOf(ETHER_ADDRESS, account)
      .call();
    dispatch(exchangeEtherBalanceLoaded(exchangeEtherBalance));

    // Token balance in exchange
    const exchangeTokenBalance = await exchange.methods
      .balanceOf(token.options.address, account)
      .call();
    dispatch(exchangeTokenBalanceLoaded(exchangeTokenBalance));

    // Trigger all balances loaded
    dispatch(balancesLoaded());
  } else {
    window.alert("Please login with MetaMask");
  }
};

// export const depositEther = (dispatch, exchange, web3, amount, account) => {
//   exchange.methods.depositEther().send({ from: account,  value: web3.utils.toWei(amount, 'ether') })
//   .on('transactionHash', (hash) => {
//     dispatch(balancesLoading())
//   })
//   .on('error',(error) => {
//     console.error(error)
//     window.alert(`There was an error!`)
//   })
// }

// export const withdrawEther = (dispatch, exchange, web3, amount, account) => {
//   exchange.methods.withdrawEther(web3.utils.toWei(amount, 'ether')).send({ from: account })
//   .on('transactionHash', (hash) => {
//     dispatch(balancesLoading())
//   })
//   .on('error',(error) => {
//     console.error(error)
//     window.alert(`There was an error!`)
//   })
// }

// export const depositToken = (dispatch, exchange, web3, token, amount, account) => {
//   amount = web3.utils.toWei(amount, 'ether')

//   token.methods.approve(exchange.options.address, amount).send({ from: account })
//   .on('transactionHash', (hash) => {
//     exchange.methods.depositToken(token.options.address, amount).send({ from: account })
//     .on('transactionHash', (hash) => {
//       dispatch(balancesLoading())
//     })
//     .on('error',(error) => {
//       console.error(error)
//       window.alert(`There was an error!`)
//     })
//   })
// }

export const withdrawToken = (dispatch: Dispatch, exchange, web3, token, amount, account) => {
  try {
    exchange.methods.withdrawToken(token.options.address, web3.connection.utils.toWei(amount.toString(), 'ether')).send({ from: account })
    .on('transactionHash', (hash) => {
      dispatch(balancesLoading())
    })
    .on('error',(error) => {
      console.error(error)
      window.alert(`There was an error!`)
    })   
  } catch(error) {
    console.error(error)  
  }
}
