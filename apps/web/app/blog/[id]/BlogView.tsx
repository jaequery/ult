"use client";

export default function Blog() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col text-center justify-center px-6 py-12 lg:px-8">
        <div>
          {/* Blog Article */}
          <div className="max-w-6xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
            <div className="max-w-full">
              {/* Avatar Media */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex w-full sm:items-center gap-x-5 sm:gap-x-3">
                  <div className="flex-shrink-0">
                    <img
                      className="size-12 rounded-full"
                      src="https://images.unsplash.com/photo-1669837401587-f9a4cfe3126e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                      alt="Image Description"
                    />
                  </div>
                  <div className="grow">
                    <div className="flex justify-between items-center gap-x-2">
                      <div>
                        {/* Tooltip */}
                        <div className="hs-tooltip inline-block [--trigger:hover] [--placement:bottom]">
                          <div className="hs-tooltip-toggle sm:mb-1 block text-start cursor-pointer">
                            <span className="font-semibold text-gray-800 dark:text-gray-200">
                              Leyla Ludic
                            </span>
                            {/* Dropdown Card */}
                            <div
                              className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 max-w-xs cursor-default bg-gray-900 divide-y divide-gray-700 shadow-lg rounded-xl dark:bg-black"
                              role="tooltip"
                            >
                              {/* Body */}
                              <div className="p-4 sm:p-5">
                                <div className="mb-2 flex w-full sm:items-center gap-x-5 sm:gap-x-3">
                                  <div className="flex-shrink-0">
                                    <img
                                      className="size-8 rounded-full"
                                      src="https://images.unsplash.com/photo-1669837401587-f9a4cfe3126e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                                      alt="Image Description"
                                    />
                                  </div>
                                  <div className="grow">
                                    <p className="text-lg font-semibold text-gray-200">
                                      Leyla Ludic
                                    </p>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-400">
                                  Leyla is a Customer Success Specialist at
                                  Preline and spends her time speaking to
                                  in-house recruiters all over the world.
                                </p>
                              </div>
                              {/* End Body */}
                              {/* Footer */}
                              <div className="flex justify-between items-center px-4 py-3 sm:px-5">
                                <ul className="text-xs space-x-3">
                                  <li className="inline-block">
                                    <span className="font-semibold text-gray-200">
                                      56
                                    </span>
                                    <span className="text-gray-400">
                                      articles
                                    </span>
                                  </li>
                                  <li className="inline-block">
                                    <span className="font-semibold text-gray-200">
                                      1k+
                                    </span>
                                    <span className="text-gray-400">
                                      followers
                                    </span>
                                  </li>
                                </ul>
                                <div>
                                  <button
                                    type="button"
                                    className="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                  >
                                    <svg
                                      className="flex-shrink-0 size-3.5"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width={16}
                                      height={16}
                                      fill="currentColor"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                      <path
                                        fillRule="evenodd"
                                        d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                                      />
                                    </svg>
                                    Follow
                                  </button>
                                </div>
                              </div>
                              {/* End Footer */}
                            </div>
                            {/* End Dropdown Card */}
                          </div>
                        </div>
                        {/* End Tooltip */}
                        <ul className="text-xs text-gray-500">
                          <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
                            Jan 18
                          </li>
                          <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600">
                            8 min read
                          </li>
                        </ul>
                      </div>
                      {/* Button Group */}
                      <div>
                        <button
                          type="button"
                          className="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        >
                          <svg
                            className="size-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                          </svg>
                          Tweet
                        </button>
                      </div>
                      {/* End Button Group */}
                    </div>
                  </div>
                </div>
              </div>
              {/* End Avatar Media */}
              {/* Content */}
              <div className="space-y-5 md:space-y-8">
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold md:text-3xl dark:text-white">
                    Announcing a free plan for small teams
                  </h2>
                  <p className="text-lg text-gray-800 dark:text-gray-200">
                    At preline, our mission has always been focused on bringing
                    openness and transparency to the design process. We've
                    always believed that by providing a space where designers
                    can share ongoing work not only empowers them to make better
                    products, it also helps them grow.
                  </p>
                </div>
                <p className="text-lg text-gray-800 dark:text-gray-200">
                  We're proud to be a part of creating a more open culture and
                  to continue building a product that supports this vision.
                </p>
                <figure>
                  <img
                    className="w-full object-cover rounded-xl"
                    src="https://images.unsplash.com/photo-1670272505340-d906d8d77d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    alt="Image Description"
                  />
                  <figcaption className="mt-3 text-sm text-center text-gray-500">
                    A woman sitting at a table.
                  </figcaption>
                </figure>
                <p className="text-lg text-gray-800 dark:text-gray-200">
                  As we've grown, we've seen how Preline has helped companies
                  such as Spotify, Microsoft, Airbnb, Facebook, and Intercom
                  bring their designers closer together to create amazing
                  things. We've also learned that when the culture of sharing is
                  brought in earlier, the better teams adapt and communicate
                  with one another.
                </p>
                <p className="text-lg text-gray-800 dark:text-gray-200">
                  That's why we are excited to share that we now have a{" "}
                  <a
                    className="text-blue-600 decoration-2 hover:underline font-medium"
                    href="#"
                  >
                    free version of Preline
                  </a>
                  , which will allow individual designers, startups and other
                  small teams a chance to create a culture of openness early on.
                </p>
                <blockquote className="text-center p-4 sm:px-7">
                  <p className="text-xl font-medium text-gray-800 md:text-2xl md:leading-normal xl:text-2xl xl:leading-normal dark:text-gray-200">
                    To say that switching to Preline has been life-changing is
                    an understatement. My business has tripled and I got my life
                    back.
                  </p>
                  <p className="mt-5 text-gray-800 dark:text-gray-200">
                    Nicole Grazioso
                  </p>
                </blockquote>
                <figure>
                  <img
                    className="w-full object-cover rounded-xl"
                    src="https://images.unsplash.com/photo-1670272498380-eb330b61f3cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    alt="Image Description"
                  />
                  <figcaption className="mt-3 text-sm text-center text-gray-500">
                    A man and a woman looking at a cell phone.
                  </figcaption>
                </figure>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold dark:text-white">
                    Bringing the culture of sharing to everyone
                  </h3>
                  <p className="text-lg text-gray-800 dark:text-gray-200">
                    We know the power of sharing is real, and we want to create
                    an opportunity for everyone to try Preline and explore how
                    transformative open communication can be. Now you can have a
                    team of one or two designers and unlimited spectators (think
                    PMs, management, marketing, etc.) share work and explore the
                    design process earlier.
                  </p>
                </div>
                <ul className="list-disc list-outside space-y-5 ps-5 text-lg text-gray-800 dark:text-gray-200">
                  <li className="ps-2">
                    Preline allows us to collaborate in real time and is a
                    really great way for leadership on the team to stay
                    up-to-date with what everybody is working on,"{" "}
                    <a
                      className="text-blue-600 decoration-2 hover:underline font-medium"
                      href="#"
                    >
                      said
                    </a>{" "}
                    Stewart Scott-Curran, Intercom's Director of Brand Design.
                  </li>
                  <li className="ps-2">
                    Preline opened a new way of sharing. It's a persistent way
                    for everyone to see and absorb each other's work," said
                    David Scott, Creative Director at{" "}
                    <a
                      className="text-blue-600 decoration-2 hover:underline font-medium"
                      href="#"
                    >
                      Eventbrite
                    </a>
                    .
                  </li>
                </ul>
                <p className="text-lg text-gray-800 dark:text-gray-200">
                  Small teams and individual designers need a space where they
                  can watch the design process unfold, both for themselves and
                  for the people they work with – no matter if it's a fellow
                  designer, product manager, developer or client. Preline allows
                  you to invite more people into the process, creating a central
                  place for conversation around design. As those teams grow,
                  transparency and collaboration becomes integrated in how they
                  communicate and work together.
                </p>
                <div>
                  <a
                    className="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="#"
                  >
                    Plan
                  </a>
                  <a
                    className="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="#"
                  >
                    Web development
                  </a>
                  <a
                    className="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="#"
                  >
                    Free
                  </a>
                  <a
                    className="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="#"
                  >
                    Team
                  </a>
                </div>
              </div>
              {/* End Content */}
            </div>
          </div>
          {/* End Blog Article */}
          {/* Sticky Share Group */}
          <div className="sticky bottom-6 inset-x-0 text-center">
            <div className="inline-block bg-white shadow-md rounded-full py-3 px-4 dark:bg-gray-800">
              <div className="flex items-center gap-x-1.5">
                {/* Button */}
                <div className="hs-tooltip inline-block">
                  <button
                    type="button"
                    className="hs-tooltip-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                    875
                    <span
                      className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-black"
                      role="tooltip"
                    >
                      Like
                    </span>
                  </button>
                </div>
                {/* Button */}
                <div className="block h-3 border-e border-gray-300 mx-3 dark:border-gray-600" />
                {/* Button */}
                <div className="hs-tooltip inline-block">
                  <button
                    type="button"
                    className="hs-tooltip-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                    </svg>
                    16
                    <span
                      className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-black"
                      role="tooltip"
                    >
                      Comment
                    </span>
                  </button>
                </div>
                {/* Button */}
                <div className="block h-3 border-e border-gray-300 mx-3 dark:border-gray-600" />
                {/* Button */}
                <div className="hs-dropdown relative inline-flex">
                  <button
                    type="button"
                    id="blog-article-share-dropdown"
                    className="hs-dropdown-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <polyline points="16 6 12 2 8 6" />
                      <line x1={12} x2={12} y1={2} y2={15} />
                    </svg>
                    Share
                  </button>
                  <div
                    className="hs-dropdown-menu w-56 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mb-1 z-10 bg-gray-900 shadow-md rounded-xl p-2 dark:bg-black"
                    aria-labelledby="blog-article-share-dropdown"
                  >
                    <a
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-400 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      href="#"
                    >
                      <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                      Copy link
                    </a>
                    <div className="border-t border-gray-600 my-2" />
                    <a
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-400 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      href="#"
                    >
                      <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                      </svg>
                      Share on Twitter
                    </a>
                    <a
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-400 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      href="#"
                    >
                      <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                      </svg>
                      Share on Facebook
                    </a>
                    <a
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-400 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      href="#"
                    >
                      <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                      </svg>
                      Share on LinkedIn
                    </a>
                  </div>
                </div>
                {/* Button */}
              </div>
            </div>
          </div>
          {/* End Sticky Share Group */}
        </div>
      </div>
    </>
  );
}
