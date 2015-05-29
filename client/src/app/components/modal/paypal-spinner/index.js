var $ = require('jquery'),
    PaypalSpinner;

PaypalSpinner = React.createClass({
  _slideIn: function () {
    window.requestAnimationFrame(function () {
      $('.modal-middle').addClass('show-modal');
    });
  },
  componentDidMount: function () {
    this._slideIn();
  },
  componentDidUpdate: function () {
    this._slideIn();
  },
  render: function () {
    return (
      <div className='modal-wrapper'>
        <div className='modal-outer'>
          <div className='modal-middle'>
            <div className='paypal-modal'>
              <h1 className='paypal-modal-title'>Contacting PayPal's Secure Servers</h1>
              <img className='paypal-logo' src="https://www.paypalobjects.com/webstatic/mktg/logo/bdg_secured_by_pp_2line.png"  alt="Secured by PayPal"/>
              <div className="sk-spinner sk-spinner-three-bounce">
                <div className="sk-bounce1"></div>
                <div className="sk-bounce2"></div>
                <div className="sk-bounce3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = PaypalSpinner;