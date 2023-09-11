import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

export function PostersTable({ filterCity, filterProfession, role }) {
    const { posters, updatePosters } = useContext(GlobalContext); 

    useEffect(() => {
        fetch('http://localhost:3001/api/posters/users/', {
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

    console.log(role);

    return (
        <div className="container" >
            <table className="table border-top mt-4">
                <tbody>
                    {
                        posters
                        .filter(poster => filterCity === 'All' ? true : poster.city === filterCity)
                        .filter(poster => filterProfession === '' ? true : poster.profession.toLowerCase().includes(filterProfession))
                        .map((poster, idx) => (
                            <tr key={poster.title + idx}>
                                <td>{idx + 1}</td>
                                <td>
                                    <img style={imageStyle} src={poster.img} alt="logo" />
                                </td>
                                <td>{poster.company}</td>
                                <td>{poster.profession}</td>
                                <td>{poster.title}</td>
                                <td>{poster.city}</td>
                                <td>{poster.salary} €/men.</td>
                                <td>
                                    {role === 'admin' && <Link className="btn btn-outline-primary me-2" to={`/paskyra`}>Blokuoti</Link>}
                                    {role === 'seller' && <Link className="btn btn-outline-primary me-2" to={`/paskyra/skelbimai/${poster.id}/koreguoti`}>Koreguoti</Link>}
                                    {role === 'seller' && <Link className="btn btn-outline-danger me-2" to={`/paskyra/skelbimai/${poster.id}/koreguoti`}>Istrinti</Link>} 
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}