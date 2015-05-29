var OrderPreviewList = require('./order-preview-list'),
    OrderStore       = require('../../../stores/order'),
    Modal            = require('../../modal'),
    PaypalSpinner    = require('../paypal-spinner'),
    $                = require('jquery'),
    Cookie           = require('js-cookie'),
    OrderPreview;

OrderPreview = React.createClass({
  getInitialState: function () {
    return {
      items:           [],
      shippingPrice:   0,
      salesTax:        0,
      itemsTotalPrice: 0,
      adjustment:      0
    };
  },
  
  componentDidMount: function () {
    OrderStore.addChangeListener(this._onOrderChange);
  },

  componentWillUnmount: function () {
    OrderStore.removeChangeListener(this._onOrderChange);
  },
  
  _onOrderChange: function () {
    this.setState({
      'items':           OrderStore.getOrderItems(),
      'shippingPrice':   OrderStore.getShippingPrice(),
      'salesTax':        OrderStore.getSalesTax(),
      'itemsTotalPrice': OrderStore.getItemsTotalPrice(),
      'adjustment':      OrderStore.getAdjustment()
    });
  },
  
  _onCancelCheckout: function () {
    React.unmountComponentAtNode(document.getElementById('modal'));
    $('html').removeClass('freeze-page-size');
    $('body').removeClass('freeze-page-size');
  },
  
  _onCompleteCheckout: function () {
    var params    = $.getQueryParameters(),
        paymentId = params.paymentId,
        payerId   = params.PayerID,
        self      = this;
    
    // Remove the preview modal and add the paypal spinner
    React.unmountComponentAtNode(document.getElementById('modal'));
    React.render(<PaypalSpinner />, document.getElementById('modal'));
    // Update the order
    $.ajax({
        type:'PUT',
        url: '/api/Order/' + paymentId,
        data: { 'payerId': payerId }
      }).done(function (data) {
        self._onOrderComplete(data);
      }).fail(function (err) {
        self._onOrderError(err);
      });
  },
  
  _onOrderComplete: function (data) {
    var message = 'Thank you for your order! We\'ll email you as soon as your order is processed.';
    
    React.unmountComponentAtNode(document.getElementById('modal'));
    React.render(<Modal level='info' title={'Thank You!'} message={message} close={_closeModalHideHistory} />, document.getElementById('modal'));
    
    Cookies.remove('cartItemHistory', { path: '/' });
  },
  
  _onOrderError: function (err) {
    var title = ((err.responseJSON.name === 'PAYMENT_EXECUTED') ? 'Good News!' : undefined),
        level = ((err.responseJSON.name === 'PAYMENT_EXECUTED') ? 'info' : 'error'),
        close = ((err.responseJSON.name === 'PAYMENT_EXECUTED')
          ? _closeModalHideHistory
          : undefined);
    
    React.unmountComponentAtNode(document.getElementById('modal'));
    React.render(<Modal level={level} title={title} message={err.responseJSON.message} close={close} />, document.getElementById('modal'));
  },
  
  render: function () {
    var self = this;
    
    return (
      <div className='modal-wrapper'>
        <div className='modal-outer'>
          <div className='modal-middle'>
            <div className='order-preview-modal container-fluid'>
              <div className='row order-preview-header'>
                <h1 className='order-preview-h1 ptl pbm'>Sluice</h1>
                <h2 className='order-preview-h2 pbl'>{this.state.items.length + ((this.state.items.length > 1) ? ' items' : ' item')}</h2>
              </div>
              <OrderPreviewList items={this.state.items} />
              <div className='row order-preview-sales-tax'>
                <div className='col-xs-9 order-preview-lbl'>Sales Tax</div>
                <div className='col-xs-3 order-preview-val'>
                  {((this.state.salesTax > 0) ? ('$' + (this.state.salesTax / 100).toFixed(2)) : 'included')}
                </div>
              </div>
              <div className={'row order-preview-adjustment ' + ((this.state.adjustment === 0) ? 'hide-adjustment' : '')}>
                <div className='col-xs-9 order-preview-lbl'>Adjustment</div>
                <div className='col-xs-3 order-preview-val'>${(this.state.adjustment / 100).toFixed(2)}</div>
              </div>
              <div className='row order-preview-shipping'>
                <div className='col-xs-9 order-preview-lbl'>Shipping</div>
                <div className='col-xs-3 order-preview-val'>${(this.state.shippingPrice / 100).toFixed(2)}</div>
              </div>
              <div className='row order-preview-total'>
                <div className='col-xs-9 order-preview-lbl'>Total</div>
                <div className='col-xs-3 order-preview-val'>
                  ${((this.state.itemsTotalPrice + this.state.adjustment + this.state.salesTax + this.state.shippingPrice) / 100).toFixed(2)}
                </div>
              </div>
              <div className='row'>
                <div className='order-preview-btn-grp'>
                  <button className='btn link-btn gray col-sm-6' onClick={this._onCancelCheckout}>Cancel</button>
                  <button className='btn green solid shadow col-sm-6' onClick={this._onCompleteCheckout.bind(self)}>Complete Order</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

/**
 * Close the open modal and redirect the page to keep the user from
 * trying to re-execute the order.
 */
function _closeModalHideHistory() {
   $('html').removeClass('freeze-page-size');
   $('body').removeClass('freeze-page-size');
   React.unmountComponentAtNode(document.getElementById('modal'));
   window.location.replace(window.location.href.split("?")[0]);
}

module.exports = OrderPreview;