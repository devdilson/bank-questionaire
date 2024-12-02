export interface User {
    id?: string;
    username: string;
    password: string;
}

export interface Account extends User {
    entitlement?: Entitlement[];
}

export enum Entitlement {
    BranchEmployee = "BranchEmployee",
    User = "User",
}

export interface BackendError {
    code: string;
    message: string;
    status?: number;
}