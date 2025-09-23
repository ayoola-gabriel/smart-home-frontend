import React, { useEffect, useState, FormEvent } from "react";
import { X } from "lucide-react";
import "../styles/modal.css";

export const Modal = ({ open, cancelFn, body, heading }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        if (cancelFn) {
          cancelFn();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, cancelFn]);

  if (!open) {
    // document.getElementById('modal').style.transition = 'opacity 0.3s ease-out';
    return null;
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer p-1">
        <div className="flex justify-between items-center p-2">
          <h2 className="text-lg">{heading}</h2>
          <div className="titleCloseBtn">
            <button onClick={cancelFn}>
              <X />
            </button>
          </div>
        </div>
        <div className="body mb-2 mt-4">{body}</div>
      </div>
    </div>
  );
};
