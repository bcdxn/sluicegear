var ProductItem = React.createClass({
  getProductImgSrc: function (sku) {
    return 'url(/img/products/' + sku + '.jpg)';
  },
  
  render: function () {
    var productImgStyle = {
      backgroundImage: this.getProductImgSrc(this.props.product.sku)
    };
    
    return (
      <div className='col-sm-4 product-item-wrapper'>
        <div className='product-item'>
          <div className='product-img' style={productImgStyle}></div>
          <h1>{this.props.product.name}</h1>
          <div className='product-description ptm pbl'>{this.props.product.description}</div>
          <button className='btn blue hover add-extra-to-cart-btn'>Add to cart (${(this.props.product.price / 100).toFixed(2)})</button>
        </div>
      </div>
    );
  }
  
});

module.exports = ProductItem;