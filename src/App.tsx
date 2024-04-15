import { useState } from 'react'
import convars from './data/convars.json'
import './App.css'

function App() {
  const urlQuery = new URLSearchParams(window.location.search).get('q')
  const [filter, setFilter] = useState(urlQuery || '')
  const filtered = convars.filter(c => (c.name).includes(filter))

  return (
    <>
      <header>
        <h1>Titanfall 2 Convars</h1>
      </header>
      
      <div className='search-container'>
        <input
          id="search-box"
          type="search"
          onChange={(e) => {
            setFilter(e.target.value);
            if (!e.target.value) {
              window.history.pushState({}, '', './')
            }
            else {
              window.history.pushState({}, '', `?q=${e.target.value}`)
            }
          }}
          value={filter}
          placeholder='Search convars...'
        />
      </div>
      {filtered.length === 0 && 
        <p>No convars found</p>
      }
      {filtered.length > 0 &&
        <table>
          <thead>
            <tr>
              <th>Convar</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((convar: any) => (
              <tr key={convar.name}>
                <td>{convar.name}</td>
                <td>{convar.value}</td>
                <td>{convar.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </>
  )
}

export default App
