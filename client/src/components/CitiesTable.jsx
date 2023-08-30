import { Link } from "react-router-dom";

export function CitiesTable() {
    return (
        <div className="container" >
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Miestas</th>
                        <th scope="col">Veiksmai</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Vilnius</td>
                        <td>
                            <Link className="me-2" to='/koreguoti-forma/miestu-sarasas/vilnius'>Koreguoti</Link>
                            <button type='button'>Pasalinti</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Kaunas</td>
                        <td>
                            <Link className="me-2" to='/koreguoti-forma/miestu-sarasas/vilnius'>Koreguoti</Link>
                            <button type='button'>Pasalinti</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}