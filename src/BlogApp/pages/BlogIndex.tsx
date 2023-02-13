import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../assets/scripts/helpers/apiCalls";
import TextContent from "../../components/TextContent/TextContent";
import CardBlog from "../../components/CardBlog/CardBlog";
import { truncate } from "../../assets/scripts/helpers/helpers";
import { BlogPostType } from "../../assets/scripts/helpers/types";



const BlogIndexPage = () => {

  const { data, isLoading, isError, error} = useQuery({
      queryKey: ['blogPosts'],
      queryFn: () => getAllPosts()
  });

  if (isLoading) {
    return <TextContent heading="Loading request ..."> </TextContent>;
  }
  if (isError) {
    return (
      <TextContent heading="Request error ...">
        { error }
      </TextContent>
    );
  }

  return (
      <>
          { data?.length ? renderPostsCards(data) : noPostsMsg()}
      </>
  )
};

const renderPostsCards = (posts: BlogPostType[]) => {
  return (
      <div className="blog-cards">
          { posts.map(({id, title, author, image, content}) => (
              <CardBlog
                  key={ id } 
                  id={ id }
                  title={ title }
                  author={ author }
                  image={ image }
                  content={ truncate(content) }
              />
          ))}
      </div>
  );
}

const noPostsMsg = () => {
  return (
    <TextContent heading="There is no posts">
      Come back later ...
    </TextContent>
  )
}

export default BlogIndexPage;
