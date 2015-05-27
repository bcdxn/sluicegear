var Hero = React.createClass({
  getInitialState: function () {
    return {
      'heroHeight': window.innerHeight - $('#headerContainer').height() // TODO: also add banner
    };
  },
  
  _onResize: function (e) {
    this.setState({
      'heroHeight': window.innerHeight - $('#headerContainer').height() // TODO: also add banner
    });
  },

  componentDidMount: function () {
    window.addEventListener('resize', this._onResize);
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this._onResize);
  },
  
  _onShopClick: function () {
    window.location.href = '/shop';
  },
  
  render: function () {
    var style = {
          'height': this.state.heroHeight + 'px'
        };
    
    return (
      <div className='hero-wrapper' style={style}>
        <div className='slides'>
          <section className='slide sunset active'></section>
          <section className='slide dock'></section>
          <section className='slide water'></section>
          <section className='slide beach'></section>
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
            <li className='hero-ctrl-btn active' data-slide='sunset'></li>
            <li className='hero-ctrl-btn' data-slide='dock'></li>
            <li className='hero-ctrl-btn' data-slide='water'></li>
            <li className='hero-ctrl-btn' data-slide='beach'></li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = Hero;