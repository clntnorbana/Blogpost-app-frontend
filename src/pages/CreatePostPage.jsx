import { useState } from "react";
import { useCreateBlogPostMutation } from "../api/slices/blogpostApiSlice";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";

const CreatePostPage = () => {
  const [createPost, { isLoading }] = useCreateBlogPostMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  // const [file, setFile] = useState("");
  const [content, setContent] = useState("");

  const createBlogPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("title", title);
    formData.set("summary", summary);
    // formData.set("cover", file[0]);
    formData.set("content", content);

    await createPost(formData).unwrap();

    navigate("/");
  };

  return (
    <form onSubmit={createBlogPost} className="form-post">
      <h1>Create Post</h1>
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      {/* <input type="file" onChange={(e) => setFile(e.target.files)} /> */}
      <Editor value={content} onChange={setContent} />
      <button className="btn btn_post-submit" disabled={isLoading}>
        Create post
      </button>
    </form>
  );
};

export default CreatePostPage;
