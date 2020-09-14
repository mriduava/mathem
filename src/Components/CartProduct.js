import React from 'react'

const cartProducts = (products) => {
    
    
    return(
    <div>
    {products.map((product, i) => {
      return (
        <Row key={product._id}>
          <Col xs="1" sm="1">
            <CardImg top width="100%" src={product.image} alt="Card image cap" />
          </Col>
          <Col xs="5" sm="5"><h4 style={{color:'#424242'}}>{product.productName}</h4></Col>
          <Col xs="3" sm="3"><h5 style={{color:'#FA5858'}}>{product.price} :-</h5></Col>
          <Col xs="3" sm="3" style={{textAlign: 'right'}}><p>{product.retail}</p></Col>
          <hr/>
        </Row>
      )
    })}
    </div>)
}
export default cartProduct