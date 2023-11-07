import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

let oldAlertId;
export default function Alert(status, message, timeout) {
  function AlertWrapper() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setVisible(false);
      }, timeout * 1000);
    }, [timeout]);

    const alertStyle = {
      position: 'fixed',
      top: '10px',
      right: '10px',
      zIndex: 9999,
      padding: '10px',
      borderRadius: '4px',
      boxShadow: status == 'failed' ? '0 0 10px rgba(255, 0, 0, 0.5)' : '0 0 10px rgba(0, 255, 0, 0.5)',
      animationTimingFunction: 'ease-in',
      transition: 'opacity 2s',
    };

    return (
      visible
                && (
                <div style={alertStyle} aria-live="assertive" className={`col-10 col-sm-6 col-lg-4 alert text-white ${status}`}>
                  {message === 'loading' ? (
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    message
                  )}
                </div>
                )

    );
  }

  const alertContainer = document.createElement('div');
  const id = Math.random();
  alertContainer.id = id;
  document.body.appendChild(alertContainer);

  ReactDOM.createRoot(document.getElementById(id)).render(
    <AlertWrapper />,
  );

  if (oldAlertId) {
    document.body.removeChild(document.getElementById(oldAlertId));
  }
  oldAlertId = id;
}
