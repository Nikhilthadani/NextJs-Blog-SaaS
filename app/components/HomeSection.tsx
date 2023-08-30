"use client";
import Image from "next/image";
import BlogItem from "./BlogItem";
import { BlogItemType } from "@/lib/types";
import { useEffect, useState } from "react";
import axios from "axios";

const HomeSection = () => {
  const [blogs, setBlogs] = useState<BlogItemType[]>([]);
  useEffect(() => {
    axios
      .get("/api/blogs")
      .then(async (res) => await res.data)
      .then((data) => setBlogs(data.blogs));
  }, []);
  return (
    <section className="w-full my-4">
      <div className="w-full flex xs:flex-col md:flex-row justify-center items-center">
        <div className="p-8 w-3/4 flex flex-col gap-3">
          <p className="tracking-wide lg:text-6xl md:text-3xl xs:text-2xl font-semibold md:w-2/4 xs:4/4 text-start text-gray-700  ">
            Learn from the best, and become the best.
          </p>
          <p className="tracking my-2  md:text-2xl xs:text-md font-semibold md:w-3/4 xs:w-full text-start text-gray-900">
            Learn it by doing it for FREE with practical step by step Series and
            Articles
          </p>
        </div>
        <div className="md:w-2/4 xs:w-3/4 md:mx-2 xs:my-2">
          <Image
            className="w-full rounded-2xl drop-shadow-2xl"
            alt="CarouselImage"
            width={300}
            height={200}
            src={"https://images.unsplash.com/photo-1522071820081-009f0129c71c"}
          />
        </div>
      </div>
      <hr className="p-3 my-4" />
      <div className="flex flex-col justify-center items-center">
        <div className="p-4 ">
          <h2 className="text-2xl font-semibold ">Recent Articles</h2>
        </div>
        {blogs.length > 0 && (
          <div className="flex w-full flex-wrap justify-center">
            {blogs.slice(0, 6).map((blog: BlogItemType) => (
              <BlogItem {...blog} key={blog.id} />
            ))}
          </div>
        )}
        <div className="w-full p-4 text-center">
          <button className="mx-auto mt-auto border-[1px] p-3 rounded-lg hover:bg-violet-600 hover:text-violet-100 font-semibold duration-500">
            Explore More Articles
          </button>
        </div>
        <hr className="p-3 my-4 w-full" />
      </div>
    </section>
  );
};

export default HomeSection;
