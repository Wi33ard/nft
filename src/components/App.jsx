import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import Color from '../abis/Color.json'
import {loadWeb3} from '../store/interactions.js'


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    console.log("TOTAL SUPPLY: ", this.state.totalSupply)
    console.log("CONTRACT: ", this.state.contract)
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = Color.networks[networkId]
    if (networkData) {
      const abi = Color.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
      const totalSupply = await contract.methods.totalSupply().call()
      this.setState({ totalSupply })
      // Load Colors
      for (var i = 1; i <= totalSupply; i++) {
        const color = await contract.methods.colors(i - 1).call()
        this.setState({
          colors: [...this.state.colors, color]
        })
      }
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  mint = (color) => {
    console.log("MINT color:", color);
    this.state.contract.methods.mint(color).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({
          colors: [...this.state.colors, color]
        })
      })
  }

  async handleTransfer(color) {
    try {
      this.state.contract.methods.safeTransferFrom(this.state.account, '0xdE55DeAcF080c305C352c92083F3Ce2b5FcBaE5a', 1).send({ from: this.state.account });
      console.log('starting transfer...');
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  getOwner(color) {
    let owner = "n/a"
    this.state.contract.methods.ownerOf(1).call({ from: this.state.account })
    .then(function(result) {
      if(result!==undefined) {
        owner = result;
        return owner;
      }
    });
    return owner;
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      totalSupply: 0,
      colors: []
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Color Tokens {'{'+this.state.totalSupply+'}'}
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h4>Issue Token</h4>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const color = this.color.value
                  this.mint(color)
                }}>
                  <input
                    type='text'
                    className='form-control mb-1'
                    placeholder='e.g. #FFFFFF'
                    ref={(input) => { this.color = input }}
                  />
                  <input
                    type='submit'
                    className='btn btn-block btn-primary'
                    value='MINT'
                  />
                </form>
              </div>
            </main>
          </div>
          <hr />
          <div className="row text-center">
            {this.state.colors.map((color, key) => {
              return (
                <div key={key} className="col-md-2 mb-2">
                  <div className="token" style={{ backgroundColor: color }}></div>
                  <div className="label">{color}</div>
                  <div>owner: {this.getOwner(color)}</div>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => this.handleTransfer(color)}
                  >
                    Transfer
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
