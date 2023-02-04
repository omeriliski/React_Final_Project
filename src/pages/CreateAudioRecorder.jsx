import { useReactMediaRecorder } from "react-media-recorder";
import { useContext, useRef, useState } from "react";
import { PostContext } from "../App";
import { Navigate } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import "./CreatePostInput.scss";
import { ButtonPrimary, RecordButton } from "../posts/Buttons";

const CreateAudio = () => {
  const [audio, setAudio] = useState();
  const [imageURL, setImageURL] = useState();
  const [progress, setProgress] = useState(0);

  const { currentUser, savePostData, database, getPostData } =
    useContext(PostContext);

  const postTitle = useRef();
  const postText = useRef();

  const db = getFirestore();

  const createPostData = async (audioUrl) => {
    const newPost = {
      postTitle: postTitle.current.value,
      postText: postText.current.value,
      audioUrl,
      comments: [],
      postType: "audio",
      vote: [],
      email: currentUser.email,
    };
    const newPostData = [newPost, ...database];

    savePostData(newPostData);
    getPostData();
  };

  const uploadFile = async () => {
    console.log(mediaBlobUrl);
    const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
    console.log("audioBlob==>>", audioBlob);

    console.log("file :>> ", audioBlob);
    if (!audioBlob) return;
    const storageRef = ref(storage, `files/${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, audioBlob);

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
        getDownloadURL(uploadTask.snapshot.ref).then((audioUrl) =>
          createPostData(audioUrl)
        );
      }
    );
  };

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: false,
      audio: true,
      blobPropertyBag: {
        type: "audio/wav",
      },
    });
  if (!currentUser) return <Navigate to="login" />;
  function handleSubmit(){
uploadFile(mediaBlobUrl);
  }
  return (
    <div className="card-div ">
      <div className="form-css">
        <h3>Uploaded {progress} %</h3>
        <input
          ref={postTitle}
          type="text"
          placeholder="Titel hinzufügen"
          className="file-input-wrapper2"
        />
        <textarea
          ref={postText}
          rows="4"
          cols="40"
          placeholder="Text hinzufügen"
          className="file-input-wrapper2"
        ></textarea>
        <div className="audio-container">
          <RecordButton
            status={status}
            startRecording={startRecording}
            stopRecording={stopRecording}
          >
            {" "}
            Start{" "}
          </RecordButton>
          {/* <button onClick={stopRecording}>Stop </button> */}
          <audio src={mediaBlobUrl} controls />
          <ButtonPrimary text="Post" handleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CreateAudio;
