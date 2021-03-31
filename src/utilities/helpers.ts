export const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000';

export const EVM_REVERT = 'VM Exception while processing transaction: revert';

export const DECIMALS = (10**18);

// Shortcut to avoid passing around web3 connection
export const ether = (wei: number) => {
  if(wei) {
    return(wei / DECIMALS) // 18 decimal places
  }
}

// Same as ether
export const tokens = (n: number) => ether(n);

export const RED = 'danger';
export const GREEN = 'success';