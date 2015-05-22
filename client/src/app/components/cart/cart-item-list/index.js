var CartItem = require('../cart-item'),
    CartItemList;

CartItemList = React.createClass({
  render: function () {
    var itemNodes =  this.props.items.map(function (item) {
      return (
        <li><CartItem item={item}/></li>
      );
    });
    
    return (
      <ul class='cart-items-list'>
        {itemNodes}
      </ul>
    );
  }
});

module.exports = CartItemList;

//sku={item.sku} description={item.description} price={item.price}