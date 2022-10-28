import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Edit() {
  const navigate = useNavigate();
  const [api, setapi] = useState(null);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    setId(localStorage.getItem("id", id));
    setTitle(localStorage.getItem("title", title));
    setDescription(localStorage.getItem("description", description));
    setPrice(localStorage.getItem("price", price));
  }, []);

  const updateHandler = (e) => {
    e.preventDefault();
    localStorage.getItem("id", id);
    console.log(id);
    axios
      .put(`https://api.escuelajs.co/api/v1/products/${id}`, {
        title,
        description,
        price,
      })
      .then((response) => {
        console.log("Data has been updated", response.data);
        getData();
      })
      .catch((e) => {
        console.log(e);
      });
    navigate("/");
  };

  const getData = () => {
    axios.get("https://api.escuelajs.co/api/v1/products").then((getData) => {
      setapi(getData.data);
    });
  };

  const theme = localStorage.getItem("theme");

  return (
    <div className={`${theme}`}>
      <Link className="btn btn-info mx-2 my-2" to="/">
        back
      </Link>
      <div>
        <h1 className="text-center mt-4">Edit</h1>
        <div
          className={`container mt-5 mb-5 p-4 d-flex justify-content-center ${
            theme == "dark" ? "light" : "dark"
          }`}
        >
          <form className="container">
            <div>
              <div className="form-group">
                <label htmlFor="formGroupExampleInput">ID</label>
                <input
                  type="text"
                  disabled={true}
                  className="form-control  w-100"
                  id="formGroupExampleInput"
                  placeholder="id"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="formGroupExampleInput2">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput2"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="form-group">
                <label htmlFor="formGroupExampleInput2">Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput2"
                  placeholder="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="formGroupExampleInput2">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="formGroupExampleInput2"
                  placeholder="price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>

              <button
                type="submit"
                className="btn btn-success mb-2"
                onClick={(e) => {
                  updateHandler(e);
                }}
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
