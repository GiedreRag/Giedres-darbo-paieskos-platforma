import { PostersTable } from "../../components/PostersTable";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export function AdminPosters() {
    const { cities, role } = useContext(GlobalContext);
    const [selectedCity, setSelectedCity] = useState('All');
    const [profession, setProfession] = useState('');

    return (
        <div className="container" >
            <h1>Skelbimai</h1>
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
            <div className="col-12">
                <PostersTable role={role} filterCity={selectedCity} filterProfession={profession.toLowerCase()}/>
            </div>
        </div>
    );
}