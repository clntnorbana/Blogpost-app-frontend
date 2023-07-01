import { Link, useParams } from "react-router-dom";
import { useGetBlogPostQuery } from "../api/slices/blogpostApiSlice";
import Loader from "../components/Loader";

import dateFormat from "dateformat";
import { useSelector } from "react-redux";
import DeleteConfirmation from "../components/DeleteConfirmation";
import { useState } from "react";

const PostPage = () => {
  const [deleteForm, setDeleteForm] = useState(false);

  const { id } = useParams();

  const { data = [], isLoading, error, isSuccess } = useGetBlogPostQuery(id);
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="page post_page">
      {isLoading && <Loader />}
      {error && <h1>Something went wrong...</h1>}
      {isSuccess && (
        <>
          <header>
            <h1 className="title">{data.title}</h1>
          </header>
          <hr className="hr" />
          <div className="date-author">
            <p className="author">By {data.author}</p>
            <p className="date">{dateFormat(data.createdAt, "fullDate")}</p>
            {userInfo
              ? data.user_id === userInfo.user_id && (
                  <div className="btn-parent">
                    <Link to={`/edit_post/${data._id}`} className="btn-edit">
                      Edit this post
                    </Link>
                    <Link
                      className="btn-delete"
                      onClick={() => setDeleteForm(true)}
                    >
                      Delete this post
                    </Link>
                  </div>
                )
              : ""}
          </div>
          <div className="body">
            <div className="img-container">
              <img src={`http://localhost:5000/${data.cover}`} alt="image" />
            </div>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          </div>
        </>
      )}
      {deleteForm && (
        <DeleteConfirmation
          post_id={id}
          closeDeleteForm={() => setDeleteForm(false)}
        />
      )}
    </div>
  );
};

export default PostPage;
