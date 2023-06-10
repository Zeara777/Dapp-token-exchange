import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import config from '../config.json';

import { 
  loadProvider, 
  loadNetwork, 
  loadAccount,
  loadTokens,
  loadExchange
} from '../store/interactions';
import { chain } from 'lodash';


function App() {
  const dispatch = useDispatch()

  const loadBlockchainData = async () => {
    await loadAccount(dispatch)

    //Connect Ethers to  blockchain
    const provider = loadProvider(dispatch)

    //Fetch current network's chainID (e.g. hardhat: 31337)
    const chainID = await loadNetwork(provider, dispatch)

    //Fetch current account & balance from Metamask
    await loadAccount(provider, dispatch)

    //Load token Smart Contract
    const DApp = config[chainID].DApp
    const mETH = config[chainID].mETH
    await loadTokens(provider, [DApp.address, mETH.address], dispatch)

    //Load Exchange Smart Contract
    const exchangeConfig = config[chainID].exchange
    await loadExchange(provider, exchangeConfig.address, dispatch)
  }

  useEffect(() => {
    loadBlockchainData()
  })

  return (
    <div>

      {/* Navbar */}

      <main className='exchange grid'>
        <section className='exchange__section--left grid'>

          {/* Markets */}

          {/* Balance */}

          {/* Order */}

        </section>
        <section className='exchange__section--right grid'>

          {/* PriceChart */}

          {/* Transactions */}

          {/* Trades */}

          {/* OrderBook */}

        </section>
      </main>

      {/* Alert */}

    </div>
  );
}

export default App;