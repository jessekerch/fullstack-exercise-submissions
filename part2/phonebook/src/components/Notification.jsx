/* eslint-disable react/prop-types */
const Notification = ({ error }) => {
  if (error !== null) return (
    <div className='error'>
      {error}
    </div>
  )
}

export default Notification
