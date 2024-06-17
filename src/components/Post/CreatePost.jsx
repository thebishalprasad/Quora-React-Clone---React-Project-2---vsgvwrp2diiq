import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Dialog, DialogHeader, Input, Textarea
} from "@material-tailwind/react";
import { PROJECT_ID } from "../Utils/constant";
export default function CreatePost() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);
  const createPost = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content);
    try {
      const response = await axios.post(
        'https://academics.newtonschool.co/api/v1/quora/post/',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'projectID': PROJECT_ID,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      toast.success('Post created successfully');
      // console.log(response);
      setShow(false);
      window.location.reload();
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
        <div className="w-full max-w-[600px] bg-white dark:bg-gray-900 rounded-lg py-6 px-3 sm:px-6 flex flex-col items-start gap-2">
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
          <label Add QuestionFor="post-title" className="font-semibold">
            Post Title <span className="font-normal">(required)</span>:
          </label>
          <Input
            id="post-title"
            placeholder="Enter The Question or Title"
            className="w-full border border-gray-300 dark:border-gray-700 p-2 focus:border-blue-600 dark:focus:border-blue-600 transition duration-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label Add QuestionFor="post-content" className="font-semibold">
            Post Description :
          </label>
          <Textarea
            id="post-content"
            placeholder="Enter Description or Answer"
            className="w-full border border-gray-300 dark:border-gray-700 p-2 focus:border-blue-600 dark:focus:border-blue-600 transition duration-300"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="w-full flex justify-between items-center px-6 py-4">
            <div className="flex gap-4 items-center">
              <h1
                onClick={closeModal}
                variant="text"
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
              >
                Close
              </h1>
              <h1
                className="hidden sm:block bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium py-2 px-4 rounded-full transition duration-300"
                onClick={createPost}
              >
                Add Post
              </h1>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Create Post",
      value: "react",
      desc: (
        <div
        role="tabpanel"
        className="w-full h-max text-gray-700 p-4 antialiased font-sans text-base font-light leading-relaxed"
        data-value="post"
        data-projection-id="71"
        style={{ opacity: 1, position: 'relative', top: 'auto', left: 'auto', zIndex: 2 }}
      >
        {/* <div
          className="rounded-full text-background-primary flex items-center justify-center cursor-pointer shrink-0"
          style={{ width: '48px', height: '48px', fontSize: '24px' }}
        >
          ?
        </div> */}
        <div className="text-lg font-semibold mx-auto text-center">
          Create Post
        </div>
        <form>
          <div className="relative w-full min-w-[200px]">
            <textarea
              rows="2"
              placeholder="Give a title..."
              className="peer w-full h-full min-h-[100px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 resize-y disabled:bg-blue-gray-50 disabled:border-0 disabled:resize-none disabled:cursor-not-allowed transition-all border-b placeholder-shown:border-blue-gray-200 text-sm pt-4 pb-1.5 mt-1.5 border-blue-gray-200 focus:border-gray-900"
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] after:content-[' '] after:block after:w-full after:absolute after:-bottom-0 left-0 after:border-b-2 after:scale-x-0 peer-focus:after:scale-x-100 after:transition-transform after:duration-300 peer-placeholder-shown:leading-[4.25] text-gray-500 peer-focus:text-gray-900 after:border-gray-500 peer-focus:after:!border-gray-900">
              {' '}
            </label>
          </div>
          <div className="relative w-full min-w-[200px]">
            <textarea
              rows="8"
              placeholder="Say something..."
              className="peer w-full h-full min-h-[100px] bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 resize-y disabled:bg-blue-gray-50 disabled:border-0 disabled:resize-none disabled:cursor-not-allowed transition-all border-b placeholder-shown:border-blue-gray-200 text-sm pt-4 pb-1.5 mt-1.5 border-blue-gray-200 focus:border-gray-900"
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] after:content-[' '] after:block after:w-full after:absolute after:-bottom-0 left-0 after:border-b-2 after:scale-x-0 peer-focus:after:scale-x-100 after:transition-transform after:duration-300 peer-placeholder-shown:leading-[4.25] text-gray-500 peer-focus:text-gray-900 after:border-gray-500 peer-focus:after:!border-gray-900">
              {' '}
            </label>
          </div>
          <div className="flex gap-2 justify-between flex-col sm:flex-row">
            <div className="relative w-full min-w-[200px] h-10">
              <input
                type="file"
                multiple
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder=" "
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content-[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content-[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                {' '}
              </label>
            </div>
            <button
              type="submit"
              // disabled
              className="align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none bg-blue-500 capitalize rounded-full"
            >
              Post
            </button>
          </div>
        </form>
      </div>
      ),
    },
  ];
  return (
    <div>
      <h1 onClick={openModal}>Add Question</h1>
      <Dialog open={show} handler={closeModal} size="sm">
        <DialogHeader>
          <Tabs value="Add Question" >
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