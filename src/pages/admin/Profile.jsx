import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import Alert from '../../components/Alert';
import ApiService from '../../services/ApiService';
import FileDropzone from '../../components/FileDropzone';
import { updateLocalUser } from '../../helpers/authHeader';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [documentFile, setDocumentFile] = useState(null);
  const [reloadComponent, setReloadComponent] = useState(false);

  const [settingsFormData, setSettingsFormData] = useState({
    username: user.username || '',
    email: user.email || '',
    phone: user.phone || '',
    password: '',
  });

  useEffect(() => {
  }, [reloadComponent]); // Dependencia del efecto: se ejecutará cada vez que cambie el estado 'reloadComponent'

  const handleDropFile = (acceptedFiles) => {
    setDocumentFile(acceptedFiles[0]);
  };

  let kycDisclaimer;
  let showUploadDocumentOption = false;

  // Determinar el mensaje de KYC y si mostrar la opción de subir documento
  if (user.kyc === 'denied') {
    kycDisclaimer = (
      <div className="alert alert-danger mt-3">
        <h5>Estado del KYC: Denegado</h5>
        <p>Tu proceso de Verificación de Conocimiento del Cliente (KYC) ha sido denegado. Si necesitas más información o asistencia, por favor, comunícate con nosotros a través de <a href="https://wa.me/573044433331" target="_blank" rel="noopener noreferrer">WhatsApp</a>.</p>
      </div>
    );
  } else if (user.kyc === 'pending' || (user.kyc === 'initial' && user.document)) {
    kycDisclaimer = (
      <div className="alert alert-info mt-3">
        <h5>Estado del KYC: En Proceso</h5>
        <p>Estamos actualmente en el proceso de verificar tu información de KYC. Te notificaremos por email una vez que tu estado KYC haya sido actualizado. Este proceso puede tomar algunos días. Agradecemos tu paciencia y comprensión.</p>
      </div>
    );
    showUploadDocumentOption = false;
  } else if (user.kyc === 'accepted') {
    kycDisclaimer = (
      <div className="alert alert-success mt-3">
        <h5>Estado del KYC: Aceptado</h5>
        <p>¡Felicidades! Tu proceso de KYC ha sido completado y validado exitosamente. Ahora tienes acceso completo a todas las funcionalidades de nuestra plataforma.</p>
      </div>
    );
  } else {
    kycDisclaimer = (
      <div className="alert alert-info mt-3">
        <h5>Estado del KYC: Pendiente</h5>
        <p>Para activar completamente tu cuenta y acceder a todas las funciones, es importante completar el proceso de KYC. Por favor, sube tu documento de identidad en formato PDF (máximo 5 MB).</p>
      </div>
    );
    showUploadDocumentOption = true;
  }


  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (settingsFormData.username !== user.username) {
      formData.append('username', settingsFormData.username);
    }
    if (settingsFormData.password !== '') {
      formData.append('password', settingsFormData.password);
    }
    if (documentFile) {
      formData.append('document', documentFile);
    }
    if (settingsFormData.phone !== user.phone) {
      formData.append('phone', settingsFormData.phone);
    }

    Alert('success', 'loading', 30);
    ApiService.postUpdateProfile(user, formData).then(
      (response) => {
        if (response.status === 'success') {
          // ToDo: actualizar el form con los datos nuevos del usuario sin tener que cerrar sesión
          updateLocalUser(response.user);
          Alert('success', 'Perfil actualizado correctamente', 3);
          setReloadComponent(!reloadComponent); // Cambiar el estado para forzar la recarga del componente
        }
      },
      (err) => {
        Alert('failed', 'Error updating profile ' + err, 3);
      },
    );
  };

  return (
    <div>
      <PageTitle title="Mi Perfil" />

      <div className="col-12 mb-3">
        <form
          className="row g-3 needs-validation"
          noValidate
          onSubmit={handleFormSubmit}
        >
          <div className="row">
            <div className="col-md-6 mt-3">
              <label className="form-label">Nombre Completo</label>
              <input
                type="text"
                className="form-control"
                value={settingsFormData.username}
                onChange={(e) => setSettingsFormData({
                  ...settingsFormData,
                  username: e.target.value,
                })}
              />
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={settingsFormData.email}
                readOnly
              />
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={settingsFormData.password}
                onChange={(e) => setSettingsFormData({
                  ...settingsFormData,
                  password: e.target.value,
                })}
                autoComplete="new-password"
                required
              />
            </div>
            <div className="col-md-6 mt-3">
              <label className="form-label">Teléfono</label>
              <input
                type="tel"
                className="form-control"
                value={settingsFormData.phone}
                onChange={(e) => setSettingsFormData({
                  ...settingsFormData,
                  phone: e.target.value,
                })}
              />
            </div>
            {
              showUploadDocumentOption ? (
                <div className="col-md-6 mt-3">
                  <label className="form-label">Sube tu documento de identidad</label>
                  <FileDropzone onDrop={handleDropFile} />
                  <small className="text-muted">
                    Solo se permiten archivos PDF de hasta 5 MB.
                  </small>
                </div>
              ) : null
            }
            {kycDisclaimer}
          </div>
          <div className="col-md-12 mt-4 text-center">
            <button className="btn btn-primary text-white">
              Actualizar Perfil
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Profile;
