var CartStore   = require('../../stores/cart'),
    CartActions = require('../../actions/cart'),
    Header;

Header = React.createClass({
  getDefaultProps: function () {
    return {
      active: 'home'
    };
  },
  
  getInitialState: function () {
    return {
      menuExpanded: false,
      numItems: CartStore.getAllItems().length
    };
  },
  
  toggleMenu: function () {
    if (this.state.menuExpanded) {
      this.setState({ menuExpanded: false });
    } else {
      this.setState({ menuExpanded: true });
    }
  },
  
  showCart: function () {
    CartActions.showCart();
  },
  
  componentDidMount: function () {
    CartStore.addChangeListener(this._onCartChange);
  },

  componentWillUnmount: function () {
    CartStore.removeChangeListener(this._onCartChange);
  },
  
  _onCartChange: function() {
    this.setState({ numItems: CartStore.getAllItems().length });
  },
  
  render: function () {
    var self = this;
    
    return (
      <div className={'header-wrapper ' + ((this.state.menuExpanded) ? 'expand-small-menu' : '')}>
        <div className='header container-fluid'>
          <div className='row'>
            <a className='col-xs-3 col-sm-2 header-logo' href='/'>Sluice</a>
            <div className='col-xs-3 col-sm-2 header-spacer'></div>
            <a className={'col-xs-12 col-sm-2 header-menu-item home ' + ((this.props.active === 'home') ? 'active' : '')} href='/'>
              Home
            </a>
            <a className={'col-xs-12 col-sm-2 header-menu-item shop ' + ((this.props.active === 'shop') ? 'active' : '')} href='/shop'>
              Shop
            </a>
            <a className={'col-xs-12 col-sm-2 header-menu-item about ' + ((this.props.active === 'about') ? 'active' : '')}  href='/about'>
              About
            </a>
            <div className='col-xs-12 col-sm-2 header-cart-item' onClick={this.showCart.bind(self)}>
              <div className='header-cart-content'>
                <span className='header-cart-lbl'>Cart</span>
                <span className='header-cart-quantity'>{this.state.numItems}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='header-hamburger-btn'>
          <span className='octicon octicon-three-bars' onClick={this.toggleMenu.bind(self)}></span>
        </div>
      </div>
    );
  }
});

module.exports = Header;