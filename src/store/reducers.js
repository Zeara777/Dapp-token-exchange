export const provider = (state = {}, action) => {
    switch (action.type) {
      case 'PROVIDER_LOADED':
        return {
          ...state,
          connection: action.connection
        }
      case 'NETWORK_LOADED':
        return {
          ...state,
          chainId: action.chainId
        }
      case 'ACCOUNT_LOADED':
        return {
          ...state,
          account: action.account
        }
      case 'ETHER_BALANCE_LOADED':
        return {
          ...state,
          balance: action.balance
        }
  
      default:
        return state
    }
  }
  
  const DEFAULT_TOKENS_STATE = {
    loaded: false,
    contracts: [],
    symbols: []
  }
  
  export const tokens = (state = DEFAULT_TOKENS_STATE, action) => {
    switch (action.type) {
      case 'TOKEN_1_LOADED':
        return {
          ...state,
          loaded: true,
          contracts: [action.token],
          symbols: [action.symbol]
        }
      case 'TOKEN_1_BALANCE_LOADED':
        return {
          ...state,
          balances: [action.balance]
        }

      case 'TOKEN_2_LOADED':
        return {
          ...state,
          loaded: true,
          contracts: [...state.contracts, action.token],
          symbols: [...state.symbols, action.symbol]
        }

      case 'TOKEN_2_BALANCE_LOADED':
        return {
          ...state,
          balances: [...state.balances, action.balance]
        }
  
        default:
          return state
    }
  }

  const DEFAULT_EXCHANGE_STATE = {
    loaded: false,
    contract: {},
    transaction: {
      isSuccessful: false
    },
    events: []
  }
  
  export const exchange = (state = { loaded: false, contract: {} }, action) => {
    switch (action.type) {
      case 'EXCHANGE_LOADED':
        return {
          ...state,
          loaded: true,
          contract: action.exchange
        }

      // -----------------------------------------------------------------------------------
      // Balance Cases
      case 'EXCHANGE_TOKEN_1_BALANCE_LOADED':
        return {
          ...state,
          balances: [action.balance]
        }
        case 'EXCHANGE_TOKEN_2_BALANCE_LOADED':
        return {
          ...state,
          balances: [...state.balances, action.balance]
        }

        // ----------------------------------------------------------------------------------
        // Transfer Cases (Deposit & Withdraw)
        case 'TRANSFER_REQUEST':
          return {
            ...state,
            transaction: {
              transactionType: 'Transfer',
              isPending: true,
              isSuccessful: false
            },
            transferInProgress: true
          }
        case 'TRANSFER_SUCCESS':
          return {
            ...state,
            transaction: {
              transactionType: 'Transfer',
              isPending: false,
              isSuccessful: true
            },
            transferInProgress: false,
            events: [action.event, ...state.events]
          }
        case 'TRANSFER_FAIL':
          return {
            ...state,
            transaction: {
              transactionType: 'Transfer',
              isPending: false,
              isSuccessful: false,
              isError: true

            },
            transferInProgress: false
          }
  
        default:
          return state
    }
  }
  