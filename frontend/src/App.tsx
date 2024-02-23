const App = () => {
  return (
    <>
      <Layout nav={<h1>Test</h1>} />
    </>
  );
};

const Layout = (props: { nav: React.ReactNode }) => {
  return (
    <>
      <nav>{props.nav}</nav>
    </>
  );
};

export default App;
