var OrderPreviewItem = require('../order-preview-item'),
    OrderPreviewList;

OrderPreviewList = React.createClass({
  render: function () {
    
    var itemNodes = <div className='container-fluid'></div>
    
    if (this.props.items && this.props.items.length > 0) {
      itemNodes =  this.props.items.map(function (item) {
        return (
          <div className='row'><OrderPreviewItem item={item}/></div>
        );
      });
    }
    
    return (<div className='container-fluid'>{itemNodes}</div>);
  }
});

module.exports = OrderPreviewList;