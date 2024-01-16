import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { purple, red } from "@mui/material/colors";

export default function PostCard(props) {
  const primary = red[500]; // #f44336
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="data:image/jpeg;base64,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"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          style={{ backgroundColor: primary, color: "white" }}
        >
          Delete
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
