import "./Posttypes.scss";
import More from "./img/more.svg"
import { ActualComments, UsersInteractions,UserComments,NewComment, ShareAFeedback } from "./UsersInteractions";
import { AnswerButtonSecondary, ButtonPrimary } from "./Buttons";
import { useContext, useState } from "react";
import { PostContext } from "../App";
import DeletePost from "../components/DeletePost";
import SurveyResult from "../components/SurveyResult";

export function UmfragePost({post,index}) {
    const [feedback, setFeedback] = useState(false);
    const [showComments,setShowComments] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const {currentUser, database, savePostData} = useContext(PostContext);
    
console.log('post.email :>> ', post.email);

function handleAnswer(text){
  const answerObj={answer: text,
  user: currentUser.email}
  const tempDatabase = [...database]
tempDatabase[index].answer.push(answerObj);
savePostData(tempDatabase)
console.log('database :>> ', database);
}
const moreClick=()=>{
  if(currentUser.email==post.email){
    setShowDelete(!showDelete);
    setTimeout(() => {
      setShowDelete(false)
    }, 3000);
  }
}
const isAnswered = ()=>{
  if(currentUser){
    const indexAnswer = database[index].answer.findIndex(item=>item.user==currentUser.email);
    console.log('index :>> ', indexAnswer);
    return indexAnswer
  }
}

  return (
    <div className="card-div">
      <div className="card-header">
        {" "}
        <div className="user-header">
          <div className="user-pic"></div>{" "}
          <p className="user-name">{post.email}</p>
        </div>
        {showDelete && <DeletePost post={post}/>}
        <img onClick={moreClick} className="more" src={More} />
      </div>
      <div className="post-text-content">
        <div className="card-headline">
          <p></p>
        </div>

        {isAnswered() == -1 ?
        post.options.map((item) => (
          <div className="txt-title">
            <AnswerButtonSecondary handleAnswer={handleAnswer} text={item} />
          </div>
        )):<SurveyResult  post={post} currentUser={currentUser}/>
        
        }
      </div>
      {feedback && (
        <ShareAFeedback
          setFeedback={setFeedback}
          index={index}
          post={post}
          feedback={feedback}
        />
      )}
      <UsersInteractions
        post={post}
        setFeedback={setFeedback}
        feedback={feedback}
        index={index}
      />
      <UserComments
        post={post}
        setShowComments={setShowComments}
        showComments={showComments}
      />
      <div className="comments-newcomments-container">
        <div className="comments-container">
          {showComments ? (
            post.comments.map((comment) => <ActualComments comment={comment} />)
          ) : (
            <ActualComments comment={post.comments[post.comments.length - 1]} />
          )}
        </div>
        {showComments && (
          <div className="newcomments-container">
            <NewComment post={post} index={index} />
          </div>
        )}
      </div>
    </div>
  );}

export function AwardPost() {
    const [feedback, setFeedback] = useState(false)

  return (
    <div className="card-div">
      <div className="card-headline">
        Exzellent! Du hast 5.000 Punkte erhalten.
      </div>
      <div className="card-text">
        Diskutiere weiter und sammle Badges, mit denen Du bis zur Kurator*in
        werden kannst. Verschenke mit Deinen Punkten Awards, um andere
        User*innen auszuzeichnen!
      </div>

      <ButtonPrimary text="Schlissen" />
    </div>
  );}