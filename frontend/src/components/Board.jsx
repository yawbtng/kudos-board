import '../css/board.css'


const Board = () => {
    return (
        <div className='board'>
            <img src="../public/chill.png"/>
            <h3>Kudoboard</h3>
            <p>Type</p>
            <div className='board-buttons'>
                <button className='view'>View Board</button>
                <button className='delete'>Delete Board</button>
            </div>
        </div>
    )
}

export default Board;