var $ = require('jquery'),
    Hero ;

Hero = React.createClass({
  getInitialState: function () {
    console.log($('.header-wrapper').height() + ' -- ' + $('.learn-more-banner').height())
    return {
      'heroHeight': window.innerHeight - $('.header-wrapper').outerHeight() - $('.learn-more-banner').outerHeight(),
      'activeSlide': 0,
      'timeoutId': null
    };
  },
  
  _onResize: function (e) {
    this.setState({
      'heroHeight': window.innerHeight - $('.header-wrapper').outerHeight() - $('.learn-more-banner').outerHeight()
    });
  },

  componentDidMount: function () {
    window.addEventListener('resize', this._onResize);
    this._startCarousel();
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this._onResize);
  },
  
  _onShopClick: function () {
    window.location.href = '/shop';
  },
  
  _startCarousel: function (currIndex) {
    var btnIndex = currIndex || 0,
        timeoutId,
        self = this;
  
    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId);
    }
    
    timeoutId = setTimeout(function () {
  
      if (btnIndex < 3) {
        btnIndex += 1;
      } else {
        btnIndex = 0;
      }
  
      self.setState({ 'activeSlide': btnIndex });
      self._startCarousel(btnIndex);
    }, 4000);
    
    this.setState({ 'timeoutId': timeoutId });
  },
  
  render: function () {
    var style = {
          'height': this.state.heroHeight + 'px'
        };
    
    return (
      <div className='hero-wrapper' style={style}>
        <div className='slides'>
          <section className={'slide sunset ' + ((this.state.activeSlide === 0) ? 'active' : '')}></section>
          <section className={'slide dock ' + ((this.state.activeSlide === 1) ? 'active' : '')}></section>
          <section className={'slide water ' + ((this.state.activeSlide === 2) ? 'active' : '')}></section>
          <section className={'slide beach ' + ((this.state.activeSlide === 3) ? 'active' : '')}></section>
        </div>
        <div className='banner-copy-wrapper'>
          <div className='banner-copy'>
            <div className='banner-copy-inner'>
              <h1>Sluice Hammocks</h1>
              <h2>Create your fun</h2>
              <h2 className='small'>Personalized hammocks made in the USA</h2>
              <button className='btn green solid shadow hero-btn' onClick={this._onShopClick}>Shop now</button>
            </div>
          </div>
        </div>
        <div className='hero-ctrls'>
          <ul className='hero-ctrls-inner'>
            <li className={'hero-ctrl-btn ' + ((this.state.activeSlide === 0) ? 'active' : '')}></li>
            <li className={'hero-ctrl-btn ' + ((this.state.activeSlide === 1) ? 'active' : '')}></li>
            <li className={'hero-ctrl-btn ' + ((this.state.activeSlide === 2) ? 'active' : '')}></li>
            <li className={'hero-ctrl-btn ' + ((this.state.activeSlide === 3) ? 'active' : '')} ></li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = Hero;