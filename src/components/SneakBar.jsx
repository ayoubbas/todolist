import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

export default function SneakBar({messageSneack,handleCloseSneackBar,vertical,horizontal,openSneack}) {

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openSneack}
        onClose={handleCloseSneackBar}
        message={messageSneack}
        key={vertical + horizontal}
      />
    </Box>
  );
}
