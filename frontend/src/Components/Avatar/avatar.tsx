import React from "react";
import "./avatar.css";

interface AvatarProps {
  imageUrl: string;
  size?: number;
}

const Avatar = ({imageUrl, size = 75} : AvatarProps) => {
  return (
    <img
      src={`/avatars/${imageUrl}`}
      className="h-100 avatar-image"
      alt="Avatar"
      width={size}
      height={size}
    />
  )
}

export default Avatar;