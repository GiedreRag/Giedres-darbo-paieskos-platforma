import { Link } from "react-router-dom";

export function SellerAccount() {
    return (
        <div className="container" >
            <h1>Sveiki!</h1>
            <ul className="col-12 col-md-auto mb-2 justify-content-center mt-4">
                <li><Link to="/paskyra/skelbimai" className="nav-link px-2">Mano skelbimai</Link></li>
            </ul>
        </div>
    );
}