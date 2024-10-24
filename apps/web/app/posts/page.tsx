import AppLayout from "@web/components/AppLayout";
import PostList from "./PostList";

export default function PostListPage() {
  return (
    <AppLayout>
      <PostList showPagination={true} />
    </AppLayout>
  );
}
