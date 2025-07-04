import { useState, useEffect } from 'react'
import '../css/Home.css'
import SearchBar from '../components/SearchBar'
import SortButtons from '../components/Sort'
import BoardGrid from '../components/BoardGrid'
import CreateBoardModal from '../components/CreateBoardModal'
import { getBoards } from '../utils/api'


function Home() {
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


  // creating a board
  const handleBoardCreated = (board) => {
    loadBoards();
  };

  const handleModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  }

  const handlePinChange = (id, pinned) => {
    setBoards((prev) => {
    const next = prev.map((b) => (b.id === id ? { ...b, pinned } : b));
    return next.sort((a, b) => (b.pinned - a.pinned) || new Date(b.date) - new Date(a.date));
  })};

  return (
    <>
      <header id='home-header'>
        <h1>KUDOS BOARD</h1>

        <div className='search-and-sort'>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
          <div className='sorting'>
            <SortButtons setSortType={setSortType}/>
          </div>
        </div>

      </header>
      <main>
        <button className='create-board creating' onClick={handleModal}>Create a New Board</button>

        {isModalOpen && <CreateBoardModal handleOpen={setIsModalOpen} onBoardCreated={handleBoardCreated} />}


        <BoardGrid boards={boards} onRemoved={handleRemoved} onPinChange={handlePinChange}/>

      </main>

      <footer className='kudos-board-footer'>
        <h2>© 2025 Boateng Productions</h2>
      </footer>
    </>
  )
}

export default Home;
