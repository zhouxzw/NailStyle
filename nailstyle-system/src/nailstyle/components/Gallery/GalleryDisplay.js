import React from "react";
import GalleryPic from "./GalleryPic";

export default function GalleryDisplay({ galleryState }) {
  return galleryState.map((picture, i) => {
    if (picture.toggled)
      return <GalleryPic picture={picture} key={"gs-k " + i} />;
    return null;
  });
}
