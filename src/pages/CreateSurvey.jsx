import { useContext, useRef, useState } from "react";
import { PostContext } from "../App";
import { Navigate } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import "./CreatePostInput.scss";
import { ButtonPrimary } from "../posts/Buttons";
import Plus from "../posts/img/plus.svg";


const CreateSurvey = () => {
  const { currentUser, savePostData, database, getPostData } =
    useContext(PostContext);
  const [optionsCount, setOptionsCount] = useState(1);
  const [options, setOptions] = useState([]);

  const question = useRef();

  const db = getFirestore();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      question: question.current.value,
      options,
      comments: [],
      postType: "survey",
      vote: [],
      email: currentUser.email,
      answer: []
    };
    const newPostData = [newPost, ...database];
    savePostData(newPostData);
    console.log("saved");
    getPostData();
  };
  const optionsFunction = () => setOptionsCount(optionsCount + 1);
  const getOptions = (e, index) => {
    const arr = [...options];
    arr[index] = e.target.value;
    setOptions(arr);
    console.log("arr :>> ", arr);
  };

  if (!currentUser) return <Navigate to="login" />;
  return (
    <div>
      <div className="card-div">
        <form onSubmit={handleSubmit}>
          <textarea
            ref={question}
            rows="4"
            cols="40"
            placeholder="Frage hinzufügen"
            className="input-title"
          ></textarea>
          {[...Array(optionsCount)].map((item, index) => (
            <input
              onChange={(e) => getOptions(e, index)}
              type="text"
              placeholder="Option hinzufügen"
              className="input-title"
            />
          ))}
          <div onClick={optionsFunction} className="plus-img">
            <img src={Plus} alt="" />
          </div>
          <ButtonPrimary/>
        </form>
      </div>
    </div>
  );
};
export default CreateSurvey;
