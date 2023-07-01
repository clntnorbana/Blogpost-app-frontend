import { useGetBlogPostsQuery } from "../api/slices/blogpostApiSlice";
import Blogpost from "./Blogpost";
import Loader from "./Loader";

const Blogposts = () => {
  const { data = [], isLoading, error, isSuccess } = useGetBlogPostsQuery();

  return (
    <>
      {isLoading && <Loader />}
      {error && <h1>Something went wrong...</h1>}
      {isSuccess && (
        <div className="blogposts">
          {data.length > 0 ? (
            <>
              {data?.map((blogpost) => (
                <Blogpost key={blogpost._id} blogpost={blogpost} />
              ))}
            </>
          ) : (
            "no blogposts"
          )}
        </div>
      )}
    </>
  );
};

export default Blogposts;
