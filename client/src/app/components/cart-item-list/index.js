var CartItem = require('../cart-item');

var CartItemList = React.createClass({
  render: function () {
    var itemNodes =  this.props.items.map(function (item) {
      return (
        <li><CartItem sku={item.sku} description={item.description} price={item.price}/></li>
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