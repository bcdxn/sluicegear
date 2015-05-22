var classNames    = require('classnames'),
    Constants     = require('../../constants/hammock-builder'),
    BuilderStore  = require('../../stores/builder-store'),
    ProductsStore = require('../../stores/products-store'),
    Util          = require('../common/util');

var BuilderPreview = React.createClass({
  getInitialState: function () {
    return {
      'selectedThumbnail': Constants.Previews.MAIN_HAMMOCK,
    };
  },
  render: function () {
    var classes = classNames({
          'builder-preview': true,
          'container-fluid': true
        }),
        currentProduct = ProductsStore.getProductByHash(Util.getBuildHash({
          'model': this.props.model,
          'primaryColor': this.props.primaryColor,
          'secondaryColor': this.props.secondaryColor,
          'includeStraps': this.props.includeStraps
        })),
        currentSku = (currentProduct)
                        ? currentProduct.sku
                        : '',
        hammockImgSrc = '/img/products/' + currentSku + '.jpg',
        bagImgSrc     = '/img/bags/' + this.props.primaryColor +
                        ((this.props.secondaryColor)
                          ? '-' + this.props.secondaryColor
                          : '') + '.jpg',
        strapsImgSrc  = '/img/products/SIN-R.jpg',
        mainImgBgStyle = {
          'backgroundImage': 'url(' + hammockImgSrc + ')'
        },
        thumb1Style = {
          'backgroundImage': 'url(' + hammockImgSrc + ')'
        },
        thumb2Style = {
          'backgroundImage': 'url(' + bagImgSrc + ')'
        },
        thumb3Style = {
          'backgroundImage': 'url(/img/products/STRAP.jpg)',
          'display': ((this.props.includeStraps) ? 'block' : 'none')
        };
    
    return (
      <div className={classes}>
        <div className='row builder-preview-title'>Hammock Preview: </div>
        <div className='row builder-preview-main'>
          <div className='row builder-preview-main-img' style={mainImgBgStyle}></div>
        </div>
        <div className='row ptm'>
          <div className='col-md-3 builder-preview-thumbnail'>
            <div className='builder-preview-thumbnail-img wide-thumb' style={thumb1Style}></div>
          </div>
          <div className='col-md-3 builder-preview-thumbnail'>
            <div className='builder-preview-thumbnail-img tall-thumb' style={thumb2Style}></div>
          </div>
          <div className='col-md-3 builder-preview-thumbnail'>
            <div className='builder-preview-thumbnail-img tall-thumb' style={thumb3Style}></div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = BuilderPreview;