export async function getServerSideProps({ query }: any) {
  try {
    const { searchBlog } = query;
    const params = new URLSearchParams();

    if (searchBlog) params.append("searchBlog", searchBlog);

    const res = await axios.get(
      `http://localhost:5000/api/blog/search?${params.toString()}`
    );
    const blogs = res.data.blogs;

    return { props: { blogs } };
  } catch (error) {
    return { props: { blogs: [], searchBlog: null } };
  }
}
