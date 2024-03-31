import AppLayout from "@web/components/AppLayout";
import BlogView from "./BlogView";
import PostView from "@web/app/posts/[...params]/PostView";

export default function BlogViewPage() {
  return (
    <AppLayout>
      <PostView />
    </AppLayout>
  );
}
