import React from "react";
import BlogNavBar from "./BlogNavBar";
import PostCard from "./PostCard";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";

function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const limitRef = useRef(10);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const editBlog = ({ title, content, id }) => {
    setBlogs((prev) => {
      return prev.map((blog) => {
        if (blog._id == id) {
          return {
            ...blog,
            title: title,
            content: content,
          };
        }
        return blog;
      });
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/blog/pagesCount")
      .then((res) => {
        limitRef.current = res.data.count;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/blog/getall?page=${page}&limit=10`)
      .then((res) => {
        setBlogs(res.data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);
  return (
    <>
      <BlogNavBar />

      <Grid container spacing={2} style={{ margin: "20px 10px" }}>
        {blogs.map((blog, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <PostCard blog={blog} editBlog={editBlog} />
          </Grid>
        ))}
      </Grid>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Grid>
          <Pagination
            count={Math.ceil(limitRef.current / 10 + 1)}
            color="primary"
            size="large"
            onChange={handleChange}
          />
        </Grid>
      </div>
    </>
  );
}

export default AllBlogs;
