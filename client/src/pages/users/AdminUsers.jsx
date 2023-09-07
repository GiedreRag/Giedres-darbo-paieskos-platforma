import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { NotAllowed } from "../../components/NotAllowed";
import { UsersTable } from "../../components/UsersTable";

export function AdminUsers() {
    const { role } = useContext(GlobalContext);

    if (role !== 'admin') {
        return <NotAllowed />;
    }

    return (
        <div className="container">
            <div className="row ">
                <h4 className="col-12 mb-3">
                    Vartotojai
                </h4>
            </div>
            <div className="col-12">
                <UsersTable />
            </div>
        </div>
    );
}