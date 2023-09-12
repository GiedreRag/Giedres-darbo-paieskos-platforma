import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { PostersTablePublic } from "../components/PostersTablePublic";

export function Home() {
    const { cities } = useContext(GlobalContext);
    const [selectedCity, setSelectedCity] = useState('All');
    const [profession, setProfession] = useState('');

    return (
        <div className="container" >
            <h3>Skelbimai</h3>
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
                <PostersTablePublic filterCity={selectedCity} filterProfession={profession.toLowerCase()} limit={6}/>
            </div>
        </div>
    );
}