import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import defaultImg from '../../assets/default-bg.png';
import { NotAllowed } from "../../components/NotAllowed";

export function EditPoster() {
    const navigate = useNavigate();
    const {posterId} = useParams();
    const { role, cities } = useContext(GlobalContext);

    const [poster, setPoster] = useState(null);
    const [img, setImg] = useState('');
    const [imgErr, setImgErr] = useState('');
    const [company, setCompany] = useState('');
    const [companyErr, setCompanyErr] = useState('');
    const [profession, setProfession] = useState('');
    const [professionErr, setProfessionErr] = useState('');
    const [title, setTitle] = useState('');
    const [titleErr, setTitleErr] = useState('');
    const [city, setCity] = useState('');
    const [cityErr, setCityErr] = useState('');
    const [salary, setSalary] = useState(0);
    const [salaryErr, setSalaryErr] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/api/posters/' + posterId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setPoster(data.poster);
                    const poster = data.poster;
                    setImg(poster.img);
                    setCompany(poster.company);
                    setProfession(poster.profession);
                    setTitle(poster.title);
                    setCity(poster.city);
                    setSalary(poster.salary);
                }
            })
            .catch(console.error);
    }, []);

    if (role !== 'seller') {
        return <NotAllowed />;
    }

    function updateImg(e) {
        const formData = new FormData();
        formData.append('poster_img', e.target.files[0]);

        fetch('http://localhost:3001/api/upload/poster', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(data => setImg(`http://localhost:3001/${data.path}`))
            .catch(err => console.error(err));
    }

    function imgValidity() {
        if (img === '') {
            return 'Reikalinga nuotrauka.';
        }

        return '';
    }

    function companyValidity() {
        const maxSize = 40;

        if (company === '') {
            return 'Reikalingas pavadinimas.';
        }

        if (company.length > maxSize) {
            return `Per ilgas pavadinimas. Max leidziama ${maxSize} simboliai.`;
        }

        return '';
    }

    function professionValidity() {
        const maxSize = 50;

        if (profession === '') {
            return 'Reikalinga profesija.';
        }

        if (profession.length > maxSize) {
            return `Per ilgas zodis. Max leidziama ${maxSize} simboliai.`;
        }

        return '';
    }

    function titleValidity() {
        const maxSize = 60;

        if (title === '') {
            return 'Reikalingas pavadinimas.';
        }

        if (title.length > maxSize) {
            return `Per ilgas pavadinimas. Max leidziama ${maxSize} simboliai.`;
        }

        return '';
    }

    function cityValidity() {
        if (!cities.includes(city)) {
            return 'Reikia nurodyti miesta.';
        }

        return '';
    }

    function salaryValidity() {
        const min = 0;
        const max = 100_000;

        if (salary < min) {
            return `Atlyginimas negali buti mazesnis uz ${min}.`;
        }

        if (salary > max) {
            return `Atlyginimas negali buti didesnis uz ${max}.`;
        }

        return '';
    }

    function isValidForm() {
        const imgMsg = imgValidity();
        setImgErr(imgMsg);

        const companyMsg = companyValidity();
        setCompanyErr(companyMsg);

        const professionMsg = professionValidity();
        setProfessionErr(professionMsg);

        const titleMsg = titleValidity();
        setTitleErr(titleMsg);

        const cityMsg = cityValidity();
        setCityErr(cityMsg);

        const salaryMsg = salaryValidity();
        setSalaryErr(salaryMsg);

        return !imgMsg && !professionMsg && !companyMsg && !titleMsg && !cityMsg && !salaryMsg;
    }

    function submitHandler(e) {
        e.preventDefault();

        if (!isValidForm()) {
            return;
        }

        fetch('http://localhost:3001/api/posters/' + posterId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                img, company, profession, title, city, salary
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    navigate('/paskyra/skelbimai');
                }
            })
            .catch(console.error);
    }

    const defaultImgStyle = {
        height: 200,
        objectFit: 'cover',
        objectPosition: 'center',
        border: '1px solid #ccc',
    };
    const imgStyle = {
        height: 200,
        objectFit: 'contain',
        objectPosition: 'center',
        border: '1px solid #ccc',
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h3>Koreguoti skelbima</h3>
                </div>
                <form onSubmit={submitHandler} className="col-12 col-sm-8">
                    <div className="row mb-3">
                        <img src={img ? img : defaultImg} alt="company" className="col-12 p-0 mb-3"
                            style={img ? imgStyle : defaultImgStyle} />
                        <label className="col-12 col-md-4 form-label" htmlFor="image">Nuotrauka</label>
                        <div className="col-12 col-md-8">
                            <input onChange={updateImg} type="file"
                                className={`form-control ${imgErr ? 'is-invalid' : ''}`} id="image" />
                            <div className="invalid-feedback">{imgErr}</div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="title">Kompanija</label>
                        <div className="col-12 col-md-8">
                            <input onChange={e => setCompany(e.target.value)} value={company} type="text"
                                className={`form-control ${companyErr ? 'is-invalid' : ''}`} id="company" />
                            <div className="invalid-feedback">{companyErr}</div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="title">Profesija</label>
                        <div className="col-12 col-md-8">
                            <input onChange={e => setProfession(e.target.value)} value={profession} type="text"
                                className={`form-control ${professionErr ? 'is-invalid' : ''}`} id="profession" />
                            <div className="invalid-feedback">{professionErr}</div>
                            <small className="text-body-secondary">Pavyzdys: Programuotojas</small>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="title">Title</label>
                        <div className="col-12 col-md-8">
                            <input onChange={e => setTitle(e.target.value)} value={title} type="text"
                                className={`form-control ${titleErr ? 'is-invalid' : ''}`} id="title" />
                            <div className="invalid-feedback">{titleErr}</div>
                            <small className="text-body-secondary">Pavyzdys: Ieskomas jaunesnysis programuotojas</small>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="carType">Miestas</label>
                        <div className="col-12 col-md-8">
                            <select className={`form-select ${cityErr ? 'is-invalid' : ''}`}
                                onChange={e => setCity(e.target.value)} value={city} id="city">
                                <option value="None">- Issirinkti</option>
                                {cities.map(city =>
                                    <option key={city} value={city}>{city}</option>
                                )}
                            </select>
                            <div className="invalid-feedback">{cityErr}</div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="price">Atlyginimas</label>
                        <div className="col-12 col-md-8">
                            <div className="input-group">
                                <input onChange={e => setSalary(+e.target.value)} value={salary} type="number"
                                    className={`form-control ${salaryErr ? 'is-invalid' : ''}`} id="salary" min={0} max={100_000} step={1} />
                                <span className="input-group-text">EUR</span>
                                <div className="invalid-feedback">{salaryErr}</div>
                            </div>
                            <small className="text-body-secondary">Kaina nurodoma be centu</small>
                        </div>
                    </div>
                    <hr />
                    <button className="btn btn-primary py-2 me-2" type="submit">Pakeisti</button>
                    <Link className="btn btn-danger py-2" to="/paskyra/skelbimai" type="submit">Atsaukti</Link>
                </form>
            </div>
        </div>
    )
}