import React, { useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import Popup from "./Popup"
import '../css/popup.css';
import { Button } from "@material-ui/core";
const aspectRatios = [
  { value: 1 / 1, text: "1/1" },
  { value: 4 / 2, text: "4/2" },
  { value: 4 / 3, text: "4/3" },
  { value: 16 / 9, text: "16/9" },

];

const ImageCropDialog = ({
  id,
  imageUrl,
  cropInit,
  zoomInit,
  aspectInit,
  onCancel,
  setCroppedImageFor,
}) => {
  if (zoomInit == null) {
    zoomInit = 1;
  }
  if (cropInit == null) {
    cropInit = { x: 0, y: 0 };
  }
  if (aspectInit == null) {
    aspectInit = aspectRatios[0];
  }
  const [zoom, setZoom] = useState(zoomInit);
  const [crop, setCrop] = useState(cropInit);
  const [aspect, setAspect] = useState(aspectInit);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onAspectChange = (e) => {
    const value = e.target.value;
    const ratio = aspectRatios.find((ratio) => ratio.value == value);
    setAspect(ratio);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCrop = async () => {
    const cropped = await getCroppedImg(imageUrl, croppedAreaPixels);
    setCroppedImageFor(cropped)
  };



  return (
    <Popup
      openPopup={true}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'

      }}>
        <div className="backdrop"></div>
        <div className="crop-container">
          <Cropper
            image={imageUrl}
            zoom={zoom}
            crop={crop}
            aspect={aspect.value}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="controls">
          <div className="controls-upper-area">
            <input
              type="range"
              min={1}
              max={2}
              step={0.005}
              value={zoom}
              onInput={(e) => {
                onZoomChange(e.target.value);
              }}
              className="slider"
            ></input>
            <select style={{
              width: '10%',
              height: '30px',
              marginLeft: '20px'
            }} onChange={onAspectChange}>
              {aspectRatios.map((ratio) => (
                <option
                  style={{
                    width: '10%',
                    height: '30px',
                  }}
                  key={ratio.text}
                  value={ratio.value}
                  selected={ratio.value === aspect.value}
                >
                  {ratio.text}
                </option>
              ))}
            </select>
          </div>
          <div style={{
            margin: '10px 0 10px 0'
          }} >
            <Button variant="outlined" color="primary" onClick={onCancel}
              style={{
                padding: '6px 30px',
                borderRadius: '4px',
                marginLeft: '10px',
              }}
            >Hủy</Button>

            <Button variant="outlined" color="secondary" onClick={onCrop}
              style={{
                padding: '6px 30px',
                borderRadius: '4px',
                marginLeft: '30px',
              }}
            >Cắt</Button>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default ImageCropDialog;
