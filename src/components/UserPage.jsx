import "./UserPage.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Deck from "./Deck";
import Button from "../UI/Button";
import CreateNewDeck from "./CreateNewDeck";
import DecksWrapper from "../UI/DecksWrapper";
import { useContext } from "react";
import { UserContext } from "../context/usercontext";

const UserPage = () => {
  const params = useParams();
  const user = useContext(UserContext);
  const currentUser = params.userId;
  const [loading, setLoading] = useState(true);
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [deckList, setDeckList] = useState([]);

  const getUserDecks = async () => {
    setDeckList([]);
    const deckRef = collection(db, "decks");
    const q = query(deckRef, where("user", "==", currentUser));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setDeckList((prev) => [...prev, doc.data()]);
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) return;
    if (user.uid !== currentUser) return;
    getUserDecks();

    return () => {
      setDeckList([]);
    };
  }, [user]);

  const openModal = () => {
    setIsModalShowing(true);
  };

  if (!user) return;

  return (
    <div className="userpage_wrapper">
      <DecksWrapper titulo={"Tus Decks"} loading={loading}>
        {deckList &&
          deckList.map((deck) => {
            return (
              <Deck
                key={deck.id}
                id={deck.id}
                userID={deck.user}
                userPhoto={deck.userPhoto}
                userName={deck.userName}
                cards={deck.cards}
                titulo={deck.titulo}
                updateDecks={getUserDecks}
                isDeckOwner={deck.user === currentUser}
              />
            );
          })}
      </DecksWrapper>
      <div>
        <Button
          onClick={openModal}
          text={"Añade Nuevo Deck"}
          size={"medium"}
          fontSize={15}
        ></Button>
        {isModalShowing && (
          <CreateNewDeck
            userID={currentUser}
            updateDecks={getUserDecks}
            onClose={() => setIsModalShowing(false)}
          />
        )}
      </div>
    </div>
  );
};

export default UserPage;
