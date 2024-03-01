import React from "react";

const Cards = ({
  data,
  handleEditToggle,
  handleDeleteToggle,
  handleDragStart,
  handleDragOver,
  handleDrop,
}) => {
  const { task_name, task_description } = data;
  return (
    <div
      className="relative card w-64 h-64 p-2 my-4 border-2 border-black rounded-xl cursor-pointer"
      draggable
      onDragStart={(e) => handleDragStart(e, data.id)}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, data.id)}
    >
      <p>{task_description}</p>
      <div className="absolute left-0 bottom-[-2px] w-full h-10 bg-black rounded-b-xl">
        <p className="text-white p-2 font-medium text-wrap break-normal">
          {task_name}
        </p>
      </div>
      <div className="absolute w-20 btn-panel hidden rounded-tr-xl h-10 top-0 right-0 bg-gray-50">
        <div className="mt-2 flex flex-row gap-2 justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            onClick={() => handleEditToggle(data)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            onClick={() => handleDeleteToggle(data._id)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Cards;
