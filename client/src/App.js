import { useState, useEffect } from "react";
import Web3 from "web3";
import DAO from "./contracts/DAO.json";
import "./App.css";
import Investors from "./components/Investors/Investors";
import Manager from "./components/Manager/Manager";
import detectEthereumProvider from "@metamask/detect-provider";

function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not connected");
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    async function init() {
      // const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
      const provider = await detectEthereumProvider();
      const web3 = new Web3(provider);
      console.log(web3)
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = DAO.networks[networkId];
      // console.log(networkId)
      // console.log(deployedNetwork)
      const contract = new web3.eth.Contract(DAO.abi, deployedNetwork.address);
      console.log(contract)
      if (provider) {
        provider.request({ method: "eth_requestAccounts" });
        setState({ web3: web3, contract: contract });
      } else {
        console.error("Please install MetaMask");
      }
    }
    init();
  }, []);

  useEffect(() => {
    const { web3 } = state;
    const allAccounts = async () => {
      var select = document.getElementById("selectNumber");
      var options = await web3.eth.getAccounts();

      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
    };
    web3 && allAccounts();
  }, [state]);

  const selectAccount = async () => {
    let selectedAccountAddress = document.getElementById("selectNumber").value;

    if (
      selectedAccountAddress &&
      selectedAccountAddress !== "Choose an account"
    ) {
      setAccount(selectedAccountAddress);
    } else {
      setAccount("Not Connected");
    }
  };

  useEffect(() => {
    const { web3 } = state;
    const balanceSET = async () => {
      if (account !== "Not connected") {
        const fetchedBalance = await web3.eth.getBalance(account);
        const convert = web3.utils.fromWei(fetchedBalance, "ether");
        // console.log(convert);
        setBalance(convert);
      } else {
        setBalance(0);
      }
    };
    web3 && balanceSET();
  }, [state, account]);

  //code for account balance
  return (
    <div className="App">
      <h1>Decentralize Autonoumous Organization</h1>
      <p>Connected Account: {account}</p>
      <p>Available Funds: {balance} ETH</p>
      <form className="label0" id="myForm">
        <label htmlFor=""></label>
        <select className="innerBox" id="selectNumber" onChange={selectAccount}>
          <option align="center">Choose an account</option>
        </select>
      </form>
      <p
        style={{
          color: "rgb(7, 7, 39)",
          textAlign: "center",
          fontSize: "25px",
          fontWeight: "bold",
        }}
      >
        For Manager
      </p>
      <Manager state={state} account={account}></Manager>
      <p
        style={{
          color: "rgb(7, 7, 39)",
          textAlign: "center",
          fontSize: "25px",
          fontWeight: "bold",
        }}
      >
        FOR INVESTORS
      </p>
      <Investors state={state} account={account}></Investors>
    </div>
  );
}
export default App;