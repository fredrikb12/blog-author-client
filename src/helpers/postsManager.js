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
          published: !post.published,
          author: post.author._id,
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
        fieldValue: !post.published,
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
        if (response.status === 403) return { posts: [], status: 403 };
      }

      const data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  return {
    deletePost,
    deleteLocalPost,
    putPost,
    updateLocalPost,
    handleResponse,
    fetchPosts,
  };
})();

export { postsManager };
