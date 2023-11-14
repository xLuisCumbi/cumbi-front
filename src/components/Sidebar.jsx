import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserService from '../services/UserService';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [route, setRoute] = useState();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    let route = window.location.pathname.split('/');
    route = route[route.length - 1];
    setRoute(route);

    // Get the current user role from UserService
    const role = UserService.getCurrentUserRole();
    setUserRole(role);
  }, [location]);

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out ? Click OK to confirm')) {
      UserService.logout();
      navigate('/');
    }
  };

  return (

    <aside id="sidebar" className="sidebar">

      <ul className="sidebar-nav" id="sidebar-nav">

        <li className="nav-item">
          <a className={route == '/' || route == 'dashboard' ? 'nav-link' : 'nav-link collapsed'} onClick={() => navigate('/admin/dashboard')}>
            <i className="bi bi-grid" />
            <span>Inicio</span>
          </a>
        </li>

        <li className="nav-item">
          <a className={route == 'create-payment' ? 'nav-link' : 'nav-link collapsed'} onClick={() => navigate('/admin/create-payment')}>
            <i className="bi bi-receipt" />
            <span>Hacer una Transacción</span>
          </a>
        </li>

        <li className="nav-item">
          <a className={route == 'payment-history' ? 'nav-link' : 'nav-link collapsed'} onClick={() => navigate('/admin/payment-history')}>
            <i className="bi bi-cash" />
            <span>Historial de Transacciones</span>
          </a>
        </li>

        {(userRole === 'admin' || userRole === 'superadmin' || userRole === 'person') && (
          <li className="nav-item">
            <a
              className={route == 'create-bank-account' ? 'nav-link' : 'nav-link collapsed'}
              onClick={() => navigate('/admin/create-bank-account')}
            >
              <i className="bi bi-bank" />
              <span>Mis Cuentas Bancarias</span>
            </a>
          </li>
        )}

        <li className="nav-item">
          <a
            className={route == 'settings' ? 'nav-link' : 'nav-link collapsed'}
            onClick={() => navigate('/admin/profile')}
          >
            <i className="bi bi-gear" />
            <span>Mi Perfil</span>
          </a>
        </li>
        {(userRole === 'admin' || userRole === 'superadmin') && (
          <>
            <li className="nav-item">
              <a
                className={route == 'create-token' ? 'nav-link' : 'nav-link collapsed'}
                onClick={() => navigate('/admin/create-token')}
              >
                <i className="bi bi-key" />
                <span>API Tokens</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={route == 'create-user' ? 'nav-link' : 'nav-link collapsed'}
                onClick={() => navigate('/admin/create-user')}
              >
                <i className="bi bi-person" />
                <span>Users</span>
              </a>
            </li>
          </>
        )}

        {userRole === 'superadmin' && (
          <>
            {/* <li className="nav-item">
              <a className={route == 'list_user' ? 'nav-link' : 'nav-link collapsed'} onClick={() => navigate('/admin/list-user')}>
                <i className="bi bi-people"></i>
                <span>List Users</span>
              </a>
            </li> */}
            <li className="nav-item">
              <a className={route == 'setting_cumbi' ? 'nav-link' : 'nav-link collapsed'} onClick={() => navigate('/admin/setting-cumbi')}>
                <i className="bi bi-gear" />
                <span>Configuración de Cumbi</span>
              </a>
            </li>
            <li className="nav-item">
              <a className={route == 'create-business' ? 'nav-link' : 'nav-link collapsed'} onClick={() => navigate('/admin/create-business')}>
                <i className="bi bi-building-fill-gear" />
                <span>Crear Negocio</span>
              </a>
            </li>
            {/*<li className="nav-item">
              <a className={route == 'mnemonic' ? 'nav-link' : 'nav-link collapsed'} onClick={() => navigate('/admin/mnemonic')}>
                <i className="bi bi-puzzle" />
                <span>Mnemonic</span>
              </a>
            </li>*/}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="bi bi-database" />
                <span>Tablas Dinámicas</span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className={route == 'create-bank' ? 'nav-link' : 'nav-link collapsed'}
                    onClick={() => navigate('/admin/create-bank')}
                  >
                    Bancos
                  </a>
                </li>
                <li>
                  <a
                    className={route == 'create-coin' ? 'nav-link' : 'nav-link collapsed'}
                    onClick={() => navigate('/admin/create-coin')}
                  >
                    Tokens
                  </a>
                </li>
                <li>
                  <a
                    className={route == 'create-country' ? 'nav-link' : 'nav-link collapsed'}
                    onClick={() => navigate('/admin/create-country')}
                  >
                    Países
                  </a>
                </li>
              </ul>
            </li>
          </>
        )}

        <li className="nav-item">
          <a className="nav-link collapsed" onClick={() => handleLogout()}>
            <i className="bi bi-box-arrow-left" />
            <span>Cerrar Sesión</span>
          </a>
        </li>

      </ul>

    </aside>
  );
}

export default Sidebar;
