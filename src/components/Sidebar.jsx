import { useLocation, useNavigate } from 'react-router-dom';
import UserService from "../services/UserService";
import { useEffect, useState } from 'react';

function Sidebar() {

    const navigate = useNavigate();
    const location  = useLocation();

    const [route, setRoute] = useState();

    useEffect(()=> {

        let route = window.location.pathname.split('/');
        route = route[route.length - 1];
        setRoute(route);

    }, [location ])

    const  handleLogout = () => {
        if(confirm('Are you sure you want to log out ? Click OK to confirm')){
            UserService.logout();
            navigate('/');
        }
    }
    
    return ( 

        <aside id="sidebar" className="sidebar">
      
          <ul className="sidebar-nav" id="sidebar-nav">
      
            <li className="nav-item">
              <a className={route == '/' || route == 'dashboard' ? 'nav-link' : 'nav-link collapsed'} onClick={()=> navigate('/admin/dashboard')}>
                <i className="bi bi-grid"></i>
                <span>Dashboard</span>
              </a>
            </li>


            <li className="nav-item">
              <a className={route == 'create-payment' ? 'nav-link' : 'nav-link collapsed'} onClick={()=> navigate('/admin/create-payment')}>
                <i className="bi bi-receipt"></i>
                <span>Create Payment</span>
              </a>
            </li>

            <li className="nav-item">
              <a className={route == 'create-payment' ? 'nav-link' : 'nav-link collapsed'} onClick={()=> navigate('/admin/create-user')}>
                <i className="bi bi-person"></i>
                <span>Create User</span>
              </a>
            </li>

            <li className="nav-item">
              <a className={route == 'payment-history' ? 'nav-link' : 'nav-link collapsed'} onClick={()=> navigate('/admin/payment-history')}>
                <i className="bi bi-cash"></i>
                <span>Payment History</span>
              </a>
            </li>

            <li className="nav-item">
              <a className={route == 'create-token' ? 'nav-link' : 'nav-link collapsed'} onClick={()=> navigate('/admin/create-token')}>
                <i className="bi bi-key"></i>
                <span>Create API Tokens</span>
              </a>
            </li>
            
            <li className="nav-item">
              <a className={route == 'tokens' ? 'nav-link' : 'nav-link collapsed'} onClick={()=> navigate('/admin/tokens')}>
                <i className="bi bi-key"></i>
                <span>API Tokens</span>
              </a>
            </li>
            
      

            <li className="nav-item">
              <a className={route == 'settings' ? 'nav-link' : 'nav-link collapsed'} onClick={()=> navigate('/admin/settings')}>
                <i className="bi bi-gear"></i>
                <span>Settings</span>
              </a>
            </li>
      
           
            <li className="nav-item">
              <a className='nav-link collapsed' onClick={()=> handleLogout()}>
                <i className="bi bi-box-arrow-left"></i>
                <span>Logout</span>
              </a>
            </li>
      
          </ul>
      
        </aside>
     );
}

export default Sidebar;