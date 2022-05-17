const postsManager = (() => {
  const updatePost = async (post, callback) => {
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
    return res;
  };

  const handleResponse = (response, post, callback) => {
    if (response.code === 200) {
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

  const fetchPosts = async () => {
    const response = await fetch("http://localhost:3000/auth/posts", {
      credentials: "include",
      method: "GET",
      mode: "cors",
    });
    const data = await response.json();
    return data;
  };

  return {
    updatePost,
    handleResponse,
    fetchPosts,
  };
})();

export { postsManager };
