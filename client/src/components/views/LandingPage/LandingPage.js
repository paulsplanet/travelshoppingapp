import React, { useEffect, useState } from 'react';
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row, Carousel } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from '../../utils/ImageSlider';

function LandingPage() {
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(8);
    const [postSize, setPostSize] = useState(0);

    useEffect(() => {
        let body = {
            skip: skip,
            limit: limit,
        }
        getProducts(body);
        
    }, [])

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
                .then(response => {
                    if(response.data.success) {
                        if (body.loadMore) {
                            setProducts([...products, ...response.data.productInfo])
                        } else {
                            setProducts(response.data.productInfo)
                        }
                        setPostSize(response.data.postSize)
                    } else {
                        alert("failed to load products.")
                    }
                })    
    }

    const loadMoreHandler = () => {
        let skip = skip + limit;
        let body = {
            skip: skip,
            limit: limit,
            loadMore: true,
        };
        getProducts(body);

        setSkip(skip);
    }

    const rederCards = products.map((product, index) => {
        console.log('products', product)
        return (
            <Col lg={6} md={8} xs={24} key={index}>
                <Card  
                    cover={<ImageSlider images={product.images} />}    
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
            { postSize >= limit &&
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                    <button onClick={loadMoreHandler}>More Trips</button>
                </div>
            }
            
            
        </div>
    )
}

export default LandingPage
