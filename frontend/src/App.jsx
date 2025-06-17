import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchBar from './components/SearchBar'
import SortButtons from './components/Sort'
import BoardGrid from './components/BoardGrid'

function App() {

  return (
    <>
      <header>
        {/* // logo and titile */}
        <h1>KUDOS BOARD</h1>

        <div className='search-and-sort'>
          <SearchBar />
          <div className='sorting'>
            <SortButtons />
          </div>
        </div>

      </header>
      <main>
        <button className='create-board'>Create a New Board</button>

        {/* // search & sort
        // kudos board grid
        // cards grid
        // create a board
        // create a card */}
        <BoardGrid />

        
      </main>

      <footer className='kudos-board-footer'>
        <h2>© 2025 Boateng Productions</h2>
      </footer>
    </>
  )
}

export default App
