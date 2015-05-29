var classNames = require('classnames'),
    $          = require('jquery'),
    Modal;

function _close() {
  $('html').removeClass('freeze-page-size');
  $('body').removeClass('freeze-page-size');
  React.unmountComponentAtNode(document.getElementById('modal'));
}

Modal = React.createClass({
  getDefaultProps: function () {
    return {
      level:   'info',
      title:   'Uh Oh!',
      message: 'Something went wrong. Please try again.',
      close:   _close
    };
  },
  
  componentDidMount: function () {
    this._slideIn();
  },
  componentDidUpdate: function () {
    this._slideIn();
  },
  
  _slideIn: function () {
    window.requestAnimationFrame(function () {
      $('.modal-middle').addClass('show-modal');
    });
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

module.exports = Modal;