import React from "react";
import Avatar from "../../Components/Avatar/avatar";
import { AVATARS } from "../Profile"
import "./followerPanel.css" ;

const sampleFriends = [
  {
    username: "Yoshiko",
    avatar: AVATARS[12]
  },
  {
    username: "Philasaurus",
    avatar: AVATARS[6]
  },
  {
    username: "IYamSushiFan123123123",
    avatar: AVATARS[9]
  },
  {
    username: "Philasaurus",
    avatar: AVATARS[6]
  },
  {
    username: "IYamSushiFan",
    avatar: AVATARS[9]
  },
]

interface Follower {
  username: string;
  avatar: string;
}

const FollowRow = ({username, avatar} : Follower) => {
  return (
    <div className="d-flex flex-row align-items-center gap-2">
      <Avatar imageUrl={avatar} size={55}/>
      <p className="test">{username}</p>
    </div>
  )
}

const FollowPanel = () => {
  return (
    <div className="panel d-none d-sm-flex">
      <div className="overflow-hidden flex-grow-1">
      <h2>Following</h2>
      <div className="h-100 overflow-scroll">
      {sampleFriends.map((following, idx) => <FollowRow key={idx} username={following.username} avatar={following.avatar} />)}
      </div>

      <h2 className="mt-2">Followers</h2>
      {/* {sampleFriends.map((following) => <FollowRow username={following.username} avatar={following.avatar} />)} */}
    </div></div>
  )
}

export default FollowPanel;