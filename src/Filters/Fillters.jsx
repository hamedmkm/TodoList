function Filters({ setFilter, setCategoryFilter }) {
    return (
      <div>
        <div>
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('completed')}>Completed</button>
          <button onClick={() => setFilter('incomplete')}>Incomplete</button>
        </div>
        <div>
          <select onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="Learning">Learning</option>
            <option value="Personal">Personal</option>
            {/* Add more categories as needed */}
          </select>
        </div>
      </div>
    );
  }
  export default Filters