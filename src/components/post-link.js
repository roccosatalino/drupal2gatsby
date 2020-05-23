import React from "react";
import { Link } from "gatsby";

const PostLink = ({ post }) => (
  <article className="card ">
    <header>
      <h2 className="post-title">
        <Link to={post.path.alias} className="post-link">
          {post.title}
        </Link>
      </h2>
      <div>{post.body.summary}</div>
    </header>
  </article>
);
export default PostLink;
