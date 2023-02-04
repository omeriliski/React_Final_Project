import { useContext, useState } from "react";
import { PostContext } from "../App";
import VotingUp from "./img/votingUp.svg";
import VotingDown from "./img/votingDown.svg";
import ArrowDown from "./img/arrowDown.svg";
import ArrowtsCommen from "./img/arrowComments.svg";
import "./users-interactions.scss";
import { SmallButton } from "./Buttons";
import { ButtonPrimary } from "./Buttons";
import { ButtonSecondary } from "./Buttons";
import { useRef } from "react";


const votingNumber = 4;
const commentsNumber = 9;
const userName = "Johanna";
const userComment =
  "Eos tempora ipsum iusto eius maxime perspiciatis voluptas magnam quidem accusamus repudiandae!.";

export function UsersInteractions({post, feedback, setFeedback,index}) {
  const defLike = post.vote.filter(item=>item.voted=="like").length;
  const defDislike = post.vote.filter(item=>item.voted=="dislike").length;

  const {currentUser,database,savePostData} = useContext(PostContext);
  const [like,setLike] = useState(defLike);
  const [dislike,setDislike] = useState(defDislike);

  const VotingUpFunc=(voted)=>{
    const voteObj={
      votedBy:currentUser.email,
      voted
    }
    //if exist give indexnumber
    console.log('object :>> ', database[index].vote.length); 
    const findindex = database[index].vote.findIndex(item=>item.votedBy==currentUser.email);
    // if voted doesn't exist
    if(findindex==-1)  database[index].vote.push(voteObj)
    else database[index].vote[findindex]=voteObj;

    setLike(database[index].vote.filter(item=>item.voted=="like").length);
    setDislike(database[index]?.vote?.filter(item=>item.voted=="dislike").length)
    savePostData(database);
  }
  // const getVoteCount=(voted)=>{
  //   return post.vote.filter(item => item.voted==voted).length
  // }
  return (
    <div className="interactions-container">
      <div className="voting">
        <img onClick={()=>VotingUpFunc("like")} className="voting-up" src={VotingUp} />{" "}
        <a className="typo-extras">{like}</a>
        <img  onClick={()=>VotingUpFunc("dislike")} className="voting-up" src={VotingDown} />{" "}
        <a className="typo-extras">{dislike}</a>
      </div>
      <div className="feedback">
 <SmallButton text="Feedback" feedback={feedback} post={post} setFeedback={setFeedback}/>
        </div>
    </div>
  );
}

export function UserComments({ post,setShowComments,showComments }) {
  const showAllComments=()=>{
    setShowComments(!showComments)
  }
  return (
    <div className="comments-container">
      <button className="show-comments" onClick={showAllComments}>
        Alle {post?.comments?.length} Kommentare anzeigen{" "}
        <img className="arrow-down" src={ArrowDown}/>
      </button>
    </div>
  );
}

export function ActualComments({ comment }) {
  //question: if there is no comment what happens?
  if(comment==undefined) return <div>no comment</div>;
  else {
    return (
      <div className="actual-comment-container">
        <p className="user-name">{comment.userName}</p>
        <p className="user-comment">{comment.userComment}</p>
        <p className="user-comment yellowtxt">{comment.datum}</p>
      </div>
    );
  }
}

export function NewComment({ post, index }) {
  const { currentUser, database, savePostData } = useContext(PostContext);
  const commentText = useRef();

  const eventHandler = (e) => {
    e.preventDefault();
    const comment = {
      //we should fix email
      userName: currentUser.email,
      userComment: commentText.current.value,
      datum: new Date().toDateString(),
    };
    commentText.current.value="";
    const tempDatabase = [...database];
    tempDatabase[index].comments.push(comment);
    savePostData(tempDatabase);
  };
  return (
    <div className="comment-wrapper">
      <form onSubmit={eventHandler}>
        <input
          type="comment-text"
          className="input-comment"
          ref={commentText}
        />
        <input type="submit" value="↑" className="button-small" />
      </form>
    </div>
  );
}


export function ShareAFeedback({index, post, text, feedback, setFeedback}){
  

  return (
    <div className="interactions-overlay">
      <p className="txt-title">Feedback</p>
      <ButtonSecondary
        text="Super Informativ!"
        feedback={feedback}
        setFeedback={setFeedback}
        index={index}
        post={post}
      />
      <ButtonSecondary
        text="Wie Krass!"
        feedback={feedback}
        setFeedback={setFeedback}
        index={index}
        post={post}
      />
      <ButtonSecondary
        text="Du erhellst meinen Tag."
        feedback={feedback}
        setFeedback={setFeedback}
        index={index}
        post={post}
      />
    </div>
  );
}


