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
  const [textArea, setTextarea] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [editItem, setEditItem] = useState(null);
  const [description, setDescription] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  //adding new data with proper id
  const addItem = () => {
    if (inputData && toggleSubmit) {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
        Description: textArea,
      };
      setItems([...items, allInputData]);
      setInputData("");
      setTextarea("");
      toast.success("Sucessfully Added", {
        position: "top-center",
        autoClose: 1000,
        theme: "dark",
      });
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === editItem) {
            return { ...elem, name: inputData, Description: textArea };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setInputData("");
      setTextarea("");
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
      return elem.id !== id;
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
    setTextarea(newEditItems.Description);
    setEditItem(id);
  };

  //select description
  const selectDescription = (ind) => {
    setActiveItem(ind);
    let DescriptionItems = items.find((elem) => {
      return elem.id === ind;
    });
    setDescription(DescriptionItems.Description);
  };

  const Blur = () => {
    if (activeItem === null) {
      return "";
    } else {
      return "blur";
    }
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="" />
            <figcaption>Add Your List Here 🙋‍♂️</figcaption>
          </figure>
          <div className={`addItems ${Blur()}`}>
            <div className="title-tag">
              <input
                type="text"
                placeholder="📝 
            Title"
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
            <textarea
              placeholder="Enter here want you want"
              rows={4}
              cols={55}
              value={textArea}
              onChange={(e) => setTextarea(e.target.value)}
            ></textarea>
          </div>
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div
                  className={`eachItem ${
                    curElem.id === activeItem ? "" : Blur()
                  }`}
                  key={curElem.id}
                >
                  <h3>{`Title :${curElem.name}`}</h3>
                  <div
                    className="read-description"
                    onClick={() => selectDescription(curElem.id)}
                  >
                    Tap to Read
                  </div>
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
                  <div
                    className={`${
                      curElem.id === activeItem
                        ? "description"
                        : "no-description"
                    }`}
                  >
                    <div
                      className="description-cut"
                      onClick={() => setActiveItem(null)}
                    >
                      X
                    </div>
                    <div>
                      <h3>{`Title :${curElem.name}`}</h3>
                      <br />
                      <br />
                      <h3>{description}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={`showItems ${Blur()}`}>
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
