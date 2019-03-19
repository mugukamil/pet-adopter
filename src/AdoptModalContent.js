import React from "preact-compat";

const AdoptModalContent = props => (
  <>
    <h1>Would you like to adopt {props.name}</h1>
    <div className="buttons">
      <button onClick={props.toggleModal}>Yes</button>
    </div>
  </>
);

export default AdoptModalContent;
