import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "../components/common/CloseIcon";
import { baseUrl } from "../constants";
import { Toaster, toast } from "react-hot-toast";

const AddTask = ({ handleClose, editData }) => {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const todoRef = useRef(null);
  const inprogressRef = useRef(null);
  const doneRef = useRef(null);
  const [loading, setLoading] = useState();
  const [error, setError] = useState({
    title: false,
    description: false,
  });

  const validate = () => {
    if (!titleRef.current.value) {
      setError({ ...error, title: true });
      titleRef.current.focus();
      setTimeout(() => {
        setError({ ...error, title: false });
      }, 3000);
    } else if (!descRef.current.value) {
      setError({ ...error, description: true });
      descRef.current.focus();
      setTimeout(() => {
        setError({ ...error, description: false });
      }, 3000);
    } else {
      return true;
    }
  };

  const editTask = async () => {
    try {
      setLoading(true);
      const status = inprogressRef.current.checked
        ? "inprogress"
        : doneRef.current.checked
        ? "done"
        : "todo";

      const data = {
        task_name: titleRef.current.value,
        task_description: descRef.current.value,
        status: status,
      };
      const response = await fetch(
        `${baseUrl}` + `/tasks/update/${editData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const res = await response.json();
      if (res.success) {
        toast.success("Updated Task Successfully");
        setTimeout(() => {
          handleClose();
        }, 1000);
      } else {
        toast.error("Update failed!!");
      }
    } catch (error) {
      toast.error("Failed!", error);
      console.log("Error ", error);
    }
    setLoading(false);
  };

  const saveTask = async () => {
    try {
      if (validate()) {
        const status = inprogressRef.current.checked
          ? "inprogress"
          : doneRef.current.checked
          ? "done"
          : "todo";

        const data = {
          task_name: titleRef.current.value,
          task_description: descRef.current.value,
          status: status,
        };
        setLoading(true);
        const response = await fetch(`${baseUrl}` + "/tasks/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const res = await response.json();
        if (res.success) {
          toast.success("Task added Successfully");
          setTimeout(() => {
            handleClose();
          }, 1000);
        } else {
          toast.error("Failed.");
        }
        setLoading(false);
      }
    } catch (error) {
      toast.error("Failed.", error);
      console.log("Error ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editData._id) {
      titleRef.current.value = editData.task_name;
      descRef.current.value = editData.task_description;
      if (editData.status === "todo") {
        todoRef.current.checked = true;
      } else if (editData.status === "inprogress") {
        inprogressRef.current.checked = true;
      } else {
        doneRef.current.checked = true;
      }
    }
  }, []);

  console.log("editData ", editData, inprogressRef?.current?.checked);
  return (
    <div className="w-6/12 h-full transition ease-in-out delay-150 z-50 pt-10 p-4 absolute right-0 top-0 bg-gray-200">
      <div className="flex justify-between">
        <h1 className="text-2xl font-medium">
          {editData._id ? "Edit Task" : "New Task"}
        </h1>
        <CloseIcon onClick={handleClose} />
      </div>
      <input
        ref={titleRef}
        className={`my-2 bg-gray-200 text-4xl font-bold focus:outline-none focus:bg-gray-20 rounded-md py-2 px-4 block w-full sm:text-sm ${
          error?.title ? "border-2 border-red-500" : ""
        }`}
        type="text"
        placeholder="Untitled"
      />
      <textarea
        ref={descRef}
        cols="30"
        rows="10"
        className={`my-4 bg-gray-200 focus:outline-none focus:bg-gray-20 rounded-md py-2 px-4 block w-full sm:text-sm ${
          error?.description ? "border-2 border-red-500" : ""
        }`}
        type="text"
        placeholder="Please enter the description"
      ></textarea>

      <div className="mb-2 flex  flex-col gap-2">
        <p className="my-2">Status</p>
        <div className="flex gap-4">
          <input
            ref={todoRef}
            id="todo"
            type="radio"
            name="status"
            defaultChecked
          />
          <label className="text-gray-400" htmlFor="todo">
            Todo
          </label>
        </div>
        <div className="flex gap-4">
          <input
            ref={inprogressRef}
            id="inprogress"
            type="radio"
            name="status"
          />
          <label className="text-gray-400" htmlFor="inprogress">
            In Progress
          </label>
        </div>
        <div className="flex gap-4">
          <input ref={doneRef} id="done" type="radio" name="status" />
          <label className="text-gray-400" htmlFor="done">
            Done
          </label>
        </div>
      </div>
      <button
        className="bg-green-500 p-2 text-white rounded"
        onClick={editData._id ? editTask : saveTask}
      >
        {loading ? "loading..." : editData._id ? "Edit Task" : "Add Task"}
      </button>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default AddTask;
