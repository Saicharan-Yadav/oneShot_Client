import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import axios from "axios";
import "./crud.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";

function CRUDblogs() {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  // const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function submit(e) {
    e.preventDefault();
    // await submitImage();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "blog_preset");
    data.append("cloud_name", "dxy5iorbc");

    axios
      .post("https://api.cloudinary.com/v1_1/dxy5iorbc/image/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        axios
          .post(
            "https://oneshotbackend-rgyj.onrender.com/blog/create",
            {
              title: title,
              content: content,
              imageurl: res.data.secure_url,
            },
            {
              headers: {
                Accept: "application/json",
                Authorization: sessionStorage.getItem("acessToken"),
              },
            }
          )
          .then((res) => {
            alert("Blog created successfully");
            console.log("Created blog successfully");
            navigate("/blogs");
            // window.location.reload();
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((err) => {
        window.alert("Error while uploading image");
        console.log(err);
      });
  }

  return (
    <>
      <Navbar />
      <form className="crud-form" onSubmit={submit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Grid item xs={12}>
          <Box
            component="span"
            sx={{
              display: "block",
              p: 1,
              m: 1,
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#101010" : "#fff",
              color: (theme) =>
                theme.palette.mode === "dark" ? "grey.300" : "grey.800",
              border: "1px solid",
              borderColor: (theme) =>
                theme.palette.mode === "dark" ? "grey.800" : "grey.300",
              borderRadius: 2,
              fontSize: "0.875rem",
              fontWeight: "700",
            }}
          >
            Upload Blog Image
            <UploadFileTwoToneIcon />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </Box>
        </Grid>

        <button type="submit" className="submit-button">
          Send
        </button>
      </form>
    </>
  );
}

export default CRUDblogs;
