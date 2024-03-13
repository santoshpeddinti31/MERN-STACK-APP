import { useEffect, useState } from "react";

import axios from "axios";

const TodoPage = () => {
  const [todo, setTodo] = useState(null);

  const [createForm, setCreateForm] = useState({
    taskname: "",
    taskdesc: "",
  });

  const [updateForm, setUpdateForm] = useState({
    _id: null,
    taskname: "",
    taskdesc: "",
  });

  //use effect
  useEffect(() => {
    fetchTodos();
  }, []);

  //get request
  const fetchTodos = async () => {
    const res = await axios.get("/todos");
    setTodo(res.data.todos);
  };

  //update the createformfield

  const UpdateCreateFormField = (e) => {
    const { name, value } = e.target;

    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };

  //create the request
  const createTodo = async (e) => {
    e.preventDefault();

    const res = await axios.post("/todos", createForm);

    setTodo([...todo, res.data.todo]);

    setCreateForm({
      taskname: "",
      taskdesc: "",
    });
  };

  //deleteTodo
  const deleteTodo = async (_id) => {
    await axios.delete(`/todos/${_id}`);

    const newTodos = [...todo].filter((item) => {
      return item._id !== _id;
    });

    setTodo(newTodos);
  };

  //update the formfield
  const handleUpdateFieldChange = (e) => {
    const { value, name } = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  //toggle update

  const toggleUpdate = (list) => {
    setUpdateForm({
      taskname: list.taskname,
      taskdesc: list.taskdesc,
      _id: list._id,
    });
  };

  //update state
  const updateTodo = async (e) => {
    e.preventDefault();

    const { taskname, taskdesc } = updateForm;

    //send the update request
    const res = await axios.put(`/todos/${updateForm._id}`, {
      taskname,
      taskdesc,
    });

    //update state
    const newTodos = [...todo];
    const noteIndex = todo.findIndex((item) => {
      return item._id === updateForm._id;
    });

    newTodos[noteIndex] = res.data.todo;

    setTodo(newTodos);

    //clear update form state
    setUpdateForm({
      _id: null,
      taskname: "",
      taskdesc: "",
    });
  };

  return (
    <>
      <div className="flex flex-col  md:flex-row items-center justify-evenly mx-12 mt-5 gap-12 md:gap-0  ">
        <div>
          {updateForm._id && (
            <div className=" w-72 p-12 shadow-xl mt-16">
              <h2 className="text-center p-3 font-semibold text-orange-500 text-xl">
                Update Todo
              </h2>
              <form onSubmit={updateTodo}>
                <input
                  className="px-2 py-1 mb-4 rounded-md outline-none hover:outline-orange-300 text-sm w-full"
                  onChange={handleUpdateFieldChange}
                  value={updateForm.taskname}
                  name="taskname"
                />
                <input
                  className="px-2 py-1  rounded-md outline-none hover:outline-orange-300 mb-5 text-sm w-full"
                  onChange={handleUpdateFieldChange}
                  value={updateForm.taskdesc}
                  name="taskdesc"
                />
                <button
                  className="bg-orange-400 px-2 py-1 rounded-sm text-sm font-thin shadow-xl text-white"
                  type="submit"
                >
                  Update Todo
                </button>
              </form>
            </div>
          )}

          {!updateForm._id && (
            <div className=" w-72 p-12 shadow-xl mt-16">
              <h2 className="text-center p-3 font-semibold text-purple-500 text-xl">
                Create Todo
              </h2>
              <form onSubmit={createTodo}>
                <input
                  className="px-2 py-1 mb-4 rounded-md outline-none hover:outline-purple-300 text-sm w-full"
                  onChange={UpdateCreateFormField}
                  value={createForm.taskname}
                  name="taskname"
                  placeholder="Enter your task name"
                />
                <input
                  className="px-2 py-1  rounded-md outline-none hover:outline-purple-300 mb-5 text-sm w-full"
                  onChange={UpdateCreateFormField}
                  value={createForm.taskdesc}
                  name="taskdesc"
                  placeholder="Enter your task description"
                />
                <button
                  className="bg-purple-400 px-2 py-1 rounded-sm text-sm font-thin shadow-lg text-white"
                  type="submit"
                >
                  Create Todo
                </button>
              </form>
            </div>
          )}
        </div>
        <div className="bg-slate-200 h-96 w-96 p-6 shadow-lg  overflow-y-scroll [&::-webkit-scrollbar]:hidden">
          <h2 className="text-xl font-semibold border-b-2 border-purple-600 mb-3 -top-7 sticky bg-slate-200 ">
            TODO'S
          </h2>
          {todo &&
            todo.map((list) => {
              return (
                <div className="border-b border-gray-500" key={list._id}>
                  <p className="w-full p-1 text-lg ">{list.taskname}</p>
                  <p className="w-full p-1 text-lg ">{list.taskdesc}</p>
                  <button
                    className="bg-red-300 px-3 mb-2  mr-2 "
                    onClick={() => deleteTodo(list._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-orange-500  px-3"
                    onClick={() => toggleUpdate(list)}
                  >
                    Update
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default TodoPage;
