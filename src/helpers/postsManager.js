const postsManager = (() => {
  const serverURL = "http://localhost:3000/";

  const putPost = async (post, callback) => {
    try {
      const response = await fetch(`${serverURL}auth/posts/${post._id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "PUT",
        body: JSON.stringify({
          ...post,
        }),
      });

      if (!response.ok) return Promise.reject(response.status);

      const res = await response.json();
      return res;
    } catch (e) {
      throw new Error(e);
    }
  };

  const deletePost = async (post, callback) => {
    try {
      const response = await fetch(`${serverURL}auth/posts/${post._id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "DELETE",
        body: JSON.stringify({
          postId: post._id,
        }),
      });

      if (!response.ok) return Promise.reject(response.status);

      const res = await response.json();
      return res;
    } catch (e) {
      throw new Error(e);
    }
  };

  const handleResponse = (response, post, callback) => {
    if (response.message === "Post deleted") {
      callback("delete", {
        _id: post._id,
      });
    } else if (response.message === "Post updated") {
      callback("update", {
        _id: post._id,
        fieldName: "published",
        fieldValue: post.published,
      });
    } else {
      callback("update", {
        _id: post._id,
        fieldName: "error",
        fieldValue: "Something went wrong updating this post",
      });
    }
  };

  const updateLocalPost = (prevPosts, data) => {
    return prevPosts.reduce((posts, post) => {
      const currentPost = { ...post };
      if (currentPost._id === data._id) {
        currentPost[data.fieldName] = data.fieldValue;
      }
      return [...posts, currentPost];
    }, []);
  };

  const deleteLocalPost = (prevPosts, data) => {
    return prevPosts.filter((post) => {
      return post._id !== data._id;
    });
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${serverURL}auth/posts/`, {
        credentials: "include",
        method: "GET",
        mode: "cors",
      });

      if (!response.ok) {
        return checkResponse(response);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const fetchPost = async (postId) => {
    try {
      const response = await fetch(`${serverURL}auth/posts/${postId}`, {
        credentials: "include",
        method: "GET",
        mode: "cors",
      });

      if (!response.ok) {
        return checkResponse(response);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const checkResponse = (response) => {
    if (response.status === 403)
      return {
        posts: [],
        status: 403,
        message: "You were not authorized to view posts, please log in.",
      };
    else
      return {
        posts: [],
        status: response.status,
        message: "Something went wrong.",
      };
  };

  const putComment = async (comment, id, callback) => {
    console.log("putting comment");
    try {
      const response = await fetch(`${serverURL}auth/comments/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "PUT",
        body: JSON.stringify({
          text: comment.text,
          author: comment.author,
          commentId: id,
        }),
      });

      if (!response.ok) return Promise.reject(response.status);

      const res = await response.json();
      console.log(res);
      if (res.message === "Comment updated") {
        console.log("checking");
        callback("author", res.comment.author);
        callback("text", res.comment.text);
      }
      return res;
    } catch (e) {
      throw new Error(e);
    }
  };

  const deleteComment = async (id, callback) => {
    console.log("deleting comment");
    try {
      const response = await fetch(`${serverURL}auth/comments/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "DELETE",
        body: JSON.stringify({
          commentId: id,
        }),
      });

      if (!response.ok) return Promise.reject(response.status);

      const res = await response.json();
      console.log(res);
      if (res.message === "Comment updated") {
        console.log("checking");
        //callback("author", res.comment.author);
        //callback("text", res.comment.text);
      }
      return res;
    } catch (e) {
      throw new Error(e);
    }
  };

  const deleteLocalComment = (commentId, setPost) => {
    setPost((prevPost) => {
      return {
        ...prevPost,
        comments: prevPost.comments.filter(
          (comment) => comment._id !== commentId
        ),
      };
    });
  };

  return {
    deletePost,
    deleteLocalPost,
    putPost,
    updateLocalPost,
    handleResponse,
    fetchPosts,
    fetchPost,
    putComment,
    deleteComment,
    deleteLocalComment,
  };
})();

export { postsManager };
