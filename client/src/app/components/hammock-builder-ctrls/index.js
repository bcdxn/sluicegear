var classNames              = require('classnames'),
    HammockBuilderConstants = require('../../constants/hammock-builder');

var HammockBuilderCtrls = React.createClass({
  getDefaultProps: function () {
    return {
      colors: ['red', 'green'],
      singleDescription: 'Get the comfort you deserve. Single color hammock: 9.5ft long, 4.5ft wide. ',
      doubleDescription: 'The Double makes sharing easy. Double color hammock: 9.5ft long, 7.5ft wide. ',
      hammieDescription: 'Because kids like hammocks, too. Single color hammock for kids: 6ft long, 4.5ft wide'
    };
  },
  getInitialState: function () {
    return {
      model: HammockBuilderConstants.Models.SINGLE,
      primaryColor: this.props.colors[0],
      secondaryColor: this.props.colors[1],
      includeStraps: true
    };
  },
  render: function () {
    var classes = classNames({
      'hammock-builder-ctrls':  true,
      'container-fluid': true,
    });
    
    return (
      <div className={classes}>
        <div className='btn-grp'>
          <button className='btn gray left-btn builder-ctrls-model-btn'>{HammockBuilderConstants.Models.SINGLE}</button>
          <button className='btn gray middle-btn builder-ctrls-model-btn'>{HammockBuilderConstants.Models.SINGLE}</button>
          <button className='btn gray right-btn builder-ctrls-model-btn'>{HammockBuilderConstants.Models.SINGLE}</button>
        </div>
      </div>
    );
  }
});

module.exports = HammockBuilderCtrls;