import React from "react";
import Alert from "@mui/material/Alert";

const Error = ({ message }) => {
  const { StatusCode, Message } = message;
  return (
    <Alert severity="error">
      <>
        <span>Something went wrong.</span>
        {StatusCode && <pre>Error code:{StatusCode}</pre>}
        {Message && <pre>Error Message:{Message}</pre>}
      </>
    </Alert>
  );
};

export default Error;
