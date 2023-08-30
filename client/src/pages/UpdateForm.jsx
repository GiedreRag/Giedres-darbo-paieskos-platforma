import { Link } from "react-router-dom";

export function UpdateForm() {
    return (
        <div className="container">
                <ul className="col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><Link to="/koreguoti-forma/miestu-sarasas" className="nav-link px-2">Miestu sarasas</Link></li>
                    {/* <li><Link to="/koreguoti-forma/specialybes" className="nav-link px-2">Specialybes</Link></li> */}
                </ul>
        </div>
    );
}