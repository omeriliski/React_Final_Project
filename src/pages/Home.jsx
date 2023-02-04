import {
  AwardPost,
  UmfragePost
} from "../posts/Posttypes";
import {Post} from "../components/Post"
import { useContext } from "react";
import { PostContext } from "../App";
const Home = () => {
  const { postData, database } = useContext(PostContext);

  //   if(!currentUser) return <Navigate to="login"/>

  return (
    <div>
      {
        database.map((post,index)=>{
          switch (post.postType) {
            case "picture":
            case "text":
            case "shortText":
            case "video":
            case "audio":
              return <Post post={post} index={index}/>
            case "awardPost":
              return <AwardPost post={post} index={index}/>
            case "survey":
              return <UmfragePost post={post} index={index}/>
            default:
              break;
          }
        })
      }
    </div>
  );
};

export default Home;
