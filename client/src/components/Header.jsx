import { Link } from "react-router-dom";

export function Header() {
    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <div className="col-md-3 mb-2 mb-md-0">
                    <Link to="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                        <p>LOGO</p>
                    </Link>
                </div>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><Link to="/" className="nav-link px-2 link-secondary">Pagrindinis</Link></li>
                    <li><Link to="/" className="nav-link px-2">Visi darbo pasiulymai</Link></li>
                </ul>

                <div className="col-md-3 text-end">
                    <Link to="/prisijungimas" className="btn btn-outline-primary me-2">Prisijunkti</Link>
                    <Link to="/registracija" className="btn btn-primary">Registruotis</Link>
                </div>
            </header>
        </div>
    );
}