var OrderPreviewItem = React.createClass({
  render: function () {
    return (
      <div className='row order-preview-item'>
        <div className='col-xs-4 order-preview-product-img-wrapper'>
          <img src={'/img/products/' + this.props.item.sku + '.jpg'} />
        </div>
        <div className='col-xs-5 order-preview-description'>{this.props.item.description}</div>
        <div className='col-xs-3 order-preview-price'>${(this.props.item.price / 100).toFixed(2)}</div>
      </div>
    );
  }
});

module.exports = OrderPreviewItem;

