import "./choose-post-type.scss";

import { NavLink, Navigate } from "react-router-dom";
import Audio from "./src/Icon_Audio.svg";
import Image from "./src/Icon_Bild.svg";
import Playlist from "./src/Icon_Playlist.svg";
import TextIcon from "./src/Icon_Txt.svg";
import Umfrage from "./src/Icon_Umfrage.svg";
import VideoIcon from "./src/Icon_Video.svg";

export default function ChooseAPostType() {
  return (
    <div className="wrapper-grid">
      <NavLink to="/create/picture">
        <div className="tile-card">
          <img src={Image} alt="" />
          <p className="card-text">Bild</p>
        </div>
      </NavLink>
      <NavLink to="text">
        <div className="tile-card">
          <img src={TextIcon} alt="" />
          <p className="card-text">Text</p>
        </div>
      </NavLink>
      <NavLink to="survey">
        <div className="tile-card">
          <img src={Umfrage} alt="" />
          <p className="card-text">Umfrage</p>
        </div>
      </NavLink>
      <NavLink to="video">
        <div className="tile-card">
          <img src={VideoIcon} alt="" />
          <p className="card-text">Video</p>
        </div>
      </NavLink>
      <NavLink to="audio">
        <div className="tile-card">
          <img src={Audio} alt="" />
          <p className="card-text">Audio</p>
        </div>
      </NavLink>
      <NavLink to="text">
        <div className="tile-card">
          <img src={Playlist} alt="" />
          <p className="card-text">Playlist</p>
        </div>
      </NavLink>
    </div>
  );
}
