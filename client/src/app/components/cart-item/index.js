var CartItemStore      = require('../../stores/cart-items-store'),
    CartActionCreators = require('../../actions/CartActionCreators.js');

var CartItem = React.createClass({
  removeItem: function (id) {
//    var id = e.target.parentNode.getAttribute('cart-item-id');
    
    CartActionCreators.removeItem(id);
  },
  
  render: function () {
    var imageSource = '/img/products/' + this.props.item.sku + '.jpg';
    
    return (
      <div className='cart-item'>
        <div className='cart-item-img-wrapper'>
          <img src={imageSource} />
        </div>
        <div className='cart-item-details'>
          <div className='cart-item-description'>
            {this.props.item.description}
          </div>
          <div className='cart-item-price'>
              ${(this.props.item.price / 100).toFixed(2)}
          </div>
        </div>
        <div className='cart-item-remove-wrapper'>
          <button className='cart-item-remove-btn' title='remove' onClick={this.removeItem.bind(null, this.props.item.id)}>x</button>
        </div>
      </div>
    );
  }
});

module.exports = CartItem;