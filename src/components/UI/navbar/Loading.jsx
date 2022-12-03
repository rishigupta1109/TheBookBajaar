import React from "react";
import Backdrop from "./../../modal/backdrop";
import LoadingIcon from "../../../utilities/Loading.gif";

export default function Loading({ loading }) {
  return (
    <>
      {" "}
      {loading && (
        <Backdrop>
          <img src={LoadingIcon} className="loadingIcon"></img>
        </Backdrop>
      )}
    </>
  );
}
