import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import PlusIcon from "./common/PlusIcon";
import AddTask from "./AddTask";
import CloseIcon from "../components/common/CloseIcon";
import { baseUrl } from "../constants";
import DeletePanel from "./common/DeletePanel";

const Body = () => {
  const [toogleTask, setToggleTask] = useState(false);
  const [toggleDelete, setToggleDelete] = useState("");
  const [editData, setEditData] = useState();
  const [todoData, setTodoData] = useState();
  const [inprogressData, setInprogressData] = useState();
  const [doneData, setDoneData] = useState();

  const addTask = () => setToggleTask(true);

  const handleClose = () => {
    setToggleTask(false);
    getTasks();
  };

  const handleDeleteClose = () => {
    setToggleDelete("");
    getTasks();
  };

  const getTasks = async () => {
    try {
      const response = await fetch(baseUrl + "/tasks");
      const res = await response.json();
      if (res.success) {
        const todo = res.data.filter((item) => item.status === "todo");
        const inprogress = res.data.filter(
          (item) => item.status === "inprogress"
        );
        const done = res.data.filter((item) => item.status === "done");
        setTodoData(todo);
        setInprogressData(inprogress);
        setDoneData(done);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditToggle = (params) => {
    setToggleTask(true);
    setEditData(params);
  };

  const handleDeleteToggle = (id) => {
    setToggleDelete(id);
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const draggedTaskId = e.dataTransfer.getData("taskId");
    // const updatedTasks = tasks.map((task) => {
    //   if (task.id === Number(draggedTaskId)) {
    //     task.id = targetId;
    //   }
    //   return task;
    // });
    // setTasks(updatedTasks);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="relative h-screen bg-gray-200">
      <div className="pt-4 z-0 flex flex-col items-center justify-center bg-cover bg-center bg-blur backdrop-blur-3">
        <h1 className="my-4 text-3xl font-bold">Task List</h1>
        <div className="w-8/12 flex gap-5 justify-center">
          <div className="">
            <div className="flex justify-between">
              <div className="my-2 bg-red-300 w-24 p-2 rounded-full flex items-center gap-2">
                <div className="w-4 flex justify-center items-center h-4 p-2 bg-red-500 rounded-full"></div>
                <h1>Todo</h1>
              </div>
              <div
                className="flex items-center pr-2 cursor-pointer"
                onClick={addTask}
              >
                <PlusIcon />
              </div>
            </div>
            {todoData?.map((items) => (
              <Cards
                data={items}
                row={"todo"}
                handleEditToggle={handleEditToggle}
                handleDeleteToggle={handleDeleteToggle}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
              />
            ))}
          </div>
          <div className="">
            <div className="flex justify-between">
              <div className="my-2 bg-blue-300 w-32 p-2 rounded-full flex items-center gap-2">
                <div className="w-4 flex justify-center items-center h-4 p-2 bg-blue-500 rounded-full"></div>
                <h1>In progress</h1>
              </div>
              <div
                className="flex items-center pr-2 cursor-pointer"
                onClick={addTask}
              >
                <PlusIcon />
              </div>
            </div>
            {inprogressData?.map((items) => (
              <Cards
                data={items}
                row={"inprogress"}
                handleEditToggle={handleEditToggle}
                handleDeleteToggle={handleDeleteToggle}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
              />
            ))}
          </div>
          <div className="">
            <div className="flex justify-between">
              <div className="my-2 bg-green-300 w-24 p-2 rounded-full flex items-center gap-2">
                <div className="w-4 flex justify-center items-center h-4 p-2 bg-green-500 rounded-full"></div>
                <h1>Done</h1>
              </div>
              <div
                className="flex items-center pr-2 cursor-pointer"
                onClick={addTask}
              >
                <PlusIcon />
              </div>
            </div>
            {doneData?.map((items) => (
              <Cards
                data={items}
                row={"done"}
                handleEditToggle={handleEditToggle}
                handleDeleteToggle={handleDeleteToggle}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
              />
            ))}
          </div>
        </div>
      </div>
      {toogleTask && <AddTask editData={editData} handleClose={handleClose} />}
      {toggleDelete && (
        <DeletePanel id={toggleDelete} handleClose={handleDeleteClose} />
      )}
    </div>
  );
};

export default Body;
