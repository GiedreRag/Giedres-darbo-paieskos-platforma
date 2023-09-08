import { useContext, useEffect, useState } from "react";
import { formatDate } from "../lib/formatDate";
import { GlobalContext } from "../context/GlobalContext";

export function UsersTable() {
    const { email } = useContext(GlobalContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/users', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setUsers(data.list);
                }
            })
            .catch(console.error);
    }, []);

    function handleIsBlocked(email, status) {
        fetch('http://localhost:3001/api/users/' + email, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ newStatus: status }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setUsers(pre => pre.map(user =>
                        user.email === email ? { ...user, is_Blocked: status } : user
                    ));
                }
            })
            .catch(console.error);

    }

    const Block = ({ userEmail }) => (<button onClick={() => handleIsBlocked(userEmail, true)} className="btn btn-danger" disabled={email === userEmail}>Blokuoti</button>);
    const Unblock = ({ userEmail }) => (<button onClick={() => handleIsBlocked(userEmail, false)} className="btn btn-danger">Atblokuoti</button>);

    return (
        <div className="container" >
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Vardas ir pavarde</th>
                        <th scope="col">Elektroninis pastas</th>
                        <th scope="col">Role</th>
                        <th scope="col">Prisiregistravo</th>
                        <th scope="col">Statusas</th>
                        <th scope="col">Veiksmai</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, idx) => (
                            <tr key={user.email}>
                                <td>{idx + 1}</td>
                                <td>{user.fullname}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{formatDate(user.createdAt)}</td>
                                <td>{user.is_Blocked ? <span className="badge text-bg-danger rounded-pill">Blocked</span> : <span className="badge text-bg-success rounded-pill">Active</span>}</td>
                                <td>
                                    {user.is_Blocked ? <Unblock userEmail={user.email} /> : <Block userEmail={user.email}/>}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}