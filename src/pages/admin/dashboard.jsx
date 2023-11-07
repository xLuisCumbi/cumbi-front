import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import StatsCard from '../../components/StatsCard';
import PageLoading from '../../components/PageLoading';
import ApiService from '../../services/ApiService';

export default function Dashboard() {
  const navigate = useNavigate();
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [stats, setStats] = useState({});
  const reqRef = useRef(false);

  useEffect(() => {
    if (reqRef.current) return;
    reqRef.current = true;

    ApiService.post('/stats').then((response) => {
      if (response.status === 'success') {
        setStats(response.stats);
        setLoadingStatus(false);
      } else {
        navigate(`/admin/error?message=${response.message}`);
      }
    }, (err) => {
      console.log('err', err.stack);

      navigate('/admin/error?message=Error Making Request Kinldy: Check Your Internet Connectivity Or reload page');
    });
  }, []);

  return (

    loadingStatus ? <PageLoading />
      : (
        <div>

          <PageTitle title="Dashboard" />

          <section className="section dashboard">
            <div className="col-12">

              <div className="row">
                <StatsCard
                  title="Etheruem Balance"
                  value={`${stats.eth_balance.value} ETH`}
                  updated={stats.eth_balance.updated}
                  icon="coin"
                />
                <StatsCard
                  title="TRON Balance"
                  value={`${stats.trx_balance.value} TRX`}
                  updated={stats.trx_balance.updated}
                  icon="coin"
                />
                <StatsCard
                  title="ETH USDT Balance"
                  value={`${stats.eth_usdt_balance.value} USDT`}
                  updated={stats.eth_usdt_balance.updated}
                  icon="coin"
                />
                <StatsCard
                  title="TRX USDT Balance"
                  value={`${stats.trx_usdt_balance.value} USDT`}
                  updated={stats.trx_usdt_balance.updated}
                  icon="coin"
                />
                <StatsCard
                  title="ETH USDC Balance"
                  value={`${stats.eth_usdc_balance.value} USDC`}
                  updated={stats.eth_usdc_balance.updated}
                  icon="coin"
                />
                <StatsCard
                  title="TRX USDC Balance"
                  value={`${stats.trx_usdc_balance.value} USDC`}
                  updated={stats.trx_usdc_balance.updated}
                  icon="coin"
                />

              </div>

            </div>
          </section>

        </div>
      )
  );
}
