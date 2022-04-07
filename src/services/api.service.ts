import axios from 'axios';
import { BASE_URL } from '../../constants';
import { Block } from '../models/Block';
import { Transaction } from '../models/transactions';
import { Wallet } from "../models/wallet"

export default class api {
  httpClient = axios.create({
    baseURL: BASE_URL
  })

  getWallet = async () : Promise<Wallet> => {
    const response = await this.httpClient.get('/wallet');
    return response.data;
  }

  createWallet = async () : Promise<Wallet> => {
    const response = await this.httpClient.post('/wallet');
    return response.data;
  }

  mine = async () : Promise<number> => {
    const response = await this.httpClient.post('/mine');
    return response.data?.funds;
  }

  addTransaction = async (recipient: string, amount: string) : Promise<any> => {
    const response = await this.httpClient.post('/transaction', { recipient, amount });
    return response.data?.funds;
  }

  getBlockchain = async () : Promise<Block[]> => {
    const response = await this.httpClient.get('/chain');
    return response.data;
  }

  getOpenTransactions = async () : Promise<Transaction[]> => {
    const response = await this.httpClient.get('/open_transactions');
    return response.data?.transactions;
  }
}