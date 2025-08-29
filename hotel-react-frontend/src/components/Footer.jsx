import React from 'react'

export default function Footer() {
  return (
    <footer className="center">
      <div className="container">
        <div>© {new Date().getFullYear()} Hotel Website • Built with React + Vite</div>
      </div>
    </footer>
  )
}
