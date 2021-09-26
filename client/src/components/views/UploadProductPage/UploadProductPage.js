import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";

const { Title } = Typography;
const { TextArea } = Input;


function UploadProductPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [continent, setContinenet] = useState(1);
    const [image, setImage] = useState([]);

    const titleChangeHandler = (e) => {
        setTitle(e.currentTarget.value);
    }

    const descriptionChangeHandler = (e) => {
        setDescription(e.currentTarget.value);
    }

    const priceChangeHandler = e => {
        setPrice(e.currentTarget.value);
    }


    return(
        <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{ textAlign: 'center', marginBottom: '2rem'}}>
                <Title level={2}>Upload Travel Package</Title>
            </div>
            <Form>
                {/* drop zone */}
                <br />
                <br />
                <label>Destination</label>
                <Input onChange={titleChangeHandler} value={title} />
                <br />
                <br />
                <label>Description</label>
                <TextArea onChange={descriptionChangeHandler} value={description} />
                <br />
                <br />
                <label>Price($)</label>
                <Input type="number" onChange={priceChangeHandler} value={price} />
                <br />
                <br />
                <select>
                    <option></option>
                </select>
                <br />
                <br />
                <Button>Confirm</Button>
            </Form>
        </div>
       
    )
}

export default UploadProductPage;