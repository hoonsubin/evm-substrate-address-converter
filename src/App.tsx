import React, { useCallback, useState, useMemo } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./toggle-button.css";
import * as polkadotCryptoUtils from "@polkadot/util-crypto";
import * as polkadotUtils from "@polkadot/util";

const PLM_PREFIX = 5;

function App() {
  const [addressType, setAddressType] = useState<"EVM" | "PLM">("PLM");
  const [addressInput, setAddressInput] = useState<string>();
  const [addressPrefix, setAddressPrefix] = useState(PLM_PREFIX);

  const plmToEvm = useCallback(() => {
    if (
      addressInput &&
      addressType === "PLM" &&
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
      addressType === "EVM" &&
      polkadotCryptoUtils.isEthereumChecksum(addressInput)
    ) {
      return polkadotCryptoUtils.evmToAddress(addressInput);
    } else {
      return "invalid";
    }
  }, [addressInput, addressType]);

  const resultAddress = useMemo(() => {
    if (addressType === "EVM") return evmToPlm();
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
              if (addressType === "EVM") setAddressType("PLM");
              else setAddressType("EVM");
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
