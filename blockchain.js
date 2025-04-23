// Simple blockchain based on user connections (each user connects to 4 others)
class Blockchain {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    this.createGenesisBlock();
  }

  // Create the first block in the chain (genesis block)
  createGenesisBlock() {
    const block = new Block(0, Date.now(), [], '0');
    this.chain.push(block);
  }

  // Add a new block to the blockchain
  addBlock(block) {
    this.chain.push(block);
  }

  // Add a transaction to the pool
  addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  // Mine the block and create a new one with the pending transactions
  mineBlock() {
    const lastBlock = this.chain[this.chain.length - 1];
    const block = new Block(this.chain.length, Date.now(), this.pendingTransactions, lastBlock.hash);
    
    this.addBlock(block);
    this.pendingTransactions = []; // Clear the pending transactions
  }

  // Get the latest block in the blockchain
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
}

class Block {
  constructor(index, timestamp, transactions, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  // Calculate the hash of the block using a simple SHA256 (or any custom hash function)
  calculateHash() {
    return SHA256(this.index + this.timestamp + JSON.stringify(this.transactions) + this.previousHash).toString();
  }
}

// Transaction logic based on the connection model (users connected to others)
class Transaction {
  constructor(sender, recipient, amount) {
    this.sender = sender;
    this.recipient = recipient;
    this.amount = amount;
    this.timestamp = Date.now();
  }
}

// For hashing (using a simple SHA256 library, such as from the crypto-js package)
const SHA256 = require('crypto-js/sha256');

// Example of creating and using the blockchain
const myBlockchain = new Blockchain();

// Example transactions between users
myBlockchain.addTransaction(new Transaction('user1', 'user2', 10));
myBlockchain.addTransaction(new Transaction('user2', 'user3', 20));

// Mine the block to include these transactions
myBlockchain.mineBlock();

// Display the blockchain
console.log(JSON.stringify(myBlockchain, null, 2));
