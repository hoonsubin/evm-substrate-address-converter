import * as polkadotCryptoUtils from '@polkadot/util-crypto';
import * as polkadotUtils from '@polkadot/util';
import web3Utils from 'web3-utils';

export type AddrType = 'SS58' | 'EVM';

export const isSs58Address = (address: string, prefix = 5): boolean => {
    return polkadotCryptoUtils.checkAddress(address, prefix)[0];
};

export const getAddrType = (address: string): AddrType => {
    if (polkadotCryptoUtils.isEthereumAddress(address)) {
        return 'EVM' as AddrType;
    } else {
        return 'SS58';
    }
};
