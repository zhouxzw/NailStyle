import React from "react";

export default function GalleryPic({ picture }) {
  return (
    <div
      className="display-picture"
      style={{ backgroundImage: `url(${picture.img})` }}
    ></div>
  );
}
