import * as path from 'path'
import { ethers, ContractFactory, Signer } from 'ethers'
import { Interface } from 'ethers/lib/utils'

export const getContractDefinition = (
  name: string,
  isOVM: boolean = false
): any => {
  return require(path.join(
    __dirname,
    `../${isOVM ? 'ovm_' : ''}artifacts`,
    `${name}.json`
  ))
}

export const getContractInterface = (
  name: string,
  isOVM: boolean = false
): Interface => {
  const definition = getContractDefinition(name, isOVM)
  return new ethers.utils.Interface(definition.abi)
}

export const getContractFactory = (
  name: string,
  signer?: Signer,
  isOVM: boolean = false
): ContractFactory => {
  const definition = getContractDefinition(name, isOVM)
  const contractInterface = getContractInterface(name, isOVM)
  return new ContractFactory(contractInterface, definition.bytecode, signer)
}
