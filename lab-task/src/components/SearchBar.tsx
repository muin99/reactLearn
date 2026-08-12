import { useStudents } from "../context/StudentContext";

function SearchBar() {
  const { searchQuery, setSearchQuery } = useStudents();

  return (
    <div className="search-bar">
      <input
        type="search"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search by name or major..."
      />
      {searchQuery && (
        <button
          type="button"
          className="search-clear"
          onClick={() => setSearchQuery("")}
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default SearchBar;
