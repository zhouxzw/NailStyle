import React, { useState } from "react";
import "./Gallery.css";
import GalleryDisplay from "./GalleryDisplay";

import pic0 from "./pics/0.jpg";
import pic1 from "./pics/1.jpg";
import pic2 from "./pics/2.jpg";
import pic3 from "./pics/3.jpg";

export default function Gallery() {
  const galleryPics = [
    { id: 0, img: pic0, toggled: true },
    { id: 1, img: pic1, toggled: false },
    { id: 2, img: pic2, toggled: false },
    { id: 3, img: pic3, toggled: false },
  ];

  const [galleryState, setGallery] = useState(() => {
    return galleryPics;
  });

  function toggleGallery(i) {
    let newList = galleryState.map((src) => {
      src.toggled = false;
      if (src.id === i) {
        return { ...src, toggled: !src.toggled };
      }
      return src;
    });

    setGallery(newList);
  }

  return (
    <div className="gallery-parent-ctn" id="gallery">
      <div className="gallery-header-ctn">
        <span className="header">GALLERY</span>

        <p className="header-paragraph">
          A showcase of some of our finest pieces of client work.
        </p>
      </div>
      <div className="gallery-display-ctn">
        <div className="gallery-display-child">
          <div className="gallery-passage-ctn">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              ultricies et quam ipsum sagittis. Integer sit semper magna eu
              commodo. Id eget iaculis dolor, euismod cras consequat, mi sit
              consequat. Lacus, lectus leo fames nec turpis. Turpis orci,
              pellentesque faucibus ac sagittis varius maecenas bibendum tellus.
              Dui viverra blandit sit morbi. Lacus, lectus leo fames nec turpis.
              Turpis orci, pellentesque faucibus ac sagittis varius maecenas
              bibendum tellus. Dui viverra blandit sit morbi.
            </p>
          </div>
          <div className="gallery-picture-ctn">
            <div className="display-ctn">
              <GalleryDisplay galleryState={galleryState} />
              <div className="gallery-navbar">
                {galleryPics.map((src, i) => {
                  return (
                    <div
                      onClick={() => toggleGallery(i)}
                      className="navbar-picture"
                      style={{ backgroundImage: `url(${src.img})` }}
                      key={"gal " + i}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
