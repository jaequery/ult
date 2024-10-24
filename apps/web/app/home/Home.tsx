"use client";

import AppLayout from "@web/components/AppLayout";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import PostList from "../posts/PostList";

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [
    Autoplay({ delay: 5000 }),
  ]);
  return (
    <AppLayout>
      <div className="max-w-full mx-auto bg-white">
        <div className="mb-8 hidden">
          <div className="embla rounded-2xl">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                <div className="embla__slide">
                  <Link href="/posts?categoryId=1">
                    <img
                      style={{
                        width: "100%",
                      }}
                      src="https://vk-news.com/files/thumbnails/727/046/582x300.crop.jpg"
                    />
                  </Link>
                </div>
                <div className="embla__slide">
                  <Link href="/posts?categoryId=2">
                    <img
                      style={{
                        width: "100%",
                      }}
                      src="https://rk-thumb.s3.us-west-2.amazonaws.com/www/home/news_top_photo_450779.jpg"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden flex space-x-2 mb-4 mt-12">
          <button className="bg-white text-gray-700 px-4 py-2 rounded-full font-semibold border">
            주간 TOP<span className="text-red-500 ml-1">•</span>
          </button>
          <button className="bg-white text-gray-700 px-4 py-2 rounded-full font-semibold border">
            내가쓴 인기글
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 ">
          {[1].map((categoryId) => (
            <div key={categoryId} className="">
              <PostList
                categoryId={categoryId}
                perPage={5}
                showPagination={false}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
          {[2, 11, 3, 4, 7, 5, 10, 6].map((categoryId) => (
            <div key={categoryId} className="">
              <PostList
                categoryId={categoryId}
                perPage={5}
                showPagination={false}
              />
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
