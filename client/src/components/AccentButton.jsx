import Button from 'react-bootstrap/Button';

const AccentButton = (props) => (
  <Button variant="accent" {...props}>
    {props.children}
  </Button>
);

export default AccentButton;
