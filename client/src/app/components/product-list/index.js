var ProductItem  = require('./product-item'),
    ProductStore = require('../../stores/product'),
    ProductList;

ProductList = React.createClass({
  getInitialState: function () {
    return {
      products: []
    };
  },
  
  componentDidMount: function () {
    ProductStore.addChangeListener(this._onProductsChange); // Initial load of products is complete
  },

  componentWillUnmount: function () {
    ProductStore.removeChangeListener(this._onProductsChange);
  },
  
  _onProductsChange: function () {
    this.setState({ 'products': ProductStore.getAllExtras() });
  },
  
  render: function () {
    var productRows =  this.state.products.map(function (product, index) {
      return (
        <li><ProductItem product={product} /></li>
      );
    });
    
    return (
      <div className='product-list-wrapper'>
        <div className='product-list-title pll'>Extras:</div>
        <ul className='product-list'>
          {productRows}
        </ul>
      </div>
    );
  }
});

module.exports = ProductList;