import HomeLayout from "@web/components/home/layouts/HomeLayout";
import BlogView from "./BlogView";
import PostView from "@web/app/posts/[...params]/PostView";

export default function BlogViewPage() {
  return (
    <HomeLayout>
      <PostView />
    </HomeLayout>
  );
}
