import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import "./crud.css"; // Import the CSS file
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";
import Button from "@mui/material/Button";

function CRUDblogs() {
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // This is the URL we'll use to display the image on the page.
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function submitImage(event) {
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
        console.log(res.data.secure_url); // This might be res.data or res.data.url, depending on Cloudinary's response structure.
        setImageUrl(res.data.secure_url);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function submit(e) {
    e.preventDefault();
    submitImage();
    axios
      .post(
        "http://localhost:3000/blog/create",
        {
          title: title,
          content: content,
          imageurl: imageUrl,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: sessionStorage.getItem("acessToken"),
          },
        }
      )
      .then((res) => {
        // if (res.data.code === 200) {
        console.log("submitted");
        setSubmitted(true);
      })
      .catch((e) => {
        setError(e.data);
      });
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (submitted) {
    return (
      <p className="success-message">
        We've received your message, thank you for contacting us!
      </p>
    );
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
            <UploadFileTwoToneIcon />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // onClick={submitImage}
            >
              Upload
            </Button>
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
