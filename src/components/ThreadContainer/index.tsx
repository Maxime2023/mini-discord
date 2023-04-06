import * as React from "react";
import { makeStyles } from "@mui/material/styles";
import { Card, CardContent, Grid, Typography } from "@mui/material";

interface Item {
  id: number;
  title: string;
  description: string;
}

interface Props {
  data: Item[];
}

const ThreeColumnCards: React.FC<Props> = ({ data }) => {

  return (
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card >
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

  );
};

export default ThreeColumnCards;
