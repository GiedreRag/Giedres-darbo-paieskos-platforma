import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

export function Home() {
    const { cities } = useContext(GlobalContext);
    const { posters, updatePosters } = useContext(GlobalContext); 
    const [selectedCity, setSelectedCity] = useState('All');
    const [profession, setProfession] = useState('');


    useEffect(() => {
        fetch('http://localhost:3001/api/posters/home/', {
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

    const filteredPosters = posters.filter(poster => {
        const cityMatches = selectedCity === 'All' || poster.city === selectedCity;
        const professionMatches = profession === '' || poster.profession.toLowerCase().includes(profession.toLowerCase());
        return cityMatches && professionMatches;
    });

    return (
        <div className="container" >
            <div className="col-12">
                <div className="row">
                    <div className="col-6 col-sm-4 col-md-3">
                        <select className="form-select" 
                            onChange={e => setSelectedCity(e.target.value)}>
                            <option value="All">Visi</option>
                            {cities.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-6 col-sm-4 col-md-3">
                        <input type="text" className="form-control" value={profession} 
                            onChange={e => setProfession(e.target.value)} />
                    </div>
                </div>
            </div>
            <table className="table border-top mt-4">
                <tbody>
                    {
                        filteredPosters
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
                                    <Link className="btn btn-outline-primary me-2" to={`/paskyra`}>Daugiau</Link>
                                    <Link className="btn btn-outline-primary me-2" to={`/paskyra`}>Susisiekti</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}