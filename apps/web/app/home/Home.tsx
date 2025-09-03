"use client";

import ShadcnHomeLayout from "@web/components/home/layouts/ShadcnHomeLayout";
import ShadcnPostList from "../posts/ShadcnPostList";

export default function Home() {
  return (
    <ShadcnHomeLayout>
      <ShadcnPostList
        categoryId={1}
        perPage={30}
        showPagination={false}
      />
    </ShadcnHomeLayout>
  );
}
