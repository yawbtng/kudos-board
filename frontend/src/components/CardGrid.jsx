import '../css/card-grid.css'
import Card from './Card'


const CardGrid = ({cards, onRemoved}) => {

  return (
    <div className='card-grid'>
      {cards.map((card) => (
        <Card key={card.id} content={card} onRemoved={onRemoved}/>
      ))}
    </div>
  )
}

export default CardGrid;
