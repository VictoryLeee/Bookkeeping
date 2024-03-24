import React from 'react'
import { Button } from 'antd'
import './App.css'

function App() {
  return (
    <div className="app">
      <Button type="primary">Book Keeping</Button>
      <svg>
        {/* 指定 id 即可 */}
        <use xlinkHref="#icon-salary" />
      </svg>
    </div>
  )
}

export default App