export interface User {
    id?: string;
    username: string;
    password: string;
}

export interface Account extends User {
    entitlement?: Entitlement[];
}

export enum Entitlement {
    BranchEmployeeAdmin = "BranchEmployeeAdmin",
    BranchEmployee = "BranchEmployee",
}

export interface BackendError {
    code: string;
    message: string;
    status?: number;
}

export interface Question {
    question: string;
    options: string[];
    correct: number;
}
