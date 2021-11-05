import * as CryptoJS from 'crypto-js';

class Block {
  public id: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timeStamp: number;

  constructor(
    id: number,
    hash: string,
    previousHash: string,
    data: string,
    timeStamp: number
  ) {
    this.id = id;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timeStamp = timeStamp
  }

  static calculateBlockHash = (id: number, previousHash: string, data: string, timeStamp: number): string => CryptoJS.SHA512(id + previousHash + data + timeStamp).toString();

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.id === 'number' && 
    typeof aBlock.hash === 'string' && 
    typeof aBlock.previousHash === 'string' && 
    typeof aBlock.data === 'string' && 
    typeof aBlock.timeStamp === 'number';
  
}

const genesisBlock: Block = new Block(0, "20212101210", "", "data example", Date.now());
let blockChain: [Block] = [genesisBlock];
const getBlockChain = (): [Block] => blockChain;
const getLastBlock = (): Block => blockChain[blockChain.length - 1];
const getTimestamp = (): number => Math.round(new Date().getTime()/1000);
const createNewBlock = (data: string): Block => {
  const lastBlock: Block = getLastBlock();
  const newId: number = lastBlock.id + 1;
  const newTimestamp: number = getTimestamp()
  const newHash: string = Block.calculateBlockHash(newId, lastBlock.hash, data, newTimestamp);
  const newBlock: Block = new Block(newId, newHash, lastBlock.hash, data, newTimestamp);
  addBlock(newBlock);
  return newBlock;
}

const getBlockHash = (block: Block): string => {
  return Block.calculateBlockHash(block.id, block.previousHash, block.data, block.timeStamp);
}
const isBlockValid = (candidate: Block, lastBlock: Block): boolean => {
  if(!Block.validateStructure(candidate)) {
    return false;
  } else if(lastBlock.id + 1 !== candidate.id) {
    return false;
  } else if(lastBlock.hash !== candidate.previousHash) {
    return false;
  } else if(getBlockHash(candidate) !== candidate.hash) {
    return false;
  }
  return true;
}

const addBlock = (candidate: Block): void => {
  if(isBlockValid(candidate, getLastBlock())) blockChain.push(candidate);
}

createNewBlock('second block')
createNewBlock('third block')

console.log(blockChain);