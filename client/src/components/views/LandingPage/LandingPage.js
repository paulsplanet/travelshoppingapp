import React, { useEffect, useState } from 'react';
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";

function LandingPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.post('/api/product/products')
            .then(response => {
                if(response.data.success) {
                    setProducts(response.data.productInfo)
                } else {
                    alert("failed to load products.")
                }
            })
    }, [])

    const rederCards = products.map((product, index) => {
        console.log('products', product)
        return (
            <Col lg={6} md={8} xs={24} key={index}>
                <Card  
                    cover={<img src={`http://localhost:5000/${product.images[0]}`} />}    
                >
                    <Meta title={product.title} description={`$${product.price}`} />
                </Card>
            </Col>
        )
    })

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Let's Travel Anywhere <Icon type="rocket" /></h2>
            </div>
            <Row gutter={[16, 16]}>
                {rederCards}
            </Row>
            
        </div>
    )
}

export default LandingPage
