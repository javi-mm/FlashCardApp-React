import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

// Set doc
const setDocCustom = async (collectionName, documentName, documentParams) => {
  try {
    await setDoc(doc(db, collectionName, documentName), {
      ...documentParams,
    });
  } catch (error) {
    return error;
  }
};

//Get Doc
const getDocCustom = async (collectionName, document) => {
  const docRef = doc(db, collectionName, document);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {}
};

//Get Card Document
const getCard = async (cardID) => {
  const cardRef = doc(db, "cards", cardID);
  try {
    const card = await getDoc(cardRef);
    if (card.exists) {
      return card.data();
    }
  } catch (error) {}
};

export { setDocCustom, getDocCustom, getCard };
