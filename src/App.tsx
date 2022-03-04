import React, { useCallback, useState, useMemo } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./toggle-button.css";
import * as polkadotCryptoUtils from "@polkadot/util-crypto";
import * as polkadotUtils from "@polkadot/util";

const SS58_PREFIX = 5;

function App() {
  const [addressType, setAddressType] = useState<"H160" | "SS58">("SS58");
  const [addressInput, setAddressInput] = useState<string>("");
  const [addressPrefix, setAddressPrefix] = useState(SS58_PREFIX);

  const plmToEvm = useCallback(() => {
    if (
      addressInput &&
      addressType === "SS58" &&
      polkadotCryptoUtils.checkAddress(addressInput, addressPrefix)[0]
    ) {
      return polkadotUtils.u8aToHex(
        polkadotCryptoUtils.addressToEvm(addressInput, true)
      );
    } else {
      return "invalid";
    }
  }, [addressInput, addressType, addressPrefix]);

  const evmToPlm = useCallback(() => {
    if (
      addressInput &&
      addressType === "H160" &&
      polkadotCryptoUtils.isEthereumAddress(addressInput)
    ) {
      return polkadotCryptoUtils.evmToAddress(addressInput, addressPrefix);
    } else {
      return "invalid";
    }
  }, [addressInput, addressPrefix, addressType]);

  const resultAddress = useMemo(() => {
    if (addressType === "H160") return evmToPlm();
    else return plmToEvm();
  }, [evmToPlm, plmToEvm, addressType]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Current address scheme: {addressType}</p>
        <label className="switch">
          <input
            type="checkbox"
            onChange={() => {
              if (addressType === "H160") setAddressType("SS58");
              else setAddressType("H160");
            }}
          />
          <span className="slider round"></span>
        </label>
        <p>Change address prefix</p>
        <input
          type="text"
          value={addressPrefix}
          onChange={(e) => setAddressPrefix(Number.parseInt(e.target.value))}
        ></input>
        <p>Input address</p>
        <input
          type="text"
          value={addressInput}
          onChange={(e) => setAddressInput(e.target.value)}
        ></input>
        <p>{addressInput}</p>
        <p>{resultAddress}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
