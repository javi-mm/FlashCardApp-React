import "./Deck.scss";
import { useNavigate } from "react-router-dom";
import DeleteItem from "./DeleteItem";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Deck = ({
  titulo,
  cards,
  id,
  userPhoto,
  userName,
  updateDecks,
  isDeckOwner,
}) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/decks/${id}/view`);
  };

  const deleteDeck = async (id) => {
    await deleteDoc(doc(db, "decks", id));
  };

  return (
    <div className="deck_wrapper" onClick={clickHandler}>
      {isDeckOwner && (
        <div className="delete_deck">
          <DeleteItem update={updateDecks} onClick={deleteDeck} id={id} />
        </div>
      )}
      <div className="deck">
        <div className="deck_information">
          <p>{titulo}</p>
          <span>{cards.length + " Tarjetas"}</span>
        </div>
        <div className="deck_user_information">
          <img
            src={`${userPhoto}`}
            alt="Avatar del usuario"
            referrerPolicy="no-referrer"
          />
          <p>{userName.split(" ")[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default Deck;
