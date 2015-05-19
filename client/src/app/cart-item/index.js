var CartItem = React.createClass({
  render: function () {
    var imageSource = '/img/products/' + this.props.sku + '.jpg';
    
    return (
      <div className='cart-item'>
        <div className='cart-item-img-wrapper'>
          <img src={imageSource} />
        </div>
        <div className='cart-item-details'>
          <div className='cart-item-description'>
            {this.props.description}
          </div>
          <div className='cart-item-price'>
              ${(this.props.price / 100).toFixed(2)}
          </div>
        </div>
        <div className='cart-item-remove-wrapper'>
          <button className='cart-item-remove-btn' title='remove'>x</button>
        </div>
      </div>
    );
  }
});

module.exports = CartItem;