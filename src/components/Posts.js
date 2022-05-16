import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPosts } from "../helpers/fetchPosts";

function Posts() {
  //const [posts, setPosts] = useState([]);

  const [posts, dispatch] = useReducer(postReducer, []);

  function postReducer(state, action) {
    switch (action.type) {
      case "update": {
        return state.reduce((posts, post) => {
          const obj = { ...post };
          if (post._id === action._id) {
            obj[action.fieldName] = action.fieldValue;
          }
          return [...posts, obj];
        }, []);
      }
      case "load": {
        return [...action.payload];
      }
      default: {
        break;
      }
    }
  }

  function editLocalPublishedState(post) {
    /*setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post._id === id) return { ...post, published: !post.published };
        else return { ...post };
      });
    });*/
    dispatch({
      type: "update",
      fieldName: "published",
      fieldValue: !post.published,
      _id: post._id,
    });
  }

  async function changePublishedState(post) {
    const response = await fetch(
      `http://localhost:3000/auth/posts/${post._id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "PUT",
        body: JSON.stringify({
          ...post,
          published: !post.published,
          author: post.author._id,
        }),
      }
    );
    const res = await response.json();
    if (res.code === 200) {
      editLocalPublishedState(post);
    } else {
      console.log("bad code");

      dispatch({
        type: "update",
        fieldName: "error",
        fieldValue: "Something went wrong updating this post",
        _id: post._id,
      });

      /*setPosts((prevPosts) => {
        return prevPosts.map((thisPost) => {
          if (thisPost._id === post._id) {
            return {
              ...thisPost,
              error: "Something went wrong updating this post.",
            };
          } else {
            return thisPost;
          }
        });
      });*/
    }
  }

  useEffect(() => {
    async function initialLoad() {
      const data = await fetchPosts();
      dispatch({ type: "load", payload: data.posts });
      //setPosts(() => data.posts);
    }
    initialLoad();
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <main>
      <h1>Posts:</h1>
      {posts.map((post) => {
        return (
          <article key={post._id}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Link to={`/posts/${post._id}`}>
                <h2>{post.title}</h2>
              </Link>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <button onClick={() => changePublishedState(post)}>
                  {post.published ? "Unpublish" : "Publish"}
                </button>
                <p>{post.error ? post.error : ""}</p>
              </div>
            </div>
            <p>{post.text}</p>
            <div style={{ display: "flex", gap: "12px" }}>
              <p>
                {post.author.first_name} {post.author.last_name}
              </p>
              <p>{new Date(post.updatedAt).toLocaleDateString()}</p>
            </div>
          </article>
        );
      })}
    </main>
  );
}

export default Posts;
