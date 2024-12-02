import { Entitlement } from "../../model/model";
import Quiz from "../quiz/Quiz";
import { useCurrentAccpoount as useCurrentAccount } from "../../hooks/hooks";
import CreateQuiz from "../quiz/CreateQuiz";


const Dashboard = () => {
    const currentUser = useCurrentAccount();

    const isBranchEmployeeAdmin = currentUser?.entitlement?.includes(Entitlement.BranchEmployeeAdmin);
    const isBranchEmployee = currentUser?.entitlement?.includes(Entitlement.BranchEmployee);

    return <div className="min-h-screen flex items-center">
        {isBranchEmployee && !isBranchEmployeeAdmin && <Quiz />}
        {isBranchEmployeeAdmin && <CreateQuiz />}
    </div>

}


export default Dashboard;