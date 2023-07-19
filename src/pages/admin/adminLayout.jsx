import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

function AdminLayout() {

    return (  
        
       <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <Outlet />
            </main>
            <Footer />
       </>

    );
}

export default AdminLayout;