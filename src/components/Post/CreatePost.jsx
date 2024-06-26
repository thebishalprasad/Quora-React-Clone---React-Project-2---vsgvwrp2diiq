import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { Dialog, DialogHeader, Tabs, TabsHeader, TabsBody, Tab, TabPanel, Input, Textarea } from "@material-tailwind/react";
import { POST_API, PROJECT_ID } from "../Utils/Constant";

export default function CreatePost() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImage] = useState(null);

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const createPost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("images", images);
    formData.append("title", title);
    formData.append("content", content);

    try {
      const response = await axios.post(POST_API, formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'projectID': PROJECT_ID,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      toast.success('Post created successfully');
      window.location.reload();
      setShow(false);
    } catch (error) {
      console.error('There was an error creating the post!', error);
      toast.error('There was an error creating the post!');
    }
  };

  const data = [
    {
      label: "Add Question",
      value: "Add Question",
      desc: (
        <form onSubmit={createPost} className="w-full max-w-[600px] bg-white dark:bg-gray-900 rounded-lg py-6 px-3 sm:px-6 flex flex-col items-start gap-2">
          <div className="w-full h-1 bg-blue-600 rounded-t"></div>
          <div className="p-3 w-full bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-md text-sm sm:text-base">
            <div className="font-bold">
              Tips on getting good answers quickly
            </div>
            <ul className="list-disc list-inside">
              <li>Make sure your question has not been asked already</li>
              <li>Keep your question short and to the point</li>
              <li>Double-check grammar and spelling</li>
            </ul>
          </div>

          <label htmlFor="post-title" className="font-semibold">
            Post Title <span className="font-normal">(required)</span>:
          </label>
          <Input
            id="post-title"
            placeholder="Enter The Question or Title"
            className="w-full border border-gray-300 dark:border-gray-700 p-2 focus:border-blue-600 dark:focus:border-blue-600 transition duration-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="post-content" className="font-semibold">
            Post Description:
          </label>
          <Textarea
            id="post-content"
            placeholder="Enter Description or Answer"
            className="w-full border border-gray-300 dark:border-gray-700 p-2 focus:border-blue-600 dark:focus:border-blue-600 transition duration-300"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="w-full flex justify-between items-center px-6 py-4">
            <button
              type="button"
              onClick={closeModal}
              className="bg-red-900 hover:bg-blue-700 text-white text-sm sm:text-base font-medium py-2 px-4 rounded-full transition duration-300"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium py-2 px-4 rounded-full transition duration-300"
            >
              Add Question
            </button>
          </div>
        </form>
      ),
    },
    {
      label: "Create Post",
      value: "Create Post",
      desc: (
        <form onSubmit={createPost} className="w-full h-max text-gray-700 p-4 antialiased font-sans text-base font-light leading-relaxed">
          <div className="text-lg font-semibold mx-auto text-center">
            Create Post
          </div>
          <div className="relative w-full min-w-[200px]">
            <Textarea
              rows="2"
              placeholder="Give a title..."
              className="w-full h-full min-h-[100px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 resize-y disabled:bg-blue-gray-50 disabled:border-0 disabled:resize-none disabled:cursor-not-allowed transition-all border-b placeholder-shown:border-blue-gray-200 text-sm pt-4 pb-1.5 mt-1.5 border-blue-gray-200 focus:border-gray-900"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="relative w-full min-w-[200px]">
            <Textarea
              rows="8"
              placeholder="Say something..."
              className="w-full h-full min-h-[100px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 resize-y disabled:bg-blue-gray-50 disabled:border-0 disabled:resize-none disabled:cursor-not-allowed transition-all border-b placeholder-shown:border-blue-gray-200 text-sm pt-4 pb-1.5 mt-1.5 border-blue-gray-200 focus:border-gray-900"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="post-image" className="font-semibold">
              Upload Image:
            </label>
            <input
              id="post-image"
              type="file"
              className="border border-gray-300 p-2 mt-2"
              onChange={handleImageChange}
            />
          </div>
          <div className="w-full flex justify-center mt-5 ">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium py-2 px-4 rounded-full transition duration-300">
              Post
            </button>
          </div>
        </form>
      ),
    },
  ];

  return (
    <div>
      <h1 onClick={openModal} className="cursor-pointer">Post</h1>
      <Dialog open={show} handler={closeModal} size="sm">
        <DialogHeader>
          <Tabs value="Create Post">
            <TabsHeader className="bg-blue-500">
              {data.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              {data.map(({ value, desc }) => (
                <TabPanel key={value} value={value}>
                  {desc}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </DialogHeader>
      </Dialog>
    </div>
  );
}
