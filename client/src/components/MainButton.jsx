import Button from 'react-bootstrap/Button';

const MainButton = (props) => (
	<Button className="mainBtn" {...props}>{props.children}</Button>
);

export default MainButton;