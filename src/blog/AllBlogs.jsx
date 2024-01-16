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
    // console.log(value);
    setPage(value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/blog/pagesCount")
      .then((res) => {
        // console.log(res.data);
        // console.log("1");
        limitRef.current = res.data.count;
        console.log(limitRef.current);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/blog/getall?page=${page}&limit=10`)
      .then((res) => {
        // console.log("2");
        setBlogs(res.data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);
  return (
    <>
      <BlogNavBar />

      <Grid
        container
        spacing={2}
        style={{ margin: "20px 10px" }} // Adjust spacing based on your design
      >
        {blogs.map((blog, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <PostCard title={blog.title} content={blog.content} />
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
