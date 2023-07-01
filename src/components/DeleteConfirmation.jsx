import { useDeleteBlogPostMutation } from "../api/slices/blogpostApiSlice";
import { useNavigate } from "react-router-dom";

const DeleteConfirmation = ({ post_id, closeDeleteForm }) => {
  const navigate = useNavigate();
  const [deletePost] = useDeleteBlogPostMutation();

  const deleteBlogPost = async () => {
    await deletePost(post_id);

    navigate("/");
  };

  return (
    <div className="delete-confirm">
      <button className="btn-delete-confirm" onClick={deleteBlogPost}>
        I want to delete this post
      </button>
      <button className="btn-cancel" onClick={closeDeleteForm}>
        Cancel
      </button>
    </div>
  );
};

export default DeleteConfirmation;
