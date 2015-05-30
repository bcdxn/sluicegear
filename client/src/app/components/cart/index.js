var CartItemList  = require('./cart-item-list'),
    classNames    = require('classnames'),
    CartStore     = require('../../stores/cart'),
    CartActions   = require('../../actions/cart'),
    PaypalSpinner = require('../modal/paypal-spinner'),
    Modal         = require('../modal'),
    Utils         = require('../../utils'),
    $             = require('jquery');

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
      'coupon':     CartStore.getCoupon()
    };
  },
  
  hideCart: function () {
    $('.shopping-cart').removeClass('show-shopping-cart');
    setTimeout(function () {
      CartActions.hideCart();
    }, 100);
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
  
  componentDidUpdate: function () {
    if (this.state.isCartVisible) {
      window.requestAnimationFrame(function() {
        $('.shopping-cart').addClass('show-shopping-cart');
      });
    }
  },
  
  _onCartChange: function () {
    this.setState({
      'items':         CartStore.getAllItems(),
      'isCartVisible': CartStore.getIsCartVisible(),
      'coupon':        CartStore.getCoupon()
    });
  },
  
  checkout: function () {
    var self  = this,
        order = {};
    
    // Only allow checkout when the cart is not empty
    if (this.state.items.length > 0) {
      console.log(this.state.items);
      this.hideCart();
      React.render(<PaypalSpinner />, document.getElementById('modal'));
      $('html').addClass('freeze-page-size');
      $('body').addClass('freeze-page-size');
      
      order.items = this.state.items.slice(0);
      order.paymentMethod  = 'paypal';
      order.coupon = this.state.coupon;
      
      console.log(order.items);
      
      $.ajax({
        type:'POST',
        url: '/api/Order',
        data: order
      }).done(function (data) {
        self._onOrderCreation(data);
      }).fail(function (err) {
        self._onOrderCreationError(err);
      });
    }
  },
  
  _onOrderCreation: function (data) {
    window.location.replace(data.approvalUrl);
  },
  
  _onOrderCreationError: function (err) {
    console.log(err);
    React.unmountComponentAtNode(document.getElementById('modal'));
    React.render(<Modal level='error' message={err.message} />, document.getElementById('modal'));
  },
  
  _fetchCoupon: function () {
    var code = $('.coupon-input').val(),
        self = this;
    
    if (code) {
      $.ajax({
        type: 'GET',
        url: '/api/Coupon?code=' + code
      }).done(function (data) {
        self._goodCoupon(data);
      }).fail(function (err) {
        self._badCoupon(err);
      });
    }
  },
  
  _goodCoupon: function (data) {
    $('.coupon-input').val('');
    CartActions.addCoupon(data);
  },
  
  _badCoupon: function (err) {
    console.log(err);
    this.setState({ 'badCoupon': true });
  },
  
  _removeCoupon: function () {
    CartActions.removeCoupon();
  },
  
  render: function () {
    var cartStyle = {
          height: this.state.cartHeight
        },
        cartClasses = classNames({
          'shopping-cart':       true,
          'shopping-cart-empty': this.state.items.length < 1
        }),
        checkoutBtnClasses = classNames({
          'btn': true, 'green': true, 'solid': true, 'right-btn': true,
          'shadow': true, 'cart-checkout-btn': true,
          'disabled': this.state.items.length < 1
        }),
        itemsLbl        = ((this.state.items.length === 1) ? ' item' : ' items'),
        itemsTotalPrice = 0,
        shipping        = this.props.shippingPrice,
        couponCode      = ((this.state.coupon) ? this.state.coupon.code : ''),
        adjustment      = 0,
        self            = this;
    
    this.state.items.forEach(function (item) {
      itemsTotalPrice += item.price;
    });
    
    if (itemsTotalPrice >= this.props.freeShippingMin) {
      shipping = 0;
    }
    
    adjustment = Utils.getCouponAdjustment(itemsTotalPrice, this.props.shippingPrice, this.props.freeShippingMin, this.state.coupon);

    return (
      <div className={'shopping-cart-wrapper ' + ((this.state.isCartVisible) ? 'show-shopping-cart' : '')}>
        <div className={cartClasses} style={cartStyle}>
          <div className='shopping-cart-global-ctrls'>
            <div className='btn-grp'>
              <button className='btn blue solid left-btn shadow cart-close-btn' onClick={this.hideCart.bind(null)}>Keep Shopping</button>
              <button className={checkoutBtnClasses} onClick={this.checkout.bind(null)}>Checkout</button>
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
              <li className='shopping-cart-separator ptl'><div className='inner'></div></li>
              <li className={'cart-summary-line-item ptl pbl coupon-item ' + ((adjustment === 0) ? 'hide' : '')}
                  onClick={this._removeCoupon.bind(self)} title='click to remove'>
                <span className='cart-summary-lbl'>{couponCode} adjustment</span>
                <span className='cart-summary-val'>${(adjustment / 100).toFixed(2)}</span>
              </li>
              <div className={'cart-summary-line-item ' + ((adjustment === 0) ? '' : 'hide')}>
                <input type='text' className={'coupon-input ' + ((this.state.badCoupon) ? 'bad' : '')} placeholder='coupon code'/>
                <button className='btn gray coupon-apply-btn' onClick={this._fetchCoupon.bind(self)}>Apply</button>
              </div>
              <li className='shopping-cart-separator pbl'><div className='inner'></div></li>
              <li className='cart-summary-line-item'>
                <span className='cart-summary-lbl'>Total</span>
                <span className='cart-summary-val'>
                  ${((itemsTotalPrice + shipping + adjustment) / 100).toFixed(2)}
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