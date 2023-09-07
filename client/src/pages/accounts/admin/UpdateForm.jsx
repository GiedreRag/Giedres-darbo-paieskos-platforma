import { Link } from "react-router-dom";

export function UpdateForm() {
    return (
        <div className="container">
                <ul className="col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><Link to="/paskyra/koreguoti-forma/miestu-sarasas" className="nav-link px-2">Miestu sarasas</Link></li>
                </ul>
        </div>
    );
}