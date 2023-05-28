import React from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';

const Error = ({ message }) => {
  const { StatusCode, Message } = message;
  return (
    <Alert severity="error">
      <>
        <span>Something went wrong.</span>
        {StatusCode && <pre> Error code:{StatusCode}</pre>}
        {Message && <pre> Error Message:{Message}</pre>}
      </>
    </Alert>
  );
};

Error.propTypes = {
  message: 
    PropTypes.shape({
      StatusCode: PropTypes.string,
      Message: PropTypes.string
    })
  
};

export default Error;
