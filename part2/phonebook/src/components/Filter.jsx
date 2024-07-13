/* eslint-disable react/prop-types */
const Filter = ({ setNewFilter, newFilter }) => {
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  return (
    <div>
      filter name by: <input onChange={handleFilterChange} value={newFilter}/>
    </div>
  )
}

export default Filter