var Toggler = React.createClass({
  getDefaultProps: function () {
    return {
      on: true,
      leftLbl: 'no',
      rightLbl: 'yes'
    }
  },
  render: function () {
    return (
      <div className='toggler-wrapper'>
        <div className='toggler-wrapper large' onClick={this.props.onToggle}>
          <div className='toggler-lbl no visible'>{this.props.leftLbl}</div>
          <div className={'toggler ' + ((this.props.on) ? 'on' : 'off')}>
            <div className='toggler-switch'></div>
          </div>
          <div className='toggler-lbl yes visible'>{this.props.rightLbl}</div>
        </div>
      </div>
    );
  }
});

module.exports = Toggler;