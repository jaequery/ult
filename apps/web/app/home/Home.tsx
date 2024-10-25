"use client";

import HomeLayout from "@web/components/home/layouts/HomeLayout";
import PostList from "../posts/PostList";

export default function Home() {
  return (
    <HomeLayout>
      <div className="max-w-full mx-auto bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 ">
            <PostList
              categoryId={1}
              perPage={30}
              showPagination={false}
            />
        </div>
      </div>
    </HomeLayout>
  );
}
