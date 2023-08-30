"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { BlogItemType } from "@/lib/types";
import { toast } from "react-hot-toast";
import BlogItem from "../components/BlogItem";
import axios from "axios";
const Search = () => {
  const [blogs, setBlogs] = useState<BlogItemType[]>([]);
  const { handleSubmit, register } = useForm();
  const handleSearch = async ({ search }: { search: string }) => {
    let str = search;
    if (search.includes(" ")) {
      str = search.split(" ").join("%20");
    }
    toast.loading("Searching", { id: "SEARCH" });
    try {
      const res = await axios.get(
        `http://localhost:3000/api/blogs/search?title=${str}`
      );
      const data = await res.data;
      setBlogs(data.blogs);
      toast.success("Fetched Successfully", { id: "SEARCH" });
    } catch (err) {
      toast.error("Fetching Failed", { id: "SEARCH" });
    }
  };
  return (
    <section className="w-full h-full">
      <h2 className="text-3xl text-center font-bold font-serif">
        Search From The Amazing Blogs
      </h2>
      <div className=" md:w-2/4 xs:w-3/4 mx-auto flex items-center justify-between bg-slate-100 my-4 px-6 py-4 rounded-xl text-gray-900 font- ">
        <input
          type="text"
          className="bg-transparent border-none outline-none p-1 w-full"
          {...register("search", { required: true })}
        />
        <FaSearch
          //@ts-ignore
          onClick={handleSubmit(handleSearch)}
          size={40}
          className="hover:bg-slate-300 p-2 rounded-full cursor-pointer"
        />
      </div>
      <div className="flex flex-wrap">
        {blogs?.map((blog) => (
          <BlogItem {...blog} key={blog.id} />
        ))}
      </div>
    </section>
  );
};

export default Search;
