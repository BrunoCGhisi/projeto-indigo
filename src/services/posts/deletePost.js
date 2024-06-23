import { deleteDoc, doc } from "firebase/firestore";
import { database } from "../../config/firebaseconfig";

const deletePost = (id) => {
  const postDocRef = doc(database, "Posts", id);
  deleteDoc(postDocRef);
};

export default deletePost;
