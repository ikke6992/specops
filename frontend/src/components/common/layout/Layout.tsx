import SearchFilter from "../../../models/filter/SearchFilter";
import RecordStatus from "../../../models/record/RecordStatus";
import TaskStatus from "../../../models/task/TaskStatus";
import useWindowDimensions from "../../../utils/windowdimensions";
import TaskManagerButtons from "../../manage-tasks/TaskManagerButtons";
import FilterTabs from "../filter/FilterTabs";
import SearchBar from "../search/SearchBar";

// could add header to this.
type PropsType = {
  searchBar: React.ReactNode;
  content: React.ReactNode;
  navigation: React.ReactNode;
  search: (type: SearchFilter, query: string) => void;
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
    <main className="h-screen flex flex-col">
      {/* Header */}
      <section
        className="shrink-0 bg-orange-500/65 flex flex-row justify-center items-center min-w-[90px]"
        style={{ height: "10%" }}
      >
        {searchBar}
      </section>
      {/* Search & Filter */}
      <section
        className="shrink-0 bg-black/70 flex flex-row justify-center flex-wrap content-end h-auto gap-2 pt-2"
      >
        <article className="flex flex-row justify-center items-center mr-4">
          <SearchBar search={search} isHistory={isHistory} />
        </article>
        <article className="flex flex-row justify-center items-center">
          <FilterTabs filter={filter} isHistory={isHistory} />
        </article>
        <article className="flex flex-row justify-center items-center ml-4">
          <TaskManagerButtons/>
        </article>
        <article>
          
        </article>
      </section>
      {/* Content */}
      <section className="shrink-0 p-8 bg-gray-200 flex-1 overflow-x-hidden overflow-y-scroll ">
        {content}
      </section>
      {/* Navigation */}
      <section className="shrink-0 bg-black/70 h-min">{navigation}</section>
    </main>
  );
};

export default Layout;
