import "./CardCarousel.scss";
import Card from "./Card";
import Slider from "../UI/Slider";

const CardCarousel = ({ deck }) => {
  if (!deck) return;

  return (
    <div className="wrapper">
      <h2>{deck.titulo}</h2>
      <Slider>
        {deck.cards.map((cardID, index) => {
          return (
            <Card
              id={cardID}
              key={cardID}
              cardNumber={index + 1}
              totalNumberOfCards={deck.cards.length}
            />
          );
        })}
      </Slider>
    </div>
  );
};

export default CardCarousel;
