import Head from "next/head"; // Head
import styles from "styles/Home.module.scss"; // Page styles
import { useWeb3React } from "@web3-react/core"; // Web3React
import { InjectedConnector } from "@web3-react/injected-connector"; // MetaMask

export default function Home() {
  // Web3React setup
  const { active, account, activate } = useWeb3React();

  /**
   * Connect metamask
   */
  const connectMetaMask = () => {
    activate(
      new InjectedConnector({
        supportedChainIds: [1, 3, 4, 5, 42],
      })
    );
  };

  /**
   * Add Flashbots RPC to MetaMask
   */
  const addFlashbotsRPC = async () => {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x1",
          chainName: "Flashbots RPC",
          rpcUrls: ["https://rpc.flashbots.net"],
          nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
          },
        },
      ],
    });
  };

  return (
    <div>
      {/* HTML head */}
      <Meta />

      <div className={styles.home}>
        {/* CTA Text */}
        <div className={styles.home__cta}>
          <img src="logo.png" alt="Flashbots logo" />
          <h1>Connect to Flashbots RPC</h1>
          <p>
            The Flashbots RPC lets you send transactions directly to miners via{" "}
            <a
              href="https://github.com/flashbots/pm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Flashbots
            </a>
            , avoiding <strong>sandwich bots</strong> and{" "}
            <strong>reverting transactions</strong>.
          </p>
        </div>

        {/* Add to MetaMask */}
        <div className={styles.home__connect}>
          {!active ? (
            <button onClick={connectMetaMask}>Connect MetaMask</button>
          ) : (
            <>
              <p>Connected as {account}</p>
              <button onClick={addFlashbotsRPC}>Add Flashbots RPC</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Meta() {
  return (
    <Head>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
}
