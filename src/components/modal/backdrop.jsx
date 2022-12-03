import { useEffect } from "react";
const Backdrop = (props) => {
  const clickHandler = () => {
    props.onclick();
  };
  document.body.style.overflow = "hidden";
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div id="backdrop" onClick={clickHandler}>
      {props?.children}
    </div>
  );
};
export default Backdrop;
