import React from "react";
import Backdrop from "./../../modal/backdrop";
import LoadingIcon from "../../../utilities/Loading.gif";

export default function Loading({ loading, zIndex }) {
  return (
    <>
      {" "}
      {loading && (
        <Backdrop zIndex={zIndex}>
          <img
            alt="loading-icon"
            src={LoadingIcon}
            className="loadingIcon"
          ></img>
        </Backdrop>
      )}
    </>
  );
}
