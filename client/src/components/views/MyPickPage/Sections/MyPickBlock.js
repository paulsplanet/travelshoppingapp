import React from "react";

function MyPickBlock (props) {

    const renderItems = () => (
       
       props.products && props.products.map((product, index) => (
            <tr key={index}>
                <td>
                    <a href={`/product/${product._id}`}>
                        <img style={{ width: '150px' }} alt="product" src={`http://localhost:5000/${product.images[0]}`} />
                    </a>
                </td>
                <td>
                    {product.title} 
                </td>
                <td>
                    <button onClick={() => props.removeItem(product._id)}>
                        Remove
                    </button>
                </td>
            </tr>
        ))
         
    )

    return (
        <div>
            <table>
                <colgroup>
                    <col width="50%"></col>
                    <col width="30%"></col>
                    <col width="20%"></col>
                </colgroup>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Destination</th>
                        <th>Remove from My Picks</th>
                    </tr>
                </thead>
                    
                <tbody>
                    {renderItems()} 
                </tbody>
                        
            </table>
        </div>
    )
} 

export default MyPickBlock;