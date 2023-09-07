import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { NotAllowed } from "../../components/NotAllowed";
import { AdminPosters } from "./AdminPosters";
import { SellerPosters } from "./SellerPosters";

export function Posters() {
    const { role } = useContext(GlobalContext);

    if (role === 'admin') {
        return <AdminPosters />;
    }

    if (role === 'seller') {
        return <SellerPosters />;
    }

    return <NotAllowed />;

}