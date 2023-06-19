import React, { useState } from 'react';
import '../css/popup.css';
import { AiFillCamera } from "react-icons/ai";

const MultipleImage = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleImageChange = (e) => {
        console.log(e.target.files)
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
            console.log("a: ", filesArray);
            setSelectedFiles((prevImages) => prevImages.concat(filesArray));
        }
    };

    const renderPhotos = (source) => {
        return source.map((photo) => {
            return <img src={photo} alt="" key={photo} />;
        });
    };

    return (
        <div className="multi-imgrow">
            <div className="mul-holder">
                <div className="add-mul">
                    <input type="file" id="file" multiple onChange={handleImageChange} />
                    <label htmlFor="file" >
                        <i className="material-icons"><AiFillCamera /></i>
                    </label>
                </div>
                {renderPhotos(selectedFiles)}</div>
        </div>
    );
}
export default MultipleImage;