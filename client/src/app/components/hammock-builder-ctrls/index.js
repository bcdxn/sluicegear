var classNames            = require('classnames'),
    Constants             = require('../../constants/hammock-builder'),
    BuilderActionCreators = require('../../actions/builder-action-creators'),
    BuilderStore          = require('../../stores/builder-store'),
    Toggler               = require('../toggler');

var HammockBuilderCtrls = React.createClass({
  getDefaultProps: function () {
    return {
      'singleDescription': 'Get the comfort you deserve. Single color hammock: 9.5ft long, 4.5ft wide. ',
      'doubleDescription': 'The Double makes sharing easy. Double color hammock: 9.5ft long, 7.5ft wide. ',
      'hammieDescription': 'Because kids like hammocks, too! Single color hammock for kids: 6ft long, 4.5ft wide'
    };
  },
  setHammockModel: function (model) {
    BuilderActionCreators.setHammockModel(model);
  },
  setPrimaryColor: function (color) {
    BuilderActionCreators.setPrimaryColor(color);
  },
  setSecondaryColor: function (color) {
    BuilderActionCreators.setSecondaryColor(color);
  },
  toggleStraps: function () {
    if (BuilderStore.getIncludeStraps()) {
      BuilderActionCreators.setIncludeStraps(false);
    } else {
      BuilderActionCreators.setIncludeStraps(true);
    }
  },
  getBuildPrice: function () {
    var price = 0;
    
    if (this.props.model === Constants.Models.SINGLE) {
      price = Constants.Prices.SINGLE_COST;
    } else if (this.props.model === Constants.Models.DOUBLE) {
      price = Constants.Prices.DOUBLE_COST;
    } else if (this.props.model === Constants.Models.HAMMIE) {
      price = Constants.Prices.HAMMIE_COST;
    } else {
      throw 'Unsupported model type';
    }
    
    if (this.props.includeStraps) {
      price += Constants.Prices.STRAPS_COST;
    }
    
    return price;
  },
  render: function () {
    var classes = classNames({
      'hammock-builder-ctrls':  true,
      'container-fluid': true,
      'single-selected': this.props.model === Constants.Models.SINGLE,
      'double-selected': this.props.model === Constants.Models.DOUBLE,
      'hammie-selected': this.props.model === Constants.Models.HAMMIE
    }),
    secondaryColor = (this.props.secondaryColor)
                        ? this.props.secondaryColor.toLowerCase()
                        : '';
    
    return (
      <div className={classes}>
        <div className='row btn-grp ptm'>
          <button className='btn gray left-btn shadow builder-ctrls-model-btn model-single-btn'
              onClick={this.setHammockModel.bind(this, Constants.Models.SINGLE)}>
            {Constants.Models.SINGLE}
          </button>
          <button className='btn gray middle-btn shadow builder-ctrls-model-btn model-double-btn'
              onClick={this.setHammockModel.bind(this, Constants.Models.DOUBLE)}>
            {Constants.Models.DOUBLE}
          </button>
          <button className='btn gray right-btn shadow builder-ctrls-model-btn model-hammie-btn'
              onClick={this.setHammockModel.bind(this, Constants.Models.HAMMIE)}>
            {Constants.Models.HAMMIE}
          </button>
        </div>
        <div className='row ptl'>
          <div className='info builder-ctrls-msg-box pam'>
            {(this.props.model === Constants.Models.SINGLE)
              ? this.props.singleDescription
              : (this.props.model === Constants.Models.DOUBLE)
                ? this.props.doubleDescription
                : this.props.hammieDescription}
          </div>
        </div>
        
        <div className='row plm ptl prm'>
          <span className='builder-ctrls-lbl'>Choose my hammock's color</span>
        </div>
        
        <div className={'row ptm pbl primary-color-choices ' + this.props.primaryColor.toLowerCase()}>
          <div className='col-xs-2 builder-ctrls-fabric-btn prs'>
            <div className='red-fabric fabric-btn-inner' onClick={this.setPrimaryColor.bind(null, Constants.Colors.RED)}></div>
          </div>
          <div className='col-xs-2 builder-ctrls-fabric-btn prs'>
            <div className='blue-fabric fabric-btn-inner' onClick={this.setPrimaryColor.bind(null, Constants.Colors.BLUE)}></div>
          </div>
          <div className='col-xs-2 builder-ctrls-fabric-btn prs'>
            <div className='tan-fabric fabric-btn-inner' onClick={this.setPrimaryColor.bind(this, Constants.Colors.TAN)}></div>
          </div>
          <div className='col-xs-2 builder-ctrls-fabric-btn prs'>
            <div className='burgundy-fabric fabric-btn-inner' onClick={this.setPrimaryColor.bind(this, Constants.Colors.BURGUNDY)}></div>
          </div>
          <div className='col-xs-2 builder-ctrls-fabric-btn prs'>
            <div className='turquoise-fabric fabric-btn-inner' onClick={this.setPrimaryColor.bind(this, Constants.Colors.TURQUOISE)}></div>
          </div>
          <div className='col-xs-2 builder-ctrls-fabric-btn prs'>
            <div className='black-fabric fabric-btn-inner' onClick={this.setPrimaryColor.bind(this, Constants.Colors.BLACK)}></div>
          </div>
        </div>
        
        <div className={'row optional-section pbl ' + ((this.props.model !== Constants.Models.DOUBLE) ? ('folded') : '')}>
          <div className='plm prm builder-ctrls-lbl'>
            Choose my hammock's accent color
          </div>
          
          <div className={'ptm secondary-color-choices ' + secondaryColor}>
            <div className='col-xs-2 builder-ctrls-fabric-btn prs'>
              <div className='red-fabric fabric-btn-inner' onClick={this.setSecondaryColor.bind(null, Constants.Colors.RED)}></div>
            </div>
            <div className='col-xs-2 builder-ctrls-fabric-btn prs'>
              <div className='blue-fabric fabric-btn-inner' onClick={this.setSecondaryColor.bind(null, Constants.Colors.BLUE)}></div>
            </div>
            <div className='col-xs-2 builder-ctrls-fabric-btn prs'>
              <div className='tan-fabric fabric-btn-inner' onClick={this.setSecondaryColor.bind(null, Constants.Colors.TAN)}></div>
            </div>
            <div className='col-xs-2 builder-ctrls-fabric-btn prs'>
              <div className='burgundy-fabric fabric-btn-inner' onClick={this.setSecondaryColor.bind(null, Constants.Colors.BURGUNDY)}></div>
            </div>
            <div className='col-xs-2 builder-ctrls-fabric-btn prs'>
              <div className='turquoise-fabric fabric-btn-inner' onClick={this.setSecondaryColor.bind(null, Constants.Colors.TURQUOISE)}></div>
            </div>
            <div className='col-xs-2 builder-ctrls-fabric-btn prs'>
              <div className='black-fabric fabric-btn-inner' onClick={this.setSecondaryColor.bind(null, Constants.Colors.BLACK)}></div>
            </div>
          </div>
        </div>
        
        <div className='row builder-ctrls-separator'><div className='inner'></div></div>
        
        <div className='row ptl pbl'>
          <div className='col-xs-6 builder-ctrls-lbl straps-lbl'>I need straps</div>
          <div className='col-xs-6'>
            <div className='straps-toggler'>
              <Toggler on={this.props.includeStraps} onToggle={this.toggleStraps.bind(this)} />
            </div>
          </div>
        </div>
        
        <div className='row builder-ctrls-separator'><div className='inner'></div></div>
        
        <div className='row ptl pbl'>
          <div className='col-xs-12 builder-build-price'>${(this.getBuildPrice() / 100).toFixed(2)}</div>
        </div>
        
        <div className='row pbl'>
          <button className='btn green solid shadow add-to-cart-btn'>Add to cart</button>
        </div>
      </div>
    );
  }
});

module.exports = HammockBuilderCtrls;