import { useContext } from "react";
import { PostContext } from "../App";
import { MoreButton } from "../posts/Buttons";
import "./DeletePost.scss";
const DeletePost=({post})=>{
    const {database,savePostData} = useContext(PostContext);

    const deletePost=()=>{
        const tempDatabase = database.filter(item=>item!=post);
        savePostData(tempDatabase)
        console.log("post deleted");
      }
    return(
        <div className="delete-container">
            <MoreButton text="Delete Post" deletePost={deletePost}/> 
        </div>
    )
}
export default DeletePost;