import React from "react";
import { Account, BackendError, Entitlement, User } from "../model";


export default class BankService {


    private users: Map<string, Account> = new Map();
    private _currentAccount: Account | null = null;

    constructor() {
        this.createBranchManagerAccount();
    }

    private async createBranchManagerAccount() {
        await this.registerAccount({
            username: "admin",
            password: "admin",
        });
        this.users.get("admin")!.entitlement = [Entitlement.BranchEmployee, Entitlement.User];
    }



    async registerAccount(user: User): Promise<Account | BackendError> {
        if (this.users.has(user.username)) {
            return Promise.reject({
                code: "USER_EXISTS",
                message: "User already exists",
            });
        }
        const userId = crypto.randomUUID();
        const account: Account = {
            ...user,
            id: userId,
            entitlement: [Entitlement.User],
        };
        this.users.set(user.username, account);
        return Promise.resolve(account);
    }

    async login(username: string, password: string): Promise<Account | BackendError> {
        const account = this.users.get(username);

        if (!account) {
            return Promise.reject({
                code: "USER_NOT_FOUND",
                message: "The user is not registered",
            });
        }

        if (account.password !== password) {
            return Promise.reject({
                code: "INVALID_CREDENTIALS",
                message: "Invalid password",
            });
        }

        this._currentAccount = account;

        return Promise.resolve(account);
    }

    async logout(): Promise<void> {
        this._currentAccount = null;
    }

    getCurrentUser(): Account | null {
        return this._currentAccount;
    }
}

const service = new BankService();
const BankServiceContext = React.createContext<BankService>(service);

const getBankService = () => service;

export { BankServiceContext, getBankService }