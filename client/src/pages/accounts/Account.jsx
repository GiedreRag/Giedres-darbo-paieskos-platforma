import { useContext } from "react";
import { AdminAccount } from "./admin/AdminAccount";
import { SellerAccount } from "./seller/SellerAccount";
import { GlobalContext } from "../../context/GlobalContext";
import { NotAllowed } from "../../components/NotAllowed";

export function Account() {
    const { role } = useContext(GlobalContext);

    if (role === 'admin') {
        return <AdminAccount />;
    }

    if (role === 'seller') {
        return <SellerAccount />;
    }

    return <NotAllowed />;

}