"use client";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { toast } from "react-hot-toast";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { BlogItemType } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
const getBlogById = async (id: string) => {
  const res = await axios.get(`http://localhost:3000/api/blogs/${id}`, {});
  const data = await res.data;
  return data.blog;
};

const updateBlog = async (id: string, postData: any) => {
  const res = await axios.get(`http://localhost:3000/api/blogs/${id}`, {
    ...postData,
  });
  const data = await res.data;
  return data.blog;
};

const EditBlog = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isLoading, setIsLoading] = useState(false);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    setIsLoading(true);
    toast.loading("Updating Blog Details", { id: "loading" });
    getBlogById(params.id)
      .then((data: BlogItemType) => {
        const contentBlocks = convertFromHTML(data.description);
        const contentState = ContentState.createFromBlockArray(
          contentBlocks.contentBlocks
        );
        const initialState = EditorState.createWithContent(contentState);
        setEditorState(initialState);
        if (headingRef && headingRef.current)
          headingRef.current.innerText = data.title;
        setIsLoading(false);
        toast.success("Blog Details Added Successfully", { id: "loading" });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error updating", { id: "loading" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const convertEditorDataToHTML = () => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };
  const handleEditorStateChange = (e: any) => {
    setEditorState(e);
  };
  const handlePost = async () => {
    const postData = {
      title: headingRef.current?.innerText,
      description: convertEditorDataToHTML(),
    };

    try {
      toast.loading("Updating Your Blog Post", { id: "postUpdate" });
      await updateBlog(params.id, postData);
      toast.success("Updated Successfully", { id: "postUpdate" });
    } catch (err) {
      toast.error("Sending Failed", { id: "postUpdate" });
      return console.log(err);
    }
  };
  return (
    <section className="w-full">
      <div className="flex justify-between p-4 items-center">
        <div className="w-1/4">
          <span className=" font-extrabold mx-3">Author:</span>
          <span className=" uppercase font-semibold">
            {session?.user?.name}
          </span>
        </div>
        <button
          onClick={handlePost}
          className="bg-violet-600 text-white  px-6 focus:ring-violet-950 py-3 rounded-2xl font-bold shadow-xl hover:bg-violet-700"
        >
          Publish
        </button>
      </div>
      {isLoading && (
        <p>
          <Skeleton className="w-[300px] h-[50px] rounded-lg mx-auto" />
        </p>
      )}
      <h1
        ref={headingRef}
        contentEditable={true}
        className="outline-none border-none font-serif mx-auto p-4 text-2xl text-center font-semibold w-full h-28 focus:border-none"
      ></h1>

      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorStateChange}
        editorStyle={{
          minHeight: "50vh",
          height: "auto",
          border: "1px solid #000",
          padding: 10,
        }}
      />
    </section>
  );
};

export default EditBlog;
