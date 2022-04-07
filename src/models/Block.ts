import { Transaction } from "./transactions";

export interface Block {
    previous_hash: string;
    transactions: Transaction[];
    proof: number;
    timestamp: number;
    index: number;
}