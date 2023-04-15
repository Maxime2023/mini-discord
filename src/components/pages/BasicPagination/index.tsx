import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

export default function BasicPagination(props: any) {
  const [page, setPage] = React.useState(1);

  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    props.page(value);
    setPage(value);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", margin: 5 }}>
      <Pagination count={props.numberPage} page={page} onChange={handlePage} />
    </Box>
  );
}
