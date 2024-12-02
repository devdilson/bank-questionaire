import { Entitlement } from "../../model";
import Quiz from "../quiz/Quiz";
import { useCurrentAccpoount as useCurrentAccount } from "../hooks";
import CreateQuiz from "../quiz/CreateQuiz";


interface DashboardProps { }



const Dashboard: React.FC<DashboardProps> = ({ }) => {
    const currentUser = useCurrentAccount();
    
    const isBranchEmployeeAdmin = currentUser?.entitlement?.includes(Entitlement.BranchEmployeeAdmin);
    const isBranchEmployee = currentUser?.entitlement?.includes(Entitlement.BranchEmployee);

    return <div className="min-h-screen flex items-center">
        {isBranchEmployee && !isBranchEmployeeAdmin && <Quiz />}
        {isBranchEmployeeAdmin && <CreateQuiz />}
    </div>

}


export default Dashboard;