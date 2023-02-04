import { useContext, useRef, useState } from "react";
import { PostContext } from "../App";
import { Navigate } from "react-router-dom";
import {
  getFirestore,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase";
import "./CreatePostInput.scss";
import { ButtonPrimary } from "../posts/Buttons";

const CreateVideo = () => {
  const [imageURL, setImageURL] = useState();
  const [progress, setProgress] = useState(0);

  const { currentUser, savePostData, database,getPostData } =
    useContext(PostContext);

  const img = useRef();
  const postTitle = useRef();
  const postText = useRef();

  const db = getFirestore();

  const createPostData = async (imgUrl) => {
    // const currentUsersPosts = database.find(data=>data.userSettings.uid==currentUser.uid);
    // console.log('currentUsersPosts :>> ', currentUsersPosts);

    const newPost = {
      postTitle: postTitle.current.value,
      postText: postText.current.value,
      imgUrl,
      comments: [],
      postType: "video",
      vote: [],
      email: currentUser.email
    };
    const newPostData = [newPost,...database]
    //   userSettings: {
    //     userId: currentUser.uid,
    //     userEmail: currentUser.email,
    //   },
    
    savePostData(newPostData);
    getPostData();
  };

  const uploadFile = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log("err :>> ", err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((imgUrl) =>
          createPostData(imgUrl)
        );
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setImageURL(URL.createObjectURL(img.current.files[0]));
    console.log(
      "URL.createObjectURL(img.current.files[0]) :>> ",
      URL.createObjectURL(img.current.files[0])
    );
    const url = uploadFile(img.current.files[0]);
    console.log("imageURL :>> ", imageURL);
  };

  if (!currentUser) return <Navigate to="login" />;
  return (
    <div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            ref={img}
            type="file"
            accept="video/*"
            placeholder="Bild hinzufügen"
          />
          {/* <img src={imageURL} /> */}
          <video width="320" height="240" controls>
            <source src={imageURL} type="video/mp4"/>
            <source src={imageURL} type="video/ogg"/>
            Your browser does not support the video tag.
          </video>

          <h3>Uploaded {progress} %</h3>
          <input ref={postTitle} type="text" placeholder="Titel hinzufügen" />
          <textarea
            ref={postText}
            rows="4"
            cols="40"
            placeholder="Text hinzufügen"
          ></textarea>
          <ButtonPrimary text="Teilen" />
        </form>
      </div>
    </div>
  );
};
export default CreateVideo;
