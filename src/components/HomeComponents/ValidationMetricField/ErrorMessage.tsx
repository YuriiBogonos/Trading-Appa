import Typography from '@mui/material/Typography';

const ErrorMessage = () => {
  const message = 'Incorrect or no existing trade for hotkey\n' +
    'Either check your hotkey spelling or\n' +
    'Open a New Trade';

  const messageLines = message.split('\n');

  return (
    <div>
      {messageLines.map((line, index) => (
        <Typography key={index} variant="subtitle2">
          {line}
        </Typography>
      ))}
    </div>
  );
};

export default ErrorMessage;
