import React from 'react'
export default function Loader({label='Loading...'}) {
  return <div className="center muted" style={{padding:'2rem'}}>{label}</div>
}
