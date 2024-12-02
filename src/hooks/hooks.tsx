import { BankServiceContext } from "../services";
import { Account } from "../model/model";
import { useContext } from "react";


export const useCurrentAccpoount = (): Account | null => {
    return useContext(BankServiceContext).getCurrentUser();
}

