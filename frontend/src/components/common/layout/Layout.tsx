// could add header to this.
type PropsType = {
  searchBar: React.ReactNode;
  content: React.ReactNode;
  navigation: React.ReactNode;
};
const Layout = ({ searchBar, content, navigation }: PropsType) => {
  return (
    <main className="h-screen">
      {/* Searchbar */}
      <section
        className="bg-slate-500 flex flex-row justify-center items-center"
        style={{ height: "20%" }}
      >
        {searchBar}
      </section>
      {/* Content */}
      <section
        className="p-8 bg-gray-400"
        style={{
          height: "70%",
        }}
      >
        {content}
      </section>
      {/* Navigation */}
      <section
        className="bg-zinc-700 grid grid-cols-3 grid-rows-1 p-2"
        style={{ height: "10%" }}
      >
        {navigation}
      </section>
    </main>
  );
};

export default Layout;
