import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchBar from './components/SearchBar'
import SortButtons from './components/Sort'
import BoardGrid from './components/BoardGrid'
import CreateBoardModal from './components/CreateBoardModal'


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  }
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
        <button className='create-board' onClick={handleModal}>Create a New Board</button>

        {isModalOpen && <CreateBoardModal handleOpen={setIsModalOpen} />}

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
