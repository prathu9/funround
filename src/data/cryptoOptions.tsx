import BitcoinIcon from "/public/crypto-brand/bitcoin-icon.svg";
import TetherIcon from "/public/crypto-brand/tether-icon.svg";
import EtheriumIcon from "/public/crypto-brand/etherium-icon.svg";
import SolanaIcon from "/public/crypto-brand/solana-icon.svg";
import PepeIcon from "/public/crypto-brand/pepe-icon.svg";
import DogeIcon from "/public/crypto-brand/dogecoin-icon.svg";
import ShibaInuIcon from "/public/crypto-brand/shiba-inu-icon.svg";
import BNBIcon from "/public/crypto-brand/bnb-icon.svg";
import XRPIcon from "/public/crypto-brand/xrp-icon.svg";

const CryptoOptions = [
    { 
      symbol: "BTC",
      name: "bitcoin",
      icon: <BitcoinIcon />
    },
    {
      symbol: "USDT",
      name: "tether",
      icon: <TetherIcon/>,
    },
    {
      symbol: "ETH",
      name: "etherium",
      icon: <EtheriumIcon/>,
    },
    {
      symbol: "SOL",
      name: "solana",
      icon: <SolanaIcon/>,
    },
    {
      symbol: "PEPE",
      name: "pepe",
      icon: <PepeIcon/>
    },
    {
      symbol: "DOGE",
      name: "dogecoin",
      icon: <DogeIcon/>
    },
    {
      symbol: "SHIB",
      name: "shiba inu",
      icon: <ShibaInuIcon/>
    },
    {
      symbol: "BNB",
      name: "BNB",
      icon: <BNBIcon/>
    },
    {
      symbol: "XRP",
      name: "XRP",
      icon: <XRPIcon/>
    }
  ];

  export default CryptoOptions;