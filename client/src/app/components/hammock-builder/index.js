var HammockBuilderCtrls = require('../hammock-builder-ctrls'),
    BuilderStore  = require('../../stores/builder-store');

var HammockBuilder = React.createClass({
  getInitialState: function () {
    return {
      'model':          BuilderStore.getHammockModel(),
      'primaryColor':   BuilderStore.getPrimaryColor(),
      'secondaryColor': BuilderStore.getSecondaryColor(),
      'includeStraps':  BuilderStore.getIncludeStraps()
    };
  },
  componentDidMount: function () {
    window.addEventListener('resize', this.handleResize);
    BuilderStore.addChangeListener(this._onCustomBuildChange);
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this.handleResize);
    BuilderStore.removeChangeListener(this._onCustomBuildChange);
  },
  
  _onCustomBuildChange: function () {
    this.setState({
      'model':          BuilderStore.getHammockModel(),
      'primaryColor':   BuilderStore.getPrimaryColor(),
      'secondaryColor': BuilderStore.getSecondaryColor(),
      'includeStraps':  BuilderStore.getIncludeStraps()
    });
  },
  
  render: function () {
    return (
      <div className='hammock-builder container-fluid'>
        <div className='row'>
          <div className='col-md-8 col-sm-12 ptl'></div>
          <div className='col-md-4 col-sm-12 ptl'>
            <HammockBuilderCtrls
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

module.exports = HammockBuilder;