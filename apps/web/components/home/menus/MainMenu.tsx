"use client";

import { Category } from "@prisma/client";
import { isNew } from "@web/app/posts/PostList";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function MainMenu({ categories }: { categories: Category[] }) {
  const scrollContainerRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      let isDown = false;
      let startX: number;
      let scrollLeft: number;

      const handleMouseDown = (e: MouseEvent) => {
        isDown = true;
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
      };

      const handleMouseLeave = () => {
        isDown = false;
      };

      const handleMouseUp = () => {
        isDown = false;
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainer.scrollLeft = scrollLeft - walk;
      };

      scrollContainer.addEventListener("mousedown", handleMouseDown);
      scrollContainer.addEventListener("mouseleave", handleMouseLeave);
      scrollContainer.addEventListener("mouseup", handleMouseUp);
      scrollContainer.addEventListener("mousemove", handleMouseMove);

      return () => {
        scrollContainer.removeEventListener("mousedown", handleMouseDown);
        scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
        scrollContainer.removeEventListener("mouseup", handleMouseUp);
        scrollContainer.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <nav className="bg-orange-500 text-white py-2 px-4 md:px-12 rounded-lg overflow-x-auto">
      <ul
        ref={scrollContainerRef}
        className="flex md:flex-wrap align-center items-center space-x-4 md:space-x-0 whitespace-nowrap md:whitespace-normal md:justify-between gap-4 md:gap-0"
      >
        {categories?.map((category) => (
          <li key={category.id} className="flex-shrink-0 md:flex-shrink">
            <Link
              href={`/posts?category=${category.name}&categoryId=${category.id}`}
              className={
                category.adminWriteOnly
                  ? `hover:font-extrabold px-2 py-1 block relative`
                  : `text-orange-800 font-semibold hover:text-orange-900 bg-white hover:bg-orange-100 px-3 py-1 rounded-full relative`
              }
            >
              {category.name}
              {isNew(category.lastPostedAt) && (
                <div className="absolute -top-0 -right-1">
                  <img
                    src="/images/new.gif"
                    alt="new icon"
                    className="w-3 h-3"
                  />
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
