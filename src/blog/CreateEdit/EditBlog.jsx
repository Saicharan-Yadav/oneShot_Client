import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

function EditBlog() {
  const navigate = useNavigate();
  const location = useLocation();
  const receivedData = location.state.blog;

  const [title, setTitle] = useState(receivedData.title);
  const [content, setContent] = useState(receivedData.content);

  const ownerRef = useRef(false);
  const [owner, setOwner] = useState(false);

  // Add receivedData._id to the dependency array
  useEffect(() => {
    axios
      .post(
        "https://oneshotbackend-rgyj.onrender.com/blog/owner",
        { blog_id: receivedData._id },
        {
          headers: {
            Accept: "application/json",
            Authorization: sessionStorage.getItem("acessToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.msg == "you are the owner of this blog") {
          console.log("owner");
          ownerRef.current = true;
          setOwner((prev) => !prev);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //   function submit(e) {
  //     e.preventDefault();

  //     axios
  //       .post(
  //         "http://localhost:3000/blog/create",
  //         {
  //           title: title,
  //           content: content,
  //         },
  //         {
  //           headers: {
  //             Accept: "application/json",
  //             Authorization: sessionStorage.getItem("acessToken"),
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         // if (res.data.code === 200) {
  //         console.log("submitted");
  //         setSubmitted(true);
  //       })
  //       .catch((e) => {
  //         setError(e.data.message);
  //       });
  //   }

  function edit(e) {
    e.preventDefault();
    // console.log(title, content, receivedData._id);
    axios
      .put(
        "https://oneshotbackend-rgyj.onrender.com/blog/edit",
        {
          title: title,
          content: content,
          blog_id: receivedData._id,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: sessionStorage.getItem("acessToken"),
          },
        }
      )
      .then((res) => {
        // editBlog({ title, content, id: receivedData._id });
        window.alert("edited");
        console.log("submitted");
        navigate("/blogs");
      })
      .catch((e) => {
        console.log(e);
        // setError(e.data);
      });
  }

  function deletefn(e) {
    e.preventDefault();
    // console.log(title, content, receivedData._id);
    axios
      .post(
        `https://oneshotbackend-rgyj.onrender.com/blog/delete/`,
        { blog_id: receivedData._id },
        {
          headers: {
            Accept: "application/json",
            Authorization: sessionStorage.getItem("acessToken"),
          },
        }
      )
      .then((res) => {
        console.log("deleted");
        alert("deleted Sucessfully");
        navigate("/blogs");
      })
      .catch((e) => {
        console.log(e);
        alert("Error while deleting");
        // setError(e.data);
      });
  }

  return (
    <>
      <Navbar />
      <div>
        <form className="crud-form">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => {
              if (owner) setTitle(e.target.value);
            }}
          />

          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => {
              if (owner) setContent(e.target.value);
            }}
          />

          <Grid container spacing={2}>
            {owner && (
              <Grid item xs={6}>
                <button
                  type="submit"
                  className="submit-button"
                  disabled={!ownerRef.current}
                  onClick={edit}
                >
                  Edit
                </button>
              </Grid>
            )}
            {owner && (
              <Grid item xs={6}>
                <button
                  type="submit"
                  className="submit-button"
                  disabled={!ownerRef.current}
                  onClick={deletefn}
                >
                  Delete
                </button>
              </Grid>
            )}
          </Grid>
        </form>
      </div>
    </>
  );
}

export default EditBlog;
