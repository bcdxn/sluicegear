var Footer = React.createClass({
  render: function () {
    return (
      <div className='footer-wrapper'>
        <div className='footer container-fluid'>
          <div className='row'>
            <div className='col l12 footer-line-1'>
              &copy; 2013-2015 Sluice, All rights reserved. | For questions, wholesale inquiries email <span id='emailAddress'>info@sluicegear.com</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Footer;