import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import axios from "axios";

function FileUpload () {
    const [images, setImages] = useState([]);

    const dropHandler = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/fomr-data'}
        }
        formData.append("file", files[0])

        axios.post('/api/product/image', formData, config)
            .then(response => {
                if(response.data.success) {
                    setImages([...images, response.data.filePath])
                } else {
                    alert('Failed to save the image.')
                }
            })
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={dropHandler}>
                {({ getRootProps, getInputProps }) => (
                    <div style={{ width: 200, height: 200, border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem'}} />
                    </div>
                )}
            </Dropzone>
            <div style={{ display: 'flex', width: '450px', height: '200px', overflowX: 'scroll' }}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img style={{ minWidth: '300px', width: '300px', height: '180px' }} 
                            src={`http://localhost:5000/${image}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
};

export default FileUpload;