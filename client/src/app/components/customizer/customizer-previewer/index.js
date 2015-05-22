var classNames          = require('classnames'),
    CustomizerConstants = require('../../../constants/customizer'),
    CustomizerStore     = require('../../../stores/customizer'),
    ProductsStore       = require('../../../stores/product'),
    Utils               = require('../../../utils');

var CustomizerPreviewer = React.createClass({
  getInitialState: function () {
    return {
      'selectedThumbnail': CustomizerConstants.PreviewImgTypes.MAIN_HAMMOCK,
    };
  },
  
  selectHammockThumb: function () {
    this.setState({
      'selectedThumbnail': CustomizerConstants.PreviewImgTypes.MAIN_HAMMOCK,
    });
  },
  
  selectBagThumb: function () {
    this.setState({
      'selectedThumbnail': CustomizerConstants.PreviewImgTypes.HAMMOCK_BAG,
    });
  },
  
  selectStrapsThumb: function () {
    this.setState({
      'selectedThumbnail': CustomizerConstants.PreviewImgTypes.STRAPS,
    });
  },
  
  getHammockImgSrc: function (sku) {
    return (sku)
            ? 'url(/img/products/' + sku + '.jpg)'
            : 'none';
  },
  
  getHammockBagImgSrc: function (sku) {
    return (sku)
            ? ('url(/img/bags/' + this.props.primaryColor +
                        ((this.props.secondaryColor)
                          ? '-' + this.props.secondaryColor
                          : '') + '.jpg)').toLowerCase()
            : 'none';
  },
  
  getStrapsImgSrc: function () {
    return 'url(/img/products/STRAP.jpg)';
  },
  
  getMainPreviewerSrc: function (sku) {
    var src;
    
    switch (this.state.selectedThumbnail)  {
      case CustomizerConstants.PreviewImgTypes.MAIN_HAMMOCK:
        src = this.getHammockImgSrc(sku);
        break;
      case CustomizerConstants.PreviewImgTypes.HAMMOCK_BAG:
        src = this.getHammockBagImgSrc(sku);
        break;
      case CustomizerConstants.PreviewImgTypes.STRAPS:
        src =  this.getStrapsImgSrc();
        break;
      default:
        src = this.getHammockImgSrc(sku);
        break;
    }
    
    return src;
  },
  
  componentDidMount: function () {
    CustomizerStore.addChangeListener(this._onCustomBuildChange); // Customized build has changed
  },
  
  componentWillUnmount: function () {
    CustomizerStore.removeChangeListener(this._onCustomBuildChange);
  },
  
  _onCustomBuildChange: function () {
    if (this.state.selectedThumbnail === CustomizerConstants.PreviewImgTypes.STRAPS &&
        !CustomizerStore.getIncludeStraps()) {
      this.setState({
        'selectedThumbnail': CustomizerConstants.PreviewImgTypes.MAIN_HAMMOCK
      });
    }
  },
  
  render: function () {
    var classes = classNames({
          'builder-preview': true,
          'container-fluid': true
        }),
        currentProduct = ProductsStore.getProductByHash(Utils.getHammockHash({
          'model': this.props.model,
          'primaryColor': this.props.primaryColor,
          'secondaryColor': this.props.secondaryColor,
          'includeStraps': this.props.includeStraps
        })),
        currentSku = (currentProduct)
                        ? currentProduct.sku
                        : null,
        mainImgBgStyle = {
          'backgroundImage': this.getMainPreviewerSrc(currentSku)
        },
        thumb1Style = {
          'backgroundImage': this.getHammockImgSrc(currentSku)
        },
        thumb2Style = {
          'backgroundImage': this.getHammockBagImgSrc(currentSku)
        },
        thumb3Style = {
          'backgroundImage': this.getStrapsImgSrc(),
          'display': ((this.props.includeStraps) ? 'block' : 'none')
        };
    
    return (
      <div className={classes}>
        <div className='row builder-preview-title'>Hammock Preview: </div>
        <div className='row builder-preview-main'>
          <div className={'row builder-preview-main-img ' +
            ((this.state.selectedThumbnail === CustomizerConstants.PreviewImgTypes.MAIN_HAMMOCK)
              ? 'wide-previewer-img'
              : 'tall-previewer-img')} style={mainImgBgStyle}></div>
        </div>
        <div className='row ptm'>
          <div className='col-xs-3 builder-preview-thumbnail'>
            <div className='builder-preview-thumbnail-img wide-thumb' onClick={this.selectHammockThumb} style={thumb1Style}></div>
          </div>
          <div className='col-xs-3 builder-preview-thumbnail'>
            <div className='builder-preview-thumbnail-img tall-thumb' onClick={this.selectBagThumb} style={thumb2Style}></div>
          </div>
          <div className='col-xs-3 builder-preview-thumbnail'>
            <div className='builder-preview-thumbnail-img tall-thumb' onClick={this.selectStrapsThumb} style={thumb3Style}></div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CustomizerPreviewer;