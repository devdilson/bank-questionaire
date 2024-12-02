import { useContext } from "react";
import { BankServiceContext } from "../services";
import { Account } from "../model";


export const useCurrentAccpoount = (): Account | null => {
    return useContext(BankServiceContext).getCurrentUser();
}

