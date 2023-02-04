import "./buttons.scss";
import { useContext } from "react";
import { PostContext } from "../App";

export function ButtonPrimary({text, handleSubmit}) {
  return (
    <div className="button-wrapper">
      <input type="submit" onClick={handleSubmit} className="button-primary" value={text}/>
    </div>
  );
}

export function ButtonSecondary({index, post, text, feedback, setFeedback, }) {
    const { savePostData,database, setDatabase } = useContext(PostContext);

  function closeButton(){
    console.log(post);
    post.feedback = text; 
    const arr = [...database]
    arr[index] = post;
    savePostData(arr)
    setDatabase(arr)
    setTimeout(()=>setFeedback(false),1000)
  }
  return (
    <div className="button-wrapper">
      <input type="button" className="button-secondary" value={text} onClick={closeButton} />
    </div>
  );
}
export function AnswerButtonSecondary({index, post, text, handleAnswer}) {
    const { savePostData,database, setDatabase } = useContext(PostContext);

  
  return (
    <div className="button-wrapper">
      <input type="button" className="button-secondary" value={text} onClick={()=>{handleAnswer(text)}} />
    </div>
  );
}

export function SmallButton({post, text, setFeedback}){
  function feedbackClick(){
  setFeedback(true)
}
  return (
    <div className="button-container">
      <button className="button-small" onClick={feedbackClick}>
        {post?.hasOwnProperty("feedback") ? post.feedback : "Feedback"}
      </button>
    </div>
  );
}
export function RecordButton({status, startRecording, stopRecording }) {
  return (
    <div className="button-RECORD-container">
      <button className="button-small" onMouseDown={startRecording} onMouseUp={stopRecording}>
        {status}
      </button>
    </div>
  );
  }
export function MoreButton({text, deletePost }) {
  
  return (
    <div className="delete-container">
      <button className="button-small" onClick={deletePost}>
        {text}
      </button>
    </div>
  );
  }

export function LogRegisterButton({text}){
 
  return (
    <div className="button-container">
      <button className="button-small">{text}</button>
    </div>
  );
}

