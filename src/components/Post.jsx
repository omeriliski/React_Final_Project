import {useState,useContext} from "react";
import { PostContext } from "../App";
import More from "../posts/img/more.svg";
import DeletePost from "./DeletePost";
import { ShareAFeedback,UsersInteractions, UserComments,ActualComments, NewComment } from "../posts/UsersInteractions";

export function Post({post,index}) {
    const [feedback, setFeedback] = useState(false);
    const [showComments,setShowComments] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const {currentUser} = useContext(PostContext)
    console.log('post.postType :>> ', post.postType);
    const moreClick=()=>{
      if(currentUser.email==post.email){
        setShowDelete(!showDelete);
        setTimeout(() => {
          setShowDelete(false)
        }, 3000);
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
          <div className="picture-wrapper">
           {post.postType=="picture" && <img className="image-src" src={post.imgUrl} />}
           {post.postType=="video" && <video width="320" height="240" controls>
            <source src={post.imgUrl} type="video/mp4" />
            <source src={post.imgUrl} type="video/ogg" />
            Your browser does not support the video tag.
          </video>}
          {post.postType=="audio" && <audio src={post.audioUrl} controls />}
          </div>
          <div className="txt-title">
            <p>{post.postTitle}</p>
          </div>
          <div className="body-txt">
            <p>{post.postText}</p>
          </div>
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
          index={index}
          setFeedback={setFeedback}
          feedback={feedback}
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

    export default Post;