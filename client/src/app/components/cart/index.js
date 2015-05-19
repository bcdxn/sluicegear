var CartItemList = require('../cart-item-list'),
    classNames    = require('classnames');

/* sample items
[{'sku': 'SIN-R', 'description': 'Single-wide red hammock', 'price': 5995 }
,{'sku': 'SIN-L', 'description': 'Double-wide blue hammock', 'price': 5995 }]
*/

var Cart = React.createClass({
  getDefaultProps: function() {
    return {
      freeShippingMin: 15000,
      shippingPrice: 895,
      emptyCartMsg: 'Your cart is empty'
    };
  },
  getInitialState: function () {
    return {
      // Display logic attributes
      'display': {
        'cartHeight': window.innerHeight
      },
      // Business logic attributes
      'model': {
        'salesTax':   0,
        'adjustment': 0,
        'items':      [{'sku': 'SIN-R', 'description': 'Single-wide red hammock', 'price': 5995 }
,{'sku': 'SIN-L', 'description': 'Double-wide blue hammock', 'price': 5995 }],
        'coupon':     {}
      }
    };
  },

  handleResize: function(e) {
    this.state.display.cartHeight = window.innerHeight;
    this.setState({ 'display': this.state.display });
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  render: function () {
    var cartStyle = {
          height: this.state.display.cartHeight
        },
        cartClasses = classNames({
          'shopping-cart':       true,
          'shopping-cart-empty': this.state.model.items.length < 1,
        }),
        checkoutBtnClasses = classNames({
          'btn': true, 'green': true, 'solid': true, 'right-btn': true,
          'shadow': true, 'cart-checkout-btn': true,
          'disabled': this.state.model.items.length < 1
        }),
        itemsLbl        = ((this.state.model.items.length === 1) ? ' item' : ' items'),
        itemsTotalPrice = 0,
        shipping        = this.props.shippingPrice;
        
        this.state.model.items.forEach(function (item) {
          itemsTotalPrice += item.price;
        });
        
        if (itemsTotalPrice >= this.props.freeShippingMin) {
          shipping = 0;
        }

    return (
      <div className={cartClasses} style={cartStyle}>
        <div className='shopping-cart-global-ctrls'>
          <div className='btn-grp'>
            <button className='btn blue solid left-btn shadow cart-close-btn'>Keep Shopping</button>
            <button className={checkoutBtnClasses}>Checkout</button>
          </div>
        </div>
        <div className='empty-cart-msg ptl'>{this.props.emptyCartMsg}</div>
        <div className='cart-summary ptl prm pbl plm'>
          <ul>
            <li className='cart-summary-line-item'>
              <span className='cart-summary-lbl'>{this.state.model.items.length} {itemsLbl}</span>
              <span className='cart-summary-val'>${(itemsTotalPrice / 100).toFixed(2)}</span>
            </li>
            <li className='cart-summary-line-item ptl'>
              <span className='cart-summary-lbl'>Shipping</span>
              <span className='cart-summary-val'>${(shipping / 100).toFixed(2)}</span>
            </li>
            <li className='shopping-cart-separator ptl pbl'><div className='inner'></div></li>
            <li className='cart-summary-line-item'>
              <span className='cart-summary-lbl'>Total</span>
              <span className='cart-summary-val'>
                ${((itemsTotalPrice + shipping + this.state.model.adjustment) / 100).toFixed(2)}
              </span>
            </li>
          </ul>
        </div>
        <div className='shipping-msg mtl mbl'>
          FREE SHIPPING ON ORDERS OVER ${(this.props.freeShippingMin / 100).toFixed(2)}
        </div>
        <CartItemList items={this.state.model.items} />
      </div>
    )
  }
});

module.exports = Cart;