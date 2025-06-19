import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchBar from './components/SearchBar'
import SortButtons from './components/Sort'
import BoardGrid from './components/BoardGrid'
import CreateBoardModal from './components/CreateBoardModal'
import { getBoards, createBoard, deleteBoard } from './utils/api'


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("All");


// loading boards from the API
  const loadBoards = async () => {

    const params = {}
    // search functionality
    if (searchQuery) {
      params.title = searchQuery
    }

    // sort functionality
    if (sortType === 'Recent') {
      params.recent = true;                      
    } else if (['Celebration', 'Inspiration', 'Thank You'].includes(sortType)) {
    params.category = sortType;                  
    }

    try {
      const allBoards = await getBoards(params)
      setBoards(allBoards)
    } catch (err) {
        console.log(err)
        setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBoards()
  }, [searchQuery, sortType])


  // removing a board
  const handleRemoved = (id) => {
    setBoards((prev) => prev.filter((b) => b.id !== id));
  };

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
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
          <div className='sorting'>
            <SortButtons setSortType={setSortType}/>
          </div>
        </div>

      </header>
      <main>
        <button className='create-board' onClick={handleModal}>Create a New Board</button>

        {isModalOpen && <CreateBoardModal handleOpen={setIsModalOpen} />}


        <BoardGrid boards={boards} onRemoved={handleRemoved}/>

      </main>

      <footer className='kudos-board-footer'>
        <h2>© 2025 Boateng Productions</h2>
      </footer>
    </>
  )
}

export default App;
