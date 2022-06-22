
const Backdrop = (props) => {
  const clickHandler = () => {
    props.onclick();
  };
  return <div id="backdrop" onClick={clickHandler}></div>;
};
export default Backdrop;
