import React from "react";
import "./DeleteItem.scss";

const DeleteItem = ({ update, onClick, id }) => {
  return (
    <div className="delete">
      <button
        onClick={async (event) => {
          event.stopPropagation();
          await onClick(id);
          update();
        }}
      >
        <img src="/remove.png" alt="Botón para eliminar el objeto" />
      </button>
    </div>
  );
};

export default DeleteItem;
