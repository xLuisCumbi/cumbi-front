function PageTitle(props) {
  let route = window.location.pathname.split('/');
  route = route[route.length - 1];

  return (

    <div className="pagetitle">
      <h1>{props.title}</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/admin/dashboard">admin</a></li>
          <li className="breadcrumb-item active">{route}</li>
        </ol>
      </nav>
    </div>
  );
}

export default PageTitle;
