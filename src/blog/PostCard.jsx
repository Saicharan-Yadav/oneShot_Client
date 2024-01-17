import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PostCard(props) {
  const navigate = useNavigate();

  const openBlog = (e) => {
    navigate("/edit", {
      state: { blog: props.blog },
    });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.blog.imageurl}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.blog.title}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            {props.content}
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={openBlog}>
          open
        </Button>
        {/* <Button
          size="small"
          style={{ backgroundColor: "grey", color: "white" }}
          variant="contained"
        >
          Delete
        </Button> */}
      </CardActions>
    </Card>
  );
}
