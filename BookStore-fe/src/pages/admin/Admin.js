import Card from "../../components/ui/Card";
import classes from "./Admin.module.css";
import AdminLeftNav from "./AdminLeftNav";

const Admin = () => {
    return(
        <section className = {classes.admin}>
            <Card>
                <div className = {classes.position}>
                    <AdminLeftNav/>
                    <div className = {classes.right}>
                        <p> Admin page</p>
                    </div>
                </div>
            </Card>
        </section>
    );
}

export default Admin;