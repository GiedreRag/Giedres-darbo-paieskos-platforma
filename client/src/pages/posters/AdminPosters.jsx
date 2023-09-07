import { PostersTable } from "../../components/PostersTable";

export function AdminPosters() {
    return (
        <div className="container" >
            <h1>Skelbimai</h1>

            <div className="col-12">
                <PostersTable />
            </div>
        </div>
    );
}