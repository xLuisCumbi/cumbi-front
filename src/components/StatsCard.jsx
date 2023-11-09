function StatsCard(props) {
  return (

    <div className="col-xxl-4 col-md-6">
      <div className="card info-card sales-card">

        <div className="card-body">
          <h5 className="card-title">
            {' '}
            {props.title}
            {' '}
            |
            {' '}
            <span>
              Updated:
              { new Date(props.updated).toLocaleTimeString() }
            </span>
            {' '}
          </h5>

          <div className="d-flex align-items-center">
            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
              <i className={`bi bi-${props.icon}`} />
            </div>
            <div className="ps-3">
              <h6>{props.value}</h6>
            </div>
          </div>
        </div>

      </div>
    </div>

  );
}

export default StatsCard;
