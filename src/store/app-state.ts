import { createSlice } from "@reduxjs/toolkit";
import { Block } from "../models/Block";
import { Transaction } from "../models/transactions";
import { Wallet } from "../models/wallet";

export type AppState = {
  wallet: Wallet;
  blockchain: Block[];
  open_transactions: Transaction[];
  loadBlockchain: boolean;
  loadOpenTransactions: boolean;
  nodes: string[];
};

const defaultState: AppState = {
  wallet: {},
  blockchain: [],
  open_transactions: [],
  loadBlockchain: false,
  loadOpenTransactions: false,
  nodes: []
};

const AppSlice = createSlice({
  name: "app",
  initialState: defaultState,
  reducers: {
    updateWallet: (state: AppState, action: any) => {
      state.wallet = action.payload;
    },
    updateBlockchain: (state: AppState, action: any) => {
      state.blockchain = action.payload;
    },
    updateOpenTransactions: (state: AppState, action: any) => {
      state.open_transactions = action.payload;
    },
    updateFunds: (state: AppState, action: any) => {
        state.wallet.funds = action.payload;
    },
    updateChainRequiresUpdate: (state: AppState) => {
        state.loadBlockchain = !state.loadBlockchain
    },
    updateOpenTxRequiresUpdate: (state: AppState) => {
        state.loadOpenTransactions = !state.loadOpenTransactions
    },
    updateNodes: (state: AppState, action: any) => {
      state.nodes = action.payload;
    }
  },
});

export const appActions = AppSlice.actions;
export default AppSlice;
