import { useEffect, useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Alert from '../../components/Alert';
import ApiService from '../../services/ApiService';

function CreatePayment() {
  // Get the user data from local storage
  const userLocal = JSON.parse(localStorage.getItem('user'));

  const [user, setUser] = useState({
    payment_fee: 0,
  });
  const [business, setBusiness] = useState({
    payment_fee: 0,
  });
  const [setting, setSetting] = useState({
    trm: 0,
    perc_buy_house: 0,
    perc_cumbi: 0,
  });
  const [paymentFormData, setPaymentFormData] = useState({
    title: 'Título',
    type: 'app-payment',
    amount: 0,
    network: 'TRON',
    coin: 'USDT',
    description: 'Descripción corta de la cuenta de cobro',
    user: userLocal.id, // use the user's ID from local storage
    trm: 0,
    trm_house: 0,
    amount_fiat: 0,
    coin_fiat: 'COP',
    payment_fee: 0,
    type_payment_fee: 'cumbi',
  });
  const [paymentCreated, setPaymentCreated] = useState({
    value: false,
    link: '',
  });
  const [userCommission, typePercUser] = useMemo(() => getCommissionUser(), [user, business, setting]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    for (const i in paymentFormData) {
      if (paymentFormData[i] === '') {
        Alert('failed', `input ${i} is required`, 3);
        return;
      }
    }
    if (paymentFormData.amount <= 0 || Number.isNaN(paymentFormData.amount)) {
      Alert('failed', 'El monto debe ser un número valido', 2);
      return;
    }

    Alert('success', 'loading', 30);
    ApiService.postDeposit('/create-app', { ...paymentFormData }).then(
      (response) => {
        if (response.status === 'success') {
          setPaymentCreated({
            value: true,
            link: response.invoiceObj.invoice_url,
          });
          Alert('success', 'Invoice created', 3);
        }
      },
      (err) => {
        console.error('err', err);
        console.error('err.stack', err.stack);
        Alert('failed', 'Error in creating invoice', 3);
      },
    );
  };

  // Función para actualizar paymentFormData.amount y calcular amountBankFiat
  const handleAmountChange = (e) => {
    const amountToConvert = parseFloat(e.target.value); // monto en USD

    // Calcular el valor de amountBankFiat
    const amountConvertedToFiat = paymentFormData.trm_house * amountToConvert; // Monto en fiat convertido

    // Sacamos la comisión al monto a convertir
    const amountWithCommission = amountConvertedToFiat * value2Perc(userCommission); // monto a pagar en el banco en fiat

    // comision a cobrar:
    const commissionCumbi = amountConvertedToFiat - amountWithCommission;

    // Calcular el IVA del 19% sobre la comisión Cumbi
    const iva = 0.19 * commissionCumbi;

    // Calcular el GMF (4x1000)
    const gmf = 0.004 * (amountConvertedToFiat - commissionCumbi - iva);

    // Calcular el monto que va a recibir el usuario en el banco después de deducir IVA, GMF y comisión
    const amountToReceiveInBank = amountConvertedToFiat - (iva + gmf + commissionCumbi);

    setPaymentFormData({
      ...paymentFormData,
      amount: parseFloat(amountToConvert.toFixed(2)),
      amount_fiat: parseFloat(amountConvertedToFiat.toFixed(2)),
      payment_fee: parseFloat(userCommission.toFixed(2)),
      type_payment_fee: typePercUser,
      commission_cumbi: parseFloat(commissionCumbi.toFixed(2)),
      iva: parseFloat(iva.toFixed(2)),
      gmf: parseFloat(gmf.toFixed(2)),
      amount_to_receive_in_bank: parseFloat(amountToReceiveInBank.toFixed(2)),
    });
  };

  const handleLinkCopy = () => {
    navigator.clipboard.writeText(paymentCreated.link);
    Alert('success', 'Link copied successfully', 2);
  };

  function getSettingCumbi() {
    ApiService.getSetting('').then(
      (response) => {
        if (response.status === 'success') {
          setSetting(response.setting);
          setPaymentFormData({
            ...paymentFormData,
            trm: response.setting.trm,
            trm_house: response.setting.trm * value2Perc(response.setting.perc_buy_house),
          });
        }
      },
      (err) => {
        console.error('err', err);
        console.error('err.stack', err.stack);
      },
    );
  }

  function getBusiness(id) {
    ApiService.getBusiness(`/${id}`).then(
      (response) => {
        if (response.status === 'success') {
          setBusiness(response.business);
        }
      },
      (err) => {
        console.error('err', err);
        console.error('err.stack', err.stack);
      },
    );
  }

  function getCurrentUser() {
    ApiService.get(userLocal.id).then(
      (response) => {
        if (response.status === 'success') {
          setUser(response.user);
          if (response.user.role !== 'person' && response.user.business) getBusiness(response.user.business);
        }
      },
      (err) => {
        console.error('err', err);
        console.error('err.stack', err.stack);
      },
    );
  }

  /**
     *
     * @returns This function gets the percentage fee that the user/business has
     */
  function getCommissionUser() {
    let payment_fee = 0; let
      type_payment_fee = '';

    if (user && !isNaN(user.payment_fee) && user.payment_fee > 0) {
      payment_fee = user.payment_fee;
      type_payment_fee = 'person';
    } else if (business && !isNaN(business.payment_fee) && business.payment_fee > 0) {
      payment_fee = business.payment_fee;
      type_payment_fee = 'business';
    } else {
      payment_fee = setting.perc_cumbi;
      type_payment_fee = 'cumbi';
    }
    return [payment_fee, type_payment_fee];
  }

  function value2Perc(value) {
    return (100 - value) / 100;
  }

  useEffect(() => {
    getSettingCumbi();
    getCurrentUser();
  }, []);

  return (
    <div>
      <PageTitle title="Create Payment / Invoice" />

      {!paymentCreated.value ? (
        <div className="col-12 mb-3">
          <form
            className="row g-3 needs-validation"
            noValidate
            onSubmit={handleFormSubmit}
          >
            <div className="row">
              {/* Columna izquierda con los inputs */}
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-12 mt-3">
                    <label className="form-label">Monto en USD</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder={paymentFormData.amount}
                      value={paymentFormData.amount}
                      onChange={handleAmountChange}
                      required
                      min={0}
                    />
                  </div>
                  <div className="col-md-12 mt-3">
                    <label className="form-label">Título</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={paymentFormData.title}
                      onChange={(e) => setPaymentFormData({
                        ...paymentFormData,
                        title: e.target.value,
                      })}
                      required
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <label className="form-label">Crypto Network</label>
                    <select
                      type="text"
                      className="form-control"
                      value={paymentFormData.network}
                      onChange={(e) => setPaymentFormData({
                        ...paymentFormData,
                        network: e.target.value,
                      })}
                      required
                    >
                      <option>TRON</option>
                      {/* <option>ETHEREUM</option> */}
                    </select>
                  </div>
                  <div className="col-md-6 mt-3">
                    <label className="form-label">Crypto Coin</label>
                    <select
                      type="text"
                      className="form-control"
                      value={paymentFormData.coin}
                      onChange={(e) => setPaymentFormData({
                        ...paymentFormData,
                        coin: e.target.value,
                      })}
                      required
                    >
                      <option>USDT</option>
                      <option>USDC</option>
                    </select>
                  </div>
                  <div className="col-md-12 mt-3">
                    <label className="form-label">Description</label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder={paymentFormData.description}
                      onChange={(e) => setPaymentFormData({
                        ...paymentFormData,
                        description: e.target.value,
                      })}
                      required
                    />
                  </div>
                </div>
              </div>
              {/* Columna derecha con la info box */}
              <div className="col-md-4 mt-3">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th colSpan="2">Este es el detalle de tu transacción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="form-label">TRM:</th>
                      <td>
                        $
                        {paymentFormData.trm_house.toLocaleString()}
                        {' '}
                        COP
                      </td>
                    </tr>
                    <tr>
                      <th className="form-label">Monto en Fiat a Convertir:</th>
                      <td>
                        $
                        {paymentFormData.amount_fiat?.toLocaleString()}
                        {' '}
                        COP
                      </td>
                    </tr>
                    <tr>
                      <th className="form-label">Payment Fee del Usuario:</th>
                      <td>
                        {paymentFormData.payment_fee}
                        %
                      </td>
                    </tr>
                    <tr>
                      <th className="form-label">Nuestra Comisión:</th>
                      <td>
                        $
                        {paymentFormData.commission_cumbi?.toLocaleString()}
                        {' '}
                        COP
                      </td>
                    </tr>
                    <tr>
                      <th className="form-label">IVA:</th>
                      <td>
                        $
                        {paymentFormData.iva?.toLocaleString()}
                        {' '}
                        COP
                      </td>
                    </tr>
                    <tr>
                      <th className="form-label">GMF:</th>
                      <td>
                        $
                        {paymentFormData.gmf?.toLocaleString()}
                        {' '}
                        COP
                      </td>
                    </tr>
                    <tr>
                      <th className="form-label">Total a Pagar en el Banco:</th>
                      <td>
                        $
                        {paymentFormData.amount_to_receive_in_bank?.toLocaleString()}
                        {' '}
                        COP
                      </td>
                    </tr>
                  </tbody>
                </table>

              </div>
              <div className="col-md-12 mt-4 text-center">
                {user.kyc && user.kyc === 'accepted' && (
                <button className="btn btn-primary text-white">
                  Create Invoice
                </button>
                )}
                {(!user.kyc || user.kyc !== 'accepted')
                                        && (
                                        <label>
                                          Estamos verificando su identidad,
                                          {' '}
                                          <br />
                                          Tu seguridad es nuestra prioridad.
                                          {' '}
                                          <br />
                                          Verificar tu identidad nos ayuda a mantener la comunidad y el ecosistema seguros.
                                          <br />
                                          Pronto podrás Cumbear!
                                        </label>
                                        )}
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="col-md-8 m-auto mb-3 mt-5 text-center ">
          <i
            style={{ fontSize: '70px' }}
            className="bi bi-check-circle text-success"
          />

          <p>Link de pago creado correctamente</p>

          <div
            onClick={handleLinkCopy}
            className="bg-success text-white p-3"
          >
            {paymentCreated.link}
          </div>

          <small style={{ fontSize: '80%' }} className="small">
            <p> Clic en el link para copiar</p>
          </small>
        </div>
      )}
    </div>
  );
}

export default CreatePayment;
