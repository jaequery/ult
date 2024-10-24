"use client";

import React from "react";

const posts = [
  {
    id: 1,
    title: "50% Off: Luxurious Spa Day Package with Massage and Facial",
    href: "#",
    description:
      "Indulge in a day of relaxation with our luxurious spa package, featuring a soothing massage and rejuvenating facial.",
    imageUrl:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    price: 40,
  },
  {
    id: 2,
    title: "Two-Hour Kayak Tour for Two: Explore Scenic Waterways (40% Off)",
    href: "#",
    description:
      "Embark on a scenic kayak adventure for two, perfect for nature lovers and outdoor enthusiasts.",
    imageUrl:
      "https://img.grouponcdn.com/deal/4VP1USjfXunziUakJporqx9CJ7Vr/4V-2048x1229/v1/t300x182.webp",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    price: 60,
  },
  {
    id: 3,
    title: "Paint and Sip Night: Create Your Masterpiece with 30% Off",
    href: "#",
    description:
      "Unleash your inner artist at our paint and sip night. Enjoy a fun evening of creativity and refreshments.",
    imageUrl:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    price: 35,
  },
  {
    id: 4,
    title: "Skydiving Adventure: Tandem Jump with Experienced Instructor (25% Off)",
    href: "#",
    description:
      "Experience the thrill of a lifetime with a tandem skydive, guided by our expert instructors.",
    imageUrl:
      "https://images.unsplash.com/photo-1521673461164-de300ebcfb17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    price: 200,
  },
  {
    id: 5,
    title: "Gourmet Dinner for Two: 3-Course Meal at Top-Rated Restaurant (35% Off)",
    href: "#",
    description:
      "Savor an exquisite 3-course meal for two at our award-winning restaurant. Perfect for a romantic evening.",
    imageUrl:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    price: 120,
  },
  {
    id: 6,
    title: "Laser Tag: 2 Hours of Unlimited Play for Up to 6 People (45% Off)",
    href: "#",
    description:
      "Gather your friends for an action-packed laser tag adventure. Two full hours of unlimited play!",
    imageUrl:
      "https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    price: 90,
  },
  {
    id: 7,
    title: "Hot Air Balloon Ride: Sunrise Tour with Champagne Breakfast (20% Off)",
    href: "#",
    description:
      "Float above the landscape in a majestic hot air balloon, followed by a delightful champagne breakfast.",
    imageUrl:
      "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    price: 250,
  },
  // More posts...
];

export default function BlogWithImages() {
  return (
    <div className="bg-white pt-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            커뮤니티 특별 혜택
          </h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col items-start justify-between"
            >
              <div className="relative w-full">
                <img
                  alt=""
                  src={post.imageUrl}
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="group relative">
                  <h3 className="mt-3 text-sm text-center text-gray-900 group-hover:text-orange-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-4 font-semibold text-center">${post.price}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}