const DevicesCard = ({children}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {children}
    </div>
  )
}

export default DevicesCard