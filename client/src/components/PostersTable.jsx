import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

export function PostersTable() {
    const { posters, updatePosters } = useContext(GlobalContext); 

    useEffect(() => {
        fetch('http://localhost:3001/api/posters/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    updatePosters(data.list);
                }
            })
            .catch(console.error);
    }, []);

    const imageStyle = {
        width: 50,
        height: 50,
        objectFit: 'container',
        objectPosition: 'center',
    }

    return (
        <div className="container" >
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Kompanija</th>
                        <th scope="col">Profesija</th>
                        <th scope="col">Pavadinimas</th>
                        <th scope="col">Miestas</th>
                        <th scope="col">Alga</th>
                        <th scope="col">Veiksmai</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posters.map((poster, idx) => (
                            <tr key={poster.title + idx}>
                                <td>{idx + 1}</td>
                                <td>
                                    <img style={imageStyle} src={poster.img} alt="Car" />
                                </td>
                                <td>{poster.profession}</td>
                                <td>{poster.title}</td>
                                <td>{poster.city}</td>
                                <td>{poster.salary}</td>
                                <td>
                                    <Link className="btn btn-primary me-2" to={`/paskyra/skelbimai/koreguoti-skelbima/${poster.title}/koreguoti`}>Koreguoti</Link>
                                    {/* <button className="btn btn-danger py-2" onClick={() => deletePosterHandler(poster)} type='button'>Pasalinti</button> */}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}