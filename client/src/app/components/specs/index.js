var Specs = React.createClass({
  getInitialState: function () {
    return {
      'showFullSpecs': false
    };
  },
  
  toggle: function () {
    this.setState({ 'showFullSpecs': !this.state.showFullSpecs });
  },
  
  render: function () {
    var self = this;
    
    return (
      <div className='spec-summary container-fluid'>
        <div className='row'>
          <div className='col-sm-3 col-xs-6 spec-icon-wrapper'>
            <img className='spec-icon' src='img/spec-icons/icon-dimensions.png'  alt='dimensions' />
            <div className='spec-icon-caption'>Choose from 3 sizes</div>
          </div>
          <div className='col-sm-3 col-xs-6 spec-icon-wrapper'>
            <img className='spec-icon' src='img/spec-icons/icon-durable.png'  alt='durable' />
            <div className='spec-icon-caption'>Holds up to 400lbs</div>
          </div>
          <div className='col-sm-3 col-xs-6 spec-icon-wrapper'>
            <img className='spec-icon' src='img/spec-icons/icon-weight.png'  alt='weight' />
            <div className='spec-icon-caption'>Lightweight &amp; portable</div>
          </div>
          <div className='col-sm-3 col-xs-6 spec-icon-wrapper'>
            <img className='spec-icon' src='img/spec-icons/icon-warranty.png'  alt='warranty' />
            <div className='spec-icon-caption'>2 year warranty</div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12 pbs ptm pbl learn-more-wrapper'>
            <span className='learn-more-link-btn spec-btn' onClick={this.toggle.bind(self)}>See product details</span>
            <span className={'learn-more-link-arrow large '+ ((this.state.showFullSpecs) ? 'rotated' : '')}></span>
          </div>
        </div>
        <div className='row'>
          <div className={'full-spec-container ' + ((this.state.showFullSpecs) ? '' : 'hide')}>
            <h2 className='specs-header pbl'>Hammock Specs</h2>
            <table className='sluice-table'>
              <thead>
                <tr>
                  <th></th> 
                  <th colSpan>
                    <div className='spec-table-title'>Single</div>
                    <div className='spec-table-desc'>Your own personal retreat</div>
                  </th>
                  <th colSpan>
                    <div className='spec-table-title'>Double</div>
                    <div className='spec-table-desc'>Enough room to share</div>
                  </th>
                  <th colSpan>
                    <div className='spec-table-title'>Kid's Hammie</div>
                    <div className='spec-table-desc'>Made just for kids</div>
                  </th>
                </tr>
              </thead>
              <tbody>
              <tr>
                  <th className='table-lbl'>Price</th>
                  <th>$59.95</th>
                  <th>$84.95</th>
                  <th>$49.95</th>
                </tr>
                <tr>
                  <th className='table-lbl'>Color</th>
                  <th>Single color</th>
                  <th>Double color</th>
                  <th>Single color</th>
                </tr>
                <tr>
                  <th className='table-lbl'>Unfolded dimensions (L x W)</th>
                  <th>9.5ft x 4.5ft</th>
                  <th>9.5ft x 7.5 ft</th>
                  <th>6.5ft x 4.5ft</th>
                </tr>
                <tr>
                  <th className='table-lbl'>Packed dimensions (L x W x H)</th>
                  <th>8in x 5in x 5in</th>
                  <th>10in x 6in x 6in</th>
                  <th>7in x 4in x 4in</th>
                </tr>
                <tr>
                  <th className='table-lbl'>Product weight</th>
                  <th>21oz</th>
                  <th>35oz</th>
                  <th>15oz</th>
                </tr>
                <tr>
                  <th className='table-lbl'>Max Height recommendation</th>
                  <th colSpan='2'>6ft-6in</th>
                  <th>4ft</th>
                </tr>
                <tr>
                  <th className='table-lbl'>Max weight recommendation</th>
                  <th colSpan='2'>400lb</th>
                  <th>200lb</th>
                </tr>
                <tr>
                  <th className='table-lbl'>Materials and construction</th>
                  <th colSpan='3'>
                    <ul>
                      <li>100% nylon fabric, breathable and laundered for softness</li>
                      <li>Resistant to water, abrasion, and UV rays</li>
                      <li>Heavy duty polyester triple stitching</li>
                      <li>Mating snaps on hammock to attach stuff sack and accessories</li>
                    </ul>
                  </th>
                </tr>
                <tr>
                  <th className='table-lbl'>Accessories</th>
                  <th colSpan='3'>
                    <ul>
                      <li>Quick-action double ended stuff sack included</li>
                      <li>Two built-in Black Diamond aluminum climbing carabiners included</li>
                      <li>Straps are sold separately</li>
                    </ul>
                  </th>
                </tr>
                <tr>
                  <th className='table-lbl'>Country of origin</th>
                  <th colSpan='3'>USA</th>
                </tr>
                <tr>
                  <th className='table-lbl'>Care Instructions</th>
                  <th colSpan='3'>Easy disassembly for cold machine wash and hang dry </th>
                </tr>
                <tr>
                  <th className='table-lbl'>Warranty</th>
                  <th colSpan='3'>Two year manufacturer's craftsmanship warranty</th>
                </tr>
              </tbody>
            </table>
            <h2 className='specs-header pbl'>Straps Specs</h2>
            <table className='sluice-table'>
              <thead>
                <tr>
                  <th></th> 
                  <th>
                    <div className='spec-table-title'>Main Straps</div>
                    <div className='spec-table-desc'>All you need to setup any hammock</div>
                  </th>
                  <th>
                    <div className='spec-table-title'>Aux Straps</div>
                    <div className='spec-table-desc'>Extend your setup or hang other gear</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className='table-lbl'>Price</th>
                  <th>$19.95</th>
                  <th>$9.95</th>
                </tr>
                <tr>
                  <th className='table-lbl'>Length</th>
                  <th>9.5ft each</th>
                  <th>4.5ft each</th>
                </tr>
                <tr>
                  <th className='table-lbl'>Product weight</th>
                  <th>4oz each (8oz/pair)</th>
                  <th>1.5oz each (3oz/pair)</th>
                </tr>
                <tr>
                  <th className='table-lbl'>Max weight recommendation</th>
                  <th colSpan='2'>250lb per strap</th>
                </tr>
                <tr>
                  <th className='table-lbl'>Attachment method</th>
                  <th>
                    <ul>
                      <li>No knots required</li>
                      <li>One large loop & 6 small loops per strap</li>
                    </ul>
                  </th>
                  <th>
                    <ul>
                      <li>No knots required</li>
                      <li>One large loop at each end of strap</li>
                    </ul>
                  </th>
                </tr>
                <tr>
                  <th className='table-lbl'>Materials and construction</th>
                  <th colSpan='2'>
                    <ul>
                      <li>3/4in no-stretch tubular polyester webbing</li>
                      <li>Heavy duty triple stitched loops</li>
                      <li>Abrasion resistant and tree bark friendly</li>
                    </ul>
                  </th>
                </tr>
                <tr>
                  <th className='table-lbl'>Accessories</th>
                  <th>Gear Taco with snaps included</th>
                  <th>Gear Taco not included</th>
                </tr>
                <tr>
                  <th className='table-lbl'>Country of origin</th>
                  <th colSpan='2'>USA</th>
                </tr>
                <tr>
                  <th className='table-lbl'>Warranty</th>
                  <th colSpan='2'>Two year manufacturer's craftsmanship warranty</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Specs;