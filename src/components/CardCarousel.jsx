import "./CardCarousel.scss";
import Card from "./Card";
import Slider from "../UI/Slider";
import Spinner from "../UI/Spinner";

const CardCarousel = ({ deck, loading }) => {
  if (loading || !deck) {
    return (
      <div className="wrapper">
        <Spinner />
      </div>
    );
  }

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
