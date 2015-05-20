var HammockBuilderCtrls = require('../hammock-builder-ctrls');

var HammockBuilder = React.createClass({
  getDefaultProps: function () {
    return {
      
    }
  },
  render: function () {
    return (
      <div className='hammock-builder container-fluid'>
        <div className='row'>
          <div className='col-md-8 col-sm-12'></div>
          <div className='col-md-4 col-sm-12'>
            <HammockBuilderCtrls />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = HammockBuilder;