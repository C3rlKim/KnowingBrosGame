import Button from 'react-bootstrap/Button';

const MainButton = (props) => (
  <Button variant="main" {...props}>{props.children}</Button>
);

export default MainButton;