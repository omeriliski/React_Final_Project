import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreatePicture from "./pages/CreatePicture";
import ChooseAPostType from "./pages/ChoosePostType";
import CreateText from "./pages/CreateText";
import CreateVideo from "./pages/CreateVideo";
import CreateSurvey from "./pages/CreateSurvey";
import CreateAudio from "./pages/CreateAudioRecorder";
import "./App.scss";
import "./firebase";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import {
  collection,
  getFirestore,
  getDoc,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";

export const PostContext = createContext();

const defaultUser = JSON.parse(localStorage.getItem("user"));
function App() {
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [database, setDatabase] = useState([]);
  // const [postData, setPostData] = useState([]);

  const db = getFirestore();

  // const getAllData = async () => {
  //   // const auth = getAuth()
  //   // console.log('auth :>> ', currentUser);
  //   // const docRef =  doc(db, "posts",currentUser.uid);
  //   // const docSnap = await getDoc(docRef);

  //   // if (docSnap.exists()) {
  //   //     state.userSettings=docSnap.data().userSettings;
  //   // }
  //   // else console.log("No such document!");

  //   const querySnapshot = await getDocs(collection(db, "posts"));
  //   const arr = [];
  //   querySnapshot.forEach((doc) => {
  //     // setPostData(doc.data());
  //     arr.push(doc.data());
  //   });
  //   setDatabase(arr);
  // };

  // it gets only currentUser's posts
  const getPostData = async () => {
    const docRef = doc(db, "posts", "postList");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("docSnap.data() :>> ", docSnap.data());
      setDatabase(docSnap.data().postList);
    } else {
      console.log("No such document!");
    }
  };

  const savePostData = async (newPostData) => {
    const postsRef = collection(db, "posts");
    setDatabase(newPostData);
    await setDoc(doc(postsRef, "postList"), { postList: newPostData });
  };

  useEffect(() => {
    getPostData();
  }, []);
  return (
    <PostContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        savePostData,
        database,
        setDatabase,
        getPostData,
      }}
    >
    <div className="App">
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="create" >
            <Route index element={<ChooseAPostType />}/>
            <Route path="picture" element={<CreatePicture/>}/>
            <Route path="text" element={<CreateText/>}/>
            <Route path="video" element={<CreateVideo/>}/>
            <Route path="survey" element={<CreateSurvey/>}/>
            <Route path="audio" element={<CreateAudio/>}/>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="*"
            element={
              currentUser ? <Navigate to="/" /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </div>
    </PostContext.Provider>
  );
}

export default App;
