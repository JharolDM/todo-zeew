import './Search.css';

const Search = ({ handleSearch }) => {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search..."
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}

export default Search;
