import { Status } from "../stores/document_store";

const StatusComponent: React.FC<{
    status: Status;
}> = ({
    status
}) => {
    switch (status){
        case Status.Overdue:
            return(<span className="text-red-600">Overdue</span>)
        case Status.Completed:
            return(<span className="text-green-600">Completed</span>)
        case Status.Pending:
            return(<span className="text-yellow-600">Pending</span>)
    }
}

export default StatusComponent