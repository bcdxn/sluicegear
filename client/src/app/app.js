var Header      = require('./components/header'),
    Cart        = require('./components/cart'),
    Customizer  = require('./components/customizer'),
    ProductList = require('./components/product-list'),
    Footer      = require('./components/footer');

React.render(<Header active='shop'/>, document.getElementById('headerContainer'));
React.render(<Customizer />, document.getElementById('customizerContainer'));
React.render(<ProductList />, document.getElementById('productListContainer'));
React.render(<Footer />, document.getElementById('footerContainer'));
React.render(<Cart />, document.getElementById('cartContainer'));