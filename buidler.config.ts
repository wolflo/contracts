import { usePlugin, BuidlerConfig, task } from '@nomiclabs/buidler/config'
import * as path from 'path'

import {
  DEFAULT_ACCOUNTS_BUIDLER,
  RUN_OVM_TEST_GAS,
} from './test/helpers/constants'

usePlugin('@nomiclabs/buidler-ethers')
usePlugin('@nomiclabs/buidler-waffle')
usePlugin('buidler-typechain')

import '@eth-optimism/smock/build/src/buidler-plugins/compiler-storage-layout'

task('compile')
  .addFlag('ovm', 'Compile using OVM solc compiler')
  .setAction(async (taskArguments, bre: any, runSuper) => {
    if (taskArguments.ovm) {
      bre.config.solc = {
        path: path.resolve(__dirname, '../../node_modules/@eth-optimism/solc'),
      }
      bre.config.paths.artifacts = './build/ovm_artifacts'
    }
    await runSuper(taskArguments)
  })

const config: BuidlerConfig = {
  networks: {
    buidlerevm: {
      accounts: DEFAULT_ACCOUNTS_BUIDLER,
      blockGasLimit: RUN_OVM_TEST_GAS * 2,
    },
  },
  mocha: {
    timeout: 50000,
  },
  solc: {
    version: '0.7.0',
    optimizer: { enabled: true, runs: 200 },
  },
  typechain: {
    outDir: 'build/types',
    target: 'ethers-v5',
  },
}

export default config
