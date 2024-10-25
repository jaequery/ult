import HomeLayout from "@web/components/home/layouts/HomeLayout";
import PostList from "./PostList";

export default function PostListPage() {
  return (
    <HomeLayout>
      <PostList showPagination={true} />
    </HomeLayout>
  );
}
