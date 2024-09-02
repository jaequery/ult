"use client";

export default function Home() {
  return (
    <section className="px-4 py-24 mx-auto max-w-7xl">
      <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
        <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
          The{" "}
          <span className="block w-full text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500 lg:inline">
            Ult
          </span>{" "}
          framework
        </h1>
        <p className="px-0 mb-6 text-lg text-gray-600 md:text-xl lg:px-24">
          Ult is a framework that allows you to unleash your creativity and
          build amazing experiences for your customers.
        </p>
      </div>
    </section>
  );
}
