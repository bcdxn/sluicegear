var CustomizerCtrls     = require('./customizer-ctrls'),
    CustomizerPreviewer = require('./customizer-previewer'),
    CustomizerStore     = require('../../stores/customizer'),
    ProductStore       = require('../../stores/product'),
    Customizer;

Customizer = React.createClass({
  getInitialState: function () {
    return {
      'model':          CustomizerStore.getHammockModel(),
      'primaryColor':   CustomizerStore.getPrimaryColor(),
      'secondaryColor': CustomizerStore.getSecondaryColor(),
      'includeStraps':  CustomizerStore.getIncludeStraps()
    };
  },
  componentDidMount: function () {
    window.addEventListener('resize', this.handleResize);
    CustomizerStore.addChangeListener(this._onCustomBuildChange); // Customized build has changed
    ProductStore.addChangeListener(this._onProductsChange); // Initial load of products is complete
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this.handleResize);
    CustomizerStore.removeChangeListener(this._onCustomBuildChange);
    ProductStore.removeChangeListener(this._onProductsChange);
  },
  
  _onCustomBuildChange: function () {
    this.setState({
      'model':          CustomizerStore.getHammockModel(),
      'primaryColor':   CustomizerStore.getPrimaryColor(),
      'secondaryColor': CustomizerStore.getSecondaryColor(),
      'includeStraps':  CustomizerStore.getIncludeStraps()
    });
  },
  
  _onProductsChange: function () {
    this.setState(); // Force re-render so product images will be loaded
  },
  
  render: function () {
    return (
      <div className='hammock-builder container-fluid'>
        <div className='row'>
          <div className='col-md-7 col-sm-12 ptl'>
            <CustomizerPreviewer
              model={this.state.model}
              primaryColor={this.state.primaryColor}
              secondaryColor={this.state.secondaryColor}
              includeStraps={this.state.includeStraps}
              products={this.state.products} />
          </div>
          <div className='col-md-5 col-sm-12 ptl'>
            <CustomizerCtrls
              model={this.state.model}
              primaryColor={this.state.primaryColor}
              secondaryColor={this.state.secondaryColor}
              includeStraps={this.state.includeStraps} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Customizer;