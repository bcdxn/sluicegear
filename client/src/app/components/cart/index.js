var CartItemList = require('./cart-item-list'),
    classNames   = require('classnames'),
    CartStore    = require('../../stores/cart'),
    CartActions  = require('../../actions/cart');

var Cart = React.createClass({
  getDefaultProps: function () {
    return {
      freeShippingMin: 15000,
      shippingPrice: 895,
      emptyCartMsg: 'Your cart is empty'
    };
  },
  
  getInitialState: function () {
    return {
      // Display logic attributes
      'isCartVisible': CartStore.getIsCartVisible(),
      'cartHeight': window.innerHeight,
      // Business logic attributes
      'salesTax':   0,
      'adjustment': 0,
      'items':      CartStore.getAllItems(),
      'coupon':     {}
    };
  },
  
  hideCart: function () {
    CartActions.hideCart();
    $('html').removeClass('freeze-page-size');
    $('body').removeClass('freeze-page-size');
  },

  handleResize: function (e) {
    this.setState({ 'cartHeight': window.innerHeight });
  },

  componentDidMount: function () {
    window.addEventListener('resize', this.handleResize);
    CartStore.addChangeListener(this._onCartChange);
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this.handleResize);
    CartStore.removeChangeListener(this._onCartChange);
  },
  
  _onCartChange: function () {
    this.setState({ 'items': CartStore.getAllItems(), 'isCartVisible': CartStore.getIsCartVisible() });
  },

  render: function () {
    var cartStyle = {
          height: this.state.cartHeight
        },
        cartClasses = classNames({
          'shopping-cart':       true,
          'shopping-cart-empty': this.state.items.length < 1,
          'show-shopping-cart':  this.state.isCartVisible
        }),
        checkoutBtnClasses = classNames({
          'btn': true, 'green': true, 'solid': true, 'right-btn': true,
          'shadow': true, 'cart-checkout-btn': true,
          'disabled': this.state.items.length < 1
        }),
        itemsLbl        = ((this.state.items.length === 1) ? ' item' : ' items'),
        itemsTotalPrice = 0,
        shipping        = this.props.shippingPrice;
        
        this.state.items.forEach(function (item) {
          itemsTotalPrice += item.price;
        });
        
        if (itemsTotalPrice >= this.props.freeShippingMin) {
          shipping = 0;
        }

    return (
      <div className={'shopping-cart-wrapper ' + ((this.state.isCartVisible) ? 'show-shopping-cart' : '')} onClick={this.hideCart.bind(null)}>
        <div className={cartClasses} style={cartStyle}>
          <div className='shopping-cart-global-ctrls'>
            <div className='btn-grp'>
              <button className='btn blue solid left-btn shadow cart-close-btn' onClick={this.hideCart.bind(null)}>Keep Shopping</button>
              <button className={checkoutBtnClasses}>Checkout</button>
            </div>
          </div>
          <div className='empty-cart-msg ptl'>{this.props.emptyCartMsg}</div>
          <div className='cart-summary ptl prm pbl plm'>
            <ul>
              <li className='cart-summary-line-item'>
                <span className='cart-summary-lbl'>{this.state.items.length} {itemsLbl}</span>
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
                  ${((itemsTotalPrice + shipping + this.state.adjustment) / 100).toFixed(2)}
                </span>
              </li>
            </ul>
          </div>
          <div className='shipping-msg mtl mbl'>
            FREE SHIPPING ON ORDERS OVER ${(this.props.freeShippingMin / 100).toFixed(2)}
          </div>
          <CartItemList items={this.state.items} />
        </div>
      </div>
    )
  }
});

module.exports = Cart;