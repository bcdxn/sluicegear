var Header       = require('./components/header'),
    Cart         = require('./components/cart'),
    Customizer   = require('./components/customizer'),
    ProductList  = require('./components/product-list'),
    Footer       = require('./components/footer'),
    OrderActions = require('./actions/order'),
    OrderPreview = require('./components/modal/order-preview'),
    queryParams  = $.getQueryParameters();

React.render(<Header active='shop'/>, document.getElementById('headerContainer'));
React.render(<Customizer />, document.getElementById('customizerContainer'));
React.render(<ProductList />, document.getElementById('productListContainer'));
React.render(<Footer />, document.getElementById('footerContainer'));
React.render(<Cart />, document.getElementById('cartContainer'));

$(document).ready(function () {
  if (queryParams.PayerID && queryParams.paymentId && queryParams.checkout == 'approve') {
    OrderActions.getOrder(queryParams.paymentId);
    $('html').addClass('freeze-page-size');
    $('body').addClass('freeze-page-size');
    React.render(<OrderPreview />, document.getElementById('modal'));
  }
});