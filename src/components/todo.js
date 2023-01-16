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
  const addItem = () => {
    if (inputData) {
      setItems([...items, inputData]);
      setInputData("");
      toast.success("Sucessfully Added", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    } else {
      toast.warn("sorry! Please Enter Something", {
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
      });
    }
  };

  const removeItems = (id) => {
    const updateItems = items.filter((elem, ind) => {
      return ind != id;
    });
    setItems(updateItems);
  };

  const removeAll = () => {
    setItems([]);
  };

  //add data to local storage
  useEffect(() => {
    localStorage.setItem("Lists", JSON.stringify(items));
  }, [items]);
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
            <i
              className="fa fa-plus add-btn"
              title="Add Items"
              onClick={addItem}
            ></i>
          </div>
          <div className="showItems">
            {items.map((curElem, id) => {
              return (
                <div className="eachItem" key={id}>
                  <h3>{curElem}</h3>
                  <i
                    className="far fa-trash-alt add-btn"
                    title="Remove Items"
                    onClick={() => removeItems(id)}
                  ></i>
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
