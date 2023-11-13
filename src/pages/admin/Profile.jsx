import React, { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Alert from '../../components/Alert';
import ApiService from '../../services/ApiService';
import FileDropzone from '../../components/FileDropzone';
import { updateLocalUser } from '../../helpers/authHeader';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [documentFile, setDocumentFile] = useState(null);
  const [settingsFormData, setSettingsFormData] = useState({
    username: user.username || '',
    email: user.email || '',
    phone: user.phone || '',
    password: '',
  });

  const handleDropFile = (acceptedFiles) => {
    setDocumentFile(acceptedFiles[0]);
  };

  let kycDisclaimer;
  if (user.kyc === 'denied') {
    kycDisclaimer = (
      <div className="alert alert-danger mt-3">
        Tu proceso de KYC ha sido denegado. Si tienes dudas, por favor comunícate a través de nuestro <a href="https://wa.me/573044433331">WhatsApp</a>.
      </div>
    );
  } else if (user.kyc === 'pending') {
    kycDisclaimer = (
      <div className="alert alert-info mt-3">
        Estamos validando tu información. El proceso de KYC puede tardar algunos días. Agradecemos tu paciencia.
      </div>
    );
  } else if (user.kyc === 'accepted') {
    kycDisclaimer = (
      <div className="alert alert-success mt-3">
        Tu proceso de KYC ha sido validado exitosamente.
      </div>
    );
  } else {
    kycDisclaimer = (
      <div className="alert alert-info mt-3">
        <strong>Proceso de Verificación de Identidad (KYC):</strong>
        <p>Es importante completar este proceso para la activación total de tu cuenta. Sube tu documento de identidad en formato PDF (máximo 5 MB).</p>
      </div>
    );
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
              (!user.document || user.kyc === 'pending' || user.kyc === 'initial') ? (
                <div className="col-md-6 mt-3">
                  <label className="form-label">Sube tu documento de identidad</label>
                  <FileDropzone onDrop={handleDropFile} />
                  <small className="text-muted">
                    Solo se permiten archivos PDF de hasta 5 MB.
                  </small>
                  {kycDisclaimer}
                </div>
              ) : (
                <div className="col-md-6 mt-3">
                  {
                    (!user.document || user.kyc === 'initial') && (
                      <div className="col-md-6 mt-3">
                        <label className="form-label">Sube tu documento de identidad</label>
                        <FileDropzone onDrop={handleDropFile} />
                        <small className="text-muted">
                          Solo se permiten archivos PDF de hasta 5 MB.
                        </small>
                      </div>
                    )
                  }
                  {kycDisclaimer}
                </div>
              )
            }
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
