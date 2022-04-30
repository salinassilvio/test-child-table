import React from "react";
import './posts.css'

function Posts({postUser}) {
  return (
    <div className="posts-general-data">
      <p className="posts-name">{postUser.name}</p>
      <p className="posts-numer">{postUser.count}</p>
    </div>
  );
}

export default Posts;
