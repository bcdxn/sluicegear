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
    $            = require('jquery'),
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
} else if (document.getElementById('customizerContainer')) { // Shop specific components
  React.render(<Header active='shop'/>, document.getElementById('headerContainer'));
  React.render(<Customizer />, document.getElementById('customizerContainer'));
  React.render(<ProductList />, document.getElementById('productListContainer'));
} else {  // About specific components
  React.render(<Header active='about'/>, document.getElementById('headerContainer'));
}

$(document).ready(function () {
  if (queryParams.PayerID && queryParams.paymentId && queryParams.checkout == 'approve') {
    OrderActions.getOrder(queryParams.paymentId);
    $('html').addClass('freeze-page-size');
    $('body').addClass('freeze-page-size');
    React.render(<OrderPreview />, document.getElementById('modal'));
  }
});

//  Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-52244108-1', 'auto');
ga('send', 'pageview');