import React from "react";
import GalleryPic from "./GalleryPic";

export default function GalleryDisplay({ galleryState }) {
  return galleryState.map((picture) => {
    if (picture.toggled) return <GalleryPic picture={picture} />;
    return null;
  });
}
