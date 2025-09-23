import React from 'react'

const Room = (props) => {
  const {check ,roomID = 1, icon='🛋️', name='Living Room', status='OFF', onChangeFn, disable='false'} = props
  return (
        <div 
        className={`${disable?'bg-gray-100':''} flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors mt-1`}>
                <div className="flex items-center space-x-3">
                    <span className="text-2xl">{icon}</span>
                    <div>
                        <div className="text-xs text-gray-900">Channel {roomID}</div>
                        <div className="font-medium text-gray-900">{name}</div>
                        <div className="text-xs text-gray-500">{status}</div>
                    </div>
                </div>
                <label className="toggle-switch">
                    <input checked={check} type="checkbox" onChange={onChangeFn} disabled={disable}/>
                    <span className="toggle-slider"></span>
                </label>
            </div>
  )
}

export default Room