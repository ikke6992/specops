import SearchFilter from "../../../models/filter/SearchFilter";
import RecordStatus from "../../../models/record/RecordStatus";
import TaskStatus from "../../../models/task/TaskStatus";
import useWindowDimensions from "../../../utils/windowdimensions";
import FilterTabs from "../filter/FilterTabs";
import SearchBar from "../search/SearchBar";

// could add header to this.
type PropsType = {
  searchBar: React.ReactNode;
  content: React.ReactNode;
  navigation: React.ReactNode;
  search: (type: SearchFilter, querry: string) => void;
  filter: (status: "all" | TaskStatus | RecordStatus) => void;
  isHistory: boolean;
};
const Layout = ({
  searchBar,
  content,
  navigation,
  search,
  filter,
  isHistory,
}: PropsType) => {
  const { width } = useWindowDimensions();

  return (
    <main className="h-screen">
      {/* Header */}
      <section
        className="bg-slate-500 flex flex-row justify-center items-center"
        style={{ height: "10%" }}
      >
        {searchBar}
      </section>
      {/* Search & Filter */}
      <section
        className="bg-slate-600 flex flex-row justify-center items-center flex-wrap"
        style={{ height: width > 650 ? "15%" : "20%" }}
      >
        <article className="flex flex-row justify-center items-center mr-4">
          <SearchBar search={search} isHistory={isHistory} />
        </article>
        <article className="flex flex-row justify-center items-center">
          <FilterTabs filter={filter} isHistory={isHistory} />
        </article>
      </section>
      {/* Content */}
      <section
        className="p-8 bg-gray-400"
        style={{
          height: width > 650 ? "65%" : "60%",
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
