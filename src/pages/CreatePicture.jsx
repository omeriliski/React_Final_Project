import { useContext, useRef, useState } from "react";
import { PostContext } from "../App";
import { Navigate } from "react-router-dom";
import Plus from "../posts/img/plus.svg";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import "./CreatePostInput.scss";
import { ButtonPrimary } from "../posts/Buttons";

const CreatePicture = () => {
  const [imageURL, setImageURL] = useState();
  const [progress, setProgress] = useState(0);

  const { currentUser, savePostData, database, getPostData } =
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
      postType: "picture",
      vote: [],
      email: currentUser.email,
    };
    const newPostData = [newPost, ...database];
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

    // const storage = getStorage();
    //const storageRef = ref(storage, URL.createObjectURL(img.current.files[0]));

    // 'file' comes from the Blob or File API
    // uploadBytes(storageRef, file).then((snapshot) => {
    //   console.log('Uploaded a blob or file!');
    // });
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
      <div className="card-div">
        <form onSubmit={handleSubmit} className="form-css">
          <div className="file-input-wrapper">
            <img src={imageURL} />
            <input
              ref={img}
              type="file"
              accept="image/*"
              placeholder="Bild hinzufügen"
            />
            <img src={Plus} alt="" />{" "}
          </div>

          <h3>Uploaded {progress} %</h3>
          <input
            ref={postTitle}
            type="text"
            placeholder="Titel hinzufügen"
            className="input-title"
          />
          <textarea
            ref={postText}
            rows="4"
            cols="40"
            placeholder="Text hinzufügen"
            className="input-title"
          ></textarea>
          <ButtonPrimary text="Teilen" />
        </form>
      </div>
    </div>
  );
};
export default CreatePicture;
