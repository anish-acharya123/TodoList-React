import React, { useEffect, useState } from "react";
import todo from "../image/todo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//to get the data from Ls
const getLocalItems = () => {
  let list = localStorage.getItem("Lists");
  if (list) {
    return JSON.parse(localStorage.getItem("Lists")); //conveting data in array form
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [editItem, setEditItem] = useState(null);

  //adding new data with proper id
  const addItem = () => {
    if (inputData && toggleSubmit) {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
      toast.success("Sucessfully Added", {
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
      });
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === editItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setInputData("");
      setEditItem(null);
    } else {
      toast.warn("sorry! Please Enter Something", {
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
      });
    }
  };

  //remove each item
  const removeItems = (id) => {
    const updateItems = items.filter((elem) => {
      return elem.id != id;
    });
    setItems(updateItems);
  };

  //remove all iteam  at once
  const removeAll = () => {
    setItems([]);
  };

  //add data to local storage
  useEffect(() => {
    localStorage.setItem("Lists", JSON.stringify(items));
  }, [items]);

  //edit items
  const editItems = (id) => {
    let newEditItems = items.find((elem) => {
      return elem.id === id;
    });
    setToggleSubmit(false);
    setInputData(newEditItems.name);
    setEditItem(id);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="" />
            <figcaption>Add Your List Here 🙋‍♂️</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="📝 
            Add Items"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />

            {toggleSubmit ? (
              <i
                className="fa fa-plus add-btn"
                title="Add Items"
                onClick={addItem}
              ></i>
            ) : (
              <i
                className="far fa-edit add-btn"
                title="Edit Items"
                onClick={addItem}
              ></i>
            )}
          </div>
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      title="Edit Items"
                      onClick={() => editItems(curElem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      title="Remove Items"
                      onClick={() => removeItems(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={() => removeAll()}
            >
              {" "}
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Todo;
