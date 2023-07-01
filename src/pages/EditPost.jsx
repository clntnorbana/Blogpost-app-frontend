import { useEffect, useState } from "react";
import {
  useGetBlogPostQuery,
  useUpdateBlogPostMutation,
} from "../api/slices/blogpostApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetBlogPostQuery(id);

  const [updatePost, { isLoading }] = useUpdateBlogPostMutation();

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setSummary(data.summary);
      setContent(data.content);
    }
  }, [data]);

  const updateBlogPost = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.set("title", title);
    // formData.set("summary", summary);
    // formData.set("content", content);
    // if (file?.[0]) formData.set("cover", file?.[0]);
    // formData.set("cover", file[0]);

    await updatePost({
      id,
      title,
      summary,
      content,
    }).unwrap();

    navigate(`/post/${id}`);
  };

  return (
    <form onSubmit={updateBlogPost} className="form-post">
      <h1>Edit Post</h1>
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
      <button disabled={isLoading} className="btn btn_post-submit">
        Save Changes
      </button>
    </form>
  );
};

export default EditPost;
