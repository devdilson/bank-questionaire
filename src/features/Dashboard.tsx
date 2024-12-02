import { useContext } from "react";
import BankService, { BankServiceContext } from "../services";

interface DashboardProps {


}



const Dashboard: React.FC<DashboardProps> = ({ }) => {
    const bankService = useContext(BankServiceContext);

    return (

        <div>

            You are authenticated!

        </div>

    );

}


export default Dashboard;