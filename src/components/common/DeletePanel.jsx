import React from "react";
import { baseUrl } from "../../constants";
import toast from "react-hot-toast";

const DeletePanel = ({ id, handleClose }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(baseUrl + `/tasks/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = response.json();
      if (res.success) {
        toast.success("Deleted Successfully");
      } else {
        toast.error("Not Found");
      }
      handleClose();
    } catch (error) {
      toast.error("Failed!!");
    }
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        {/* <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div> */}

        <div className="bg-white p-6 rounded-lg shadow-xl w-80">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Are you sure to delete</h2>
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={handleClose}
              >
                <path
                  fill-rule="evenodd"
                  d="M3.293 3.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="mr-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-500 focus:outline-none cursor-pointer"
              onClick={handleDelete}
            >
              Yes
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none cursor-pointer"
              onClick={handleClose}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePanel;
