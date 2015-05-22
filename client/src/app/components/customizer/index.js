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
    CustomizerStore.addChangeListener(this._onCustomBuildChange); // Customized build has changed
    ProductStore.addChangeListener(this._onProductsChange); // Initial load of products is complete
  },

  componentWillUnmount: function () {
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
          <div className='col-sm-7 ptl'>
            <CustomizerPreviewer
              model={this.state.model}
              primaryColor={this.state.primaryColor}
              secondaryColor={this.state.secondaryColor}
              includeStraps={this.state.includeStraps}
              products={this.state.products} />
          </div>
          <div className='col-sm-5 ptl'>
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