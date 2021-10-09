import "styles/global.scss"; // Global styles
import { providers } from "ethers"; // Ethers provider
import type { AppProps } from "next/app"; // Types
import { Web3ReactProvider } from "@web3-react/core"; // Web3React

/**
 * Returns instantiated Ethers provider
 * @param provider from Web3React
 * @returns {providers.Web3Provider} ethers provider
 */
function getLibrary(provider: any): providers.Web3Provider {
  return new providers.Web3Provider(provider);
}

export default function FlashbotsRPC({ Component, pageProps }: AppProps) {
  return (
    // Wrap site in Web3 Provider
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}
