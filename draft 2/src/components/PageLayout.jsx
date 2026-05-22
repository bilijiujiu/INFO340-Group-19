function PageLayout(props) {
  return (
    <main className="container page-section">
      <div className="app-content">
        {props.children}
      </div>
    </main>
  );
}

export default PageLayout;
