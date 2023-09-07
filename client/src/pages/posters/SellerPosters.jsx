import { Link } from "react-router-dom";
import { PostersTable } from "../../components/PostersTable";

export function SellerPosters() {
    return (
        <div className="container" >
            <h3>Mano skelbimai</h3>
            <Link to='/paskyra/skelbimai/naujas'>Prideti nauja</Link>
            <div className="col-12">
                <PostersTable />
            </div>
        </div>
    );
}