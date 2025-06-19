import '../css/board.css'


const Board = ({content}) => {
    const board = content;

    return (
        <>
            <div className='board'>
                <img src={board.image}/>
                <h3>{board.title}</h3>
                <p>{board.category}</p>
                <div className='board-buttons'>
                    <button className='view'>View Board</button>
                    <button className='delete'>Delete Board</button>
                </div>
            </div>
        </>
    )
}

export default Board;