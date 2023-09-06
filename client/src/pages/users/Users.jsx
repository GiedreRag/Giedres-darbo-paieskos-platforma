import { useContext } from "react";
import { AdminUsers } from "./AdminUsers";
import { GlobalContext } from "../../context/GlobalContext";
import { NotAllowed } from "../../components/NotAllowed";

export function Users() {
    const { role } = useContext(GlobalContext);

    if (role === 'admin') {
        return <AdminUsers />;
    }

    return <NotAllowed />;

}