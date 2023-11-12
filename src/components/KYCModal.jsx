import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación

const KYCModal = ({ show, onClose, isDocumentMissing }) => {
    const navigate = useNavigate(); // Inicializa navigate

    if (!show) return null;

    const message = isDocumentMissing
        ? "Debes completar la validación de tu perfil en la sección de perfil subiendo tu documento de identidad."
        : "Tu estado de KYC está pendiente o denegado. No puedes proceder con la creación de la factura hasta que tu KYC sea aceptado.";

    // Función para navegar a la página de perfil
    const goToProfile = () => {
        navigate('/admin/profile');
        onClose(); // Cierra la modal después de la navegación
    };

    return (
        <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Estado de Validación</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={goToProfile}>Ir al Perfil</button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KYCModal;
