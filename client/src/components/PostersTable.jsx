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
                    </tr>
                </thead>
                <tbody>
                    {
                        posters.map((poster, idx) => (
                            <tr key={poster.title + idx}>
                                <td>{idx + 1}</td>
                                <td>{poster.img}</td>
                                <td>{poster.proffesion}</td>
                                <td>{poster.title}</td>
                                <td>{poster.city}</td>
                                <td>{poster.salary}</td>
                                <td>
                                    <Link className="btn btn-primary py-2 me-2" to={`/paskyra/skelbimai/koreguoti-skelbima/${poster.title}/koreguoti`}>Koreguoti</Link>
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