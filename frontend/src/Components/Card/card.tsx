import { Link } from "react-router-dom";
import "./card.css"

interface Card {
  link: string; //TODO: figure out where we should link this
  image: string;
  text: string;
}

const Card = () => {
  return (
    <Link className='gla-card' to="#">
      <img src="background.jpg" className="gla-card-image" alt="..."/>
      <div className="gla-card-body">
        <p className="card-text">Game Name</p>
      </div>
    </Link>
  )
}

export default Card;