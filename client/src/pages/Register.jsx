export function Register() {
    return (
        <div className="container">
            <div className="row">
                <form className="col-10 col-sm-8 col-md-6 col-lg-4 m-auto mt-4">
                    <div className="form-floating mb-4">
                        <input type="text" className="form-control" id="fullname"/>
                        <label htmlFor="fullname">Pilnas vardas</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input type="email" className="form-control" id="email"/>
                        <label htmlFor="email">Elektroninis pastas</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input type="text" className="form-control" id="password" />
                        <label htmlFor="password">Slaptazodis</label>
                    </div>
                    <div className="form-floating mb-5">
                        <input type="repeatpassword" className="form-control" id="repeatpassword" />
                        <label htmlFor="repeatpassword">Pakartot slaptazodi</label>
                    </div>
                    <button className="btn btn-primary w-100 py-2 mb-4" type="submit">Registruotis</button>
                </form>
            </div>
        </div>
    );
}