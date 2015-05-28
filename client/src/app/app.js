var Header       = require('./components/header'),
    Cart         = require('./components/cart'),
    Customizer   = require('./components/customizer'),
    ProductList  = require('./components/product-list'),
    Footer       = require('./components/footer'),
    OrderActions = require('./actions/order'),
    OrderPreview = require('./components/modal/order-preview'),
    Hero         = require('./components/hero'),
    Specs        = require('./components/specs'),
    Utils        = require('./utils'),
    queryParams  = $.getQueryParameters();

React.render(<Footer />, document.getElementById('footerContainer'));
React.render(<Cart />, document.getElementById('cartContainer'));

// Landing specific components
if (document.getElementById('heroContainer')) {
  React.render(<Header active='home'/>, document.getElementById('headerContainer'));
  React.render(<Hero />, document.getElementById('heroContainer'));
  React.render(<Specs />, document.getElementById('specsContainer'));
  Utils.introSectionParallax();
  Utils.colorSectionParallax();
  Utils.animateInfographic();
}

// Shop specific components
if (document.getElementById('customizerContainer')) {
  React.render(<Header active='shop'/>, document.getElementById('headerContainer'));
  React.render(<Customizer />, document.getElementById('customizerContainer'));
  React.render(<ProductList />, document.getElementById('productListContainer'));
}

$(document).ready(function () {
  if (queryParams.PayerID && queryParams.paymentId && queryParams.checkout == 'approve') {
    OrderActions.getOrder(queryParams.paymentId);
    $('html').addClass('freeze-page-size');
    $('body').addClass('freeze-page-size');
    React.render(<OrderPreview />, document.getElementById('modal'));
  }
});