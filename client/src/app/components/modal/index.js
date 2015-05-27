var classNames = require('classnames'),
    ErrorModal;

function _close() {
  $('html').removeClass('freeze-page-size');
  $('body').removeClass('freeze-page-size');
  React.unmountComponentAtNode(document.getElementById('modal'));
}

ErrorModal = React.createClass({
  getDefaultProps: function () {
    return {
      level:   'info',
      title:   'Uh Oh!',
      message: 'Something went wrong. Please try again.',
      close:   _close
    };
  },
  
  render: function () {
    var self = this,
        buttonClasses = classNames({
          'btn': true,
          'red': this.props.level === 'error',
          'blue': this.props.level === 'info',
          'shadow': true,
          'standard-modal-btn': true,
          'solid': true
        });
    
    return (
      <div className='modal-wrapper'>
        <div className='modal-outer'>
          <div className='modal-middle'>
            <div className='standard-modal pal'>
              <h1 className='standard-modal-title'>{this.props.title}</h1>
              <p className='standard-modal-message'>{this.props.message}</p>
              <button className={buttonClasses} onClick={this.props.close}>OK</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ErrorModal;