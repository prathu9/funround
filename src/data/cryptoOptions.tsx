import BitcoinIcon from "@/crypto-icon/BitcoinIcon";
import BNBIcon from "@/crypto-icon/BNBIcon";
import DogeIcon from "@/crypto-icon/DogeIcon";
import EtheriumIcon from "@/crypto-icon/EtheriumIcon";
import PepeIcon from "@/crypto-icon/PepeIcon";
import ShibaInuIcon from "@/crypto-icon/ShibaInuIcon";
import SolanaIcon from "@/crypto-icon/SolanaIcon";
import TetherIcon from "@/crypto-icon/TetherIcon";
import XRPIcon from "@/crypto-icon/XRPIcon";

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