import React from "react";

function Data() {
  function getData() {
    fetch('http://localhost:3000')
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
  return (
    <div>
      <button onClick={getData}>Get Data</button>
    </div>
  );
}
export default Data;
