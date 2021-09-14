import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x0879C5304437c2b11a3587E70c53Fc2811909c6a"
);

export default instance;
