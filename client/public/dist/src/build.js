(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/app/app.js":[function(require,module,exports){
var Cart = require('./cart');

module.exports = React.render(React.createElement(Cart, null), document.getElementById('app'));

},{"./cart":"c:\\Users\\Benjamin\\Projects\\sluicegear\\client\\src\\app\\cart\\index.js"}],"c:\\Users\\Benjamin\\Projects\\sluicegear\\client\\src\\app\\cart-item-list\\index.js":[function(require,module,exports){
var CartItem = require('../cart-item');

var CartItemList = React.createClass({displayName: "CartItemList",
  render: function () {
    var itemNodes =  this.props.items.map(function (item) {
      return (
        React.createElement("li", null, React.createElement(CartItem, {sku: item.sku, description: item.description, price: item.price}))
      );
    });
    
    return (
      React.createElement("ul", {class: "cart-items-list"}, 
        itemNodes
      )
    );
  }
});

module.exports = CartItemList;

},{"../cart-item":"c:\\Users\\Benjamin\\Projects\\sluicegear\\client\\src\\app\\cart-item\\index.js"}],"c:\\Users\\Benjamin\\Projects\\sluicegear\\client\\src\\app\\cart-item\\index.js":[function(require,module,exports){
var CartItem = React.createClass({displayName: "CartItem",
  render: function () {
    var imageSource = '/img/products/' + this.props.sku + '.jpg';
    
    return (
      React.createElement("div", {className: "cart-item"}, 
        React.createElement("div", {className: "cart-item-img-wrapper"}, 
          React.createElement("img", {src: imageSource})
        ), 
        React.createElement("div", {className: "cart-item-details"}, 
          React.createElement("div", {className: "cart-item-description"}, 
            this.props.description
          ), 
          React.createElement("div", {className: "cart-item-price"}, 
              "$", (this.props.price / 100).toFixed(2)
          )
        ), 
        React.createElement("div", {className: "cart-item-remove-wrapper"}, 
          React.createElement("button", {className: "cart-item-remove-btn", title: "remove"}, "x")
        )
      )
    );
  }
});

module.exports = CartItem;

},{}],"c:\\Users\\Benjamin\\Projects\\sluicegear\\client\\src\\app\\cart\\index.js":[function(require,module,exports){
var CartItemList = require('../cart-item-list'),
    classNames    = require('classnames');

/* sample items
[{'sku': 'SIN-R', 'description': 'Single-wide red hammock', 'price': 5995 }
,{'sku': 'SIN-L', 'description': 'Double-wide blue hammock', 'price': 5995 }]
*/

var Cart = React.createClass({displayName: "Cart",
  getDefaultProps: function() {
    return {
      freeShippingMin: 15000,
      shippingPrice: 895,
      emptyCartMsg: 'Your cart is empty'
    };
  },
  getInitialState: function () {
    return {
      // Display logic attributes
      'display': {
        'cartHeight': window.innerHeight
      },
      // Business logic attributes
      'model': {
        'salesTax':   0,
        'adjustment': 0,
        'items':      [{'sku': 'SIN-R', 'description': 'Single-wide red hammock', 'price': 5995 }
,{'sku': 'SIN-L', 'description': 'Double-wide blue hammock', 'price': 5995 }],
        'coupon':     {}
      }
    };
  },

  handleResize: function(e) {
    this.state.display.cartHeight = window.innerHeight;
    this.setState({ 'display': this.state.display });
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  render: function () {
    var cartStyle = {
          height: this.state.display.cartHeight
        },
        cartClasses = classNames({
          'shopping-cart':       true,
          'shopping-cart-empty': this.state.model.items.length < 1,
        }),
        checkoutBtnClasses = classNames({
          'btn': true, 'green': true, 'solid': true, 'right-btn': true,
          'shadow': true, 'cart-checkout-btn': true,
          'disabled': this.state.model.items.length < 1
        }),
        itemsLbl        = ((this.state.model.items.length === 1) ? ' item' : ' items'),
        itemsTotalPrice = 0,
        shipping        = this.props.shippingPrice;
        
        this.state.model.items.forEach(function (item) {
          itemsTotalPrice += item.price;
        });
        
        if (itemsTotalPrice >= this.props.freeShippingMin) {
          shipping = 0;
        }

    return (
      React.createElement("div", {className: cartClasses, style: cartStyle}, 
        React.createElement("div", {className: "shopping-cart-global-ctrls"}, 
          React.createElement("div", {className: "btn-grp"}, 
            React.createElement("button", {className: "btn blue solid left-btn shadow cart-close-btn"}, "Keep Shopping"), 
            React.createElement("button", {className: checkoutBtnClasses}, "Checkout")
          )
        ), 
        React.createElement("div", {className: "empty-cart-msg ptl"}, this.props.emptyCartMsg), 
        React.createElement("div", {className: "cart-summary ptl prm pbl plm"}, 
          React.createElement("ul", null, 
            React.createElement("li", {className: "cart-summary-line-item"}, 
              React.createElement("span", {className: "cart-summary-lbl"}, this.state.model.items.length, " ", itemsLbl), 
              React.createElement("span", {className: "cart-summary-val"}, "$", (itemsTotalPrice / 100).toFixed(2))
            ), 
            React.createElement("li", {className: "cart-summary-line-item ptl"}, 
              React.createElement("span", {className: "cart-summary-lbl"}, "Shipping"), 
              React.createElement("span", {className: "cart-summary-val"}, "$", (shipping / 100).toFixed(2))
            ), 
            React.createElement("li", {className: "shopping-cart-separator ptl pbl"}, React.createElement("div", {className: "inner"})), 
            React.createElement("li", {className: "cart-summary-line-item"}, 
              React.createElement("span", {className: "cart-summary-lbl"}, "Total"), 
              React.createElement("span", {className: "cart-summary-val"}, 
                "$", ((itemsTotalPrice + shipping + this.state.model.adjustment) / 100).toFixed(2)
              )
            )
          )
        ), 
        React.createElement("div", {className: "shipping-msg mtl mbl"}, 
          "FREE SHIPPING ON ORDERS OVER $", (this.props.freeShippingMin / 100).toFixed(2)
        ), 
        React.createElement(CartItemList, {items: this.state.model.items})
      )
    )
  }
});

module.exports = Cart;

},{"../cart-item-list":"c:\\Users\\Benjamin\\Projects\\sluicegear\\client\\src\\app\\cart-item-list\\index.js","classnames":"c:\\Users\\Benjamin\\Projects\\sluicegear\\node_modules\\classnames\\index.js"}],"c:\\Users\\Benjamin\\Projects\\sluicegear\\node_modules\\classnames\\index.js":[function(require,module,exports){
/*!
  Copyright (c) 2015 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

function classNames () {
	'use strict';

	var classes = '';

	for (var i = 0; i < arguments.length; i++) {
		var arg = arguments[i];
		if (!arg) continue;

		var argType = typeof arg;

		if ('string' === argType || 'number' === argType) {
			classes += ' ' + arg;

		} else if (Array.isArray(arg)) {
			classes += ' ' + classNames.apply(null, arg);

		} else if ('object' === argType) {
			for (var key in arg) {
				if (arg.hasOwnProperty(key) && arg[key]) {
					classes += ' ' + key;
				}
			}
		}
	}

	return classes.substr(1);
}

// safely export classNames for node / browserify
if (typeof module !== 'undefined' && module.exports) {
	module.exports = classNames;
}

/* global define */
// safely export classNames for RequireJS
if (typeof define !== 'undefined' && define.amd) {
	define('classnames', [], function() {
		return classNames;
	});
}

},{}]},{},["./src/app/app.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjOlxcVXNlcnNcXEJlbmphbWluXFxQcm9qZWN0c1xcc2x1aWNlZ2VhclxcY2xpZW50XFxzcmNcXGFwcFxcYXBwLmpzIiwiYzpcXFVzZXJzXFxCZW5qYW1pblxcUHJvamVjdHNcXHNsdWljZWdlYXJcXGNsaWVudFxcc3JjXFxhcHBcXGNhcnQtaXRlbS1saXN0XFxpbmRleC5qcyIsImM6XFxVc2Vyc1xcQmVuamFtaW5cXFByb2plY3RzXFxzbHVpY2VnZWFyXFxjbGllbnRcXHNyY1xcYXBwXFxjYXJ0LWl0ZW1cXGluZGV4LmpzIiwiYzpcXFVzZXJzXFxCZW5qYW1pblxcUHJvamVjdHNcXHNsdWljZWdlYXJcXGNsaWVudFxcc3JjXFxhcHBcXGNhcnRcXGluZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRTdCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxvQkFBQyxJQUFJLEVBQUEsSUFBQSxDQUFHLENBQUEsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7QUNGdkUsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDOztBQUV2QyxJQUFJLGtDQUFrQyw0QkFBQTtFQUNwQyxNQUFNLEVBQUUsWUFBWTtJQUNsQixJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLEVBQUU7TUFDcEQ7UUFDRSxvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLG9CQUFDLFFBQVEsRUFBQSxDQUFBLENBQUMsR0FBQSxFQUFHLENBQUUsSUFBSSxDQUFDLEdB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IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIENhcnQgPSByZXF1aXJlKCcuL2NhcnQnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVhY3QucmVuZGVyKDxDYXJ0IC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpOyIsInZhciBDYXJ0SXRlbSA9IHJlcXVpcmUoJy4uL2NhcnQtaXRlbScpO1xyXG5cclxudmFyIENhcnRJdGVtTGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBpdGVtTm9kZXMgPSAgdGhpcy5wcm9wcy5pdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8bGk+PENhcnRJdGVtIHNrdT17aXRlbS5za3V9IGRlc2NyaXB0aW9uPXtpdGVtLmRlc2NyaXB0aW9ufSBwcmljZT17aXRlbS5wcmljZX0vPjwvbGk+XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHVsIGNsYXNzPSdjYXJ0LWl0ZW1zLWxpc3QnPlxyXG4gICAgICAgIHtpdGVtTm9kZXN9XHJcbiAgICAgIDwvdWw+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENhcnRJdGVtTGlzdDsiLCJ2YXIgQ2FydEl0ZW0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaW1hZ2VTb3VyY2UgPSAnL2ltZy9wcm9kdWN0cy8nICsgdGhpcy5wcm9wcy5za3UgKyAnLmpwZyc7XHJcbiAgICBcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdjYXJ0LWl0ZW0nPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjYXJ0LWl0ZW0taW1nLXdyYXBwZXInPlxyXG4gICAgICAgICAgPGltZyBzcmM9e2ltYWdlU291cmNlfSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjYXJ0LWl0ZW0tZGV0YWlscyc+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY2FydC1pdGVtLWRlc2NyaXB0aW9uJz5cclxuICAgICAgICAgICAge3RoaXMucHJvcHMuZGVzY3JpcHRpb259XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjYXJ0LWl0ZW0tcHJpY2UnPlxyXG4gICAgICAgICAgICAgICR7KHRoaXMucHJvcHMucHJpY2UgLyAxMDApLnRvRml4ZWQoMil9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY2FydC1pdGVtLXJlbW92ZS13cmFwcGVyJz5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdjYXJ0LWl0ZW0tcmVtb3ZlLWJ0bicgdGl0bGU9J3JlbW92ZSc+eDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ2FydEl0ZW07IiwidmFyIENhcnRJdGVtTGlzdCA9IHJlcXVpcmUoJy4uL2NhcnQtaXRlbS1saXN0JyksXHJcbiAgICBjbGFzc05hbWVzICAgID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xyXG5cclxuLyogc2FtcGxlIGl0ZW1zXHJcblt7J3NrdSc6ICdTSU4tUicsICdkZXNjcmlwdGlvbic6ICdTaW5nbGUtd2lkZSByZWQgaGFtbW9jaycsICdwcmljZSc6IDU5OTUgfVxyXG4seydza3UnOiAnU0lOLUwnLCAnZGVzY3JpcHRpb24nOiAnRG91YmxlLXdpZGUgYmx1ZSBoYW1tb2NrJywgJ3ByaWNlJzogNTk5NSB9XVxyXG4qL1xyXG5cclxudmFyIENhcnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGZyZWVTaGlwcGluZ01pbjogMTUwMDAsXHJcbiAgICAgIHNoaXBwaW5nUHJpY2U6IDg5NSxcclxuICAgICAgZW1wdHlDYXJ0TXNnOiAnWW91ciBjYXJ0IGlzIGVtcHR5J1xyXG4gICAgfTtcclxuICB9LFxyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLy8gRGlzcGxheSBsb2dpYyBhdHRyaWJ1dGVzXHJcbiAgICAgICdkaXNwbGF5Jzoge1xyXG4gICAgICAgICdjYXJ0SGVpZ2h0Jzogd2luZG93LmlubmVySGVpZ2h0XHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIEJ1c2luZXNzIGxvZ2ljIGF0dHJpYnV0ZXNcclxuICAgICAgJ21vZGVsJzoge1xyXG4gICAgICAgICdzYWxlc1RheCc6ICAgMCxcclxuICAgICAgICAnYWRqdXN0bWVudCc6IDAsXHJcbiAgICAgICAgJ2l0ZW1zJzogICAgICBbeydza3UnOiAnU0lOLVInLCAnZGVzY3JpcHRpb24nOiAnU2luZ2xlLXdpZGUgcmVkIGhhbW1vY2snLCAncHJpY2UnOiA1OTk1IH1cclxuLHsnc2t1JzogJ1NJTi1MJywgJ2Rlc2NyaXB0aW9uJzogJ0RvdWJsZS13aWRlIGJsdWUgaGFtbW9jaycsICdwcmljZSc6IDU5OTUgfV0sXHJcbiAgICAgICAgJ2NvdXBvbic6ICAgICB7fVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcblxyXG4gIGhhbmRsZVJlc2l6ZTogZnVuY3Rpb24oZSkge1xyXG4gICAgdGhpcy5zdGF0ZS5kaXNwbGF5LmNhcnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgJ2Rpc3BsYXknOiB0aGlzLnN0YXRlLmRpc3BsYXkgfSk7XHJcbiAgfSxcclxuXHJcbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcclxuICB9LFxyXG5cclxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGNhcnRTdHlsZSA9IHtcclxuICAgICAgICAgIGhlaWdodDogdGhpcy5zdGF0ZS5kaXNwbGF5LmNhcnRIZWlnaHRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhcnRDbGFzc2VzID0gY2xhc3NOYW1lcyh7XHJcbiAgICAgICAgICAnc2hvcHBpbmctY2FydCc6ICAgICAgIHRydWUsXHJcbiAgICAgICAgICAnc2hvcHBpbmctY2FydC1lbXB0eSc6IHRoaXMuc3RhdGUubW9kZWwuaXRlbXMubGVuZ3RoIDwgMSxcclxuICAgICAgICB9KSxcclxuICAgICAgICBjaGVja291dEJ0bkNsYXNzZXMgPSBjbGFzc05hbWVzKHtcclxuICAgICAgICAgICdidG4nOiB0cnVlLCAnZ3JlZW4nOiB0cnVlLCAnc29saWQnOiB0cnVlLCAncmlnaHQtYnRuJzogdHJ1ZSxcclxuICAgICAgICAgICdzaGFkb3cnOiB0cnVlLCAnY2FydC1jaGVja291dC1idG4nOiB0cnVlLFxyXG4gICAgICAgICAgJ2Rpc2FibGVkJzogdGhpcy5zdGF0ZS5tb2RlbC5pdGVtcy5sZW5ndGggPCAxXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgaXRlbXNMYmwgICAgICAgID0gKCh0aGlzLnN0YXRlLm1vZGVsLml0ZW1zLmxlbmd0aCA9PT0gMSkgPyAnIGl0ZW0nIDogJyBpdGVtcycpLFxyXG4gICAgICAgIGl0ZW1zVG90YWxQcmljZSA9IDAsXHJcbiAgICAgICAgc2hpcHBpbmcgICAgICAgID0gdGhpcy5wcm9wcy5zaGlwcGluZ1ByaWNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc3RhdGUubW9kZWwuaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgaXRlbXNUb3RhbFByaWNlICs9IGl0ZW0ucHJpY2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGl0ZW1zVG90YWxQcmljZSA+PSB0aGlzLnByb3BzLmZyZWVTaGlwcGluZ01pbikge1xyXG4gICAgICAgICAgc2hpcHBpbmcgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2FydENsYXNzZXN9IHN0eWxlPXtjYXJ0U3R5bGV9PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzaG9wcGluZy1jYXJ0LWdsb2JhbC1jdHJscyc+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYnRuLWdycCc+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdidG4gYmx1ZSBzb2xpZCBsZWZ0LWJ0biBzaGFkb3cgY2FydC1jbG9zZS1idG4nPktlZXAgU2hvcHBpbmc8L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2NoZWNrb3V0QnRuQ2xhc3Nlc30+Q2hlY2tvdXQ8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdlbXB0eS1jYXJ0LW1zZyBwdGwnPnt0aGlzLnByb3BzLmVtcHR5Q2FydE1zZ308L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY2FydC1zdW1tYXJ5IHB0bCBwcm0gcGJsIHBsbSc+XHJcbiAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9J2NhcnQtc3VtbWFyeS1saW5lLWl0ZW0nPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nY2FydC1zdW1tYXJ5LWxibCc+e3RoaXMuc3RhdGUubW9kZWwuaXRlbXMubGVuZ3RofSB7aXRlbXNMYmx9PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nY2FydC1zdW1tYXJ5LXZhbCc+JHsoaXRlbXNUb3RhbFByaWNlIC8gMTAwKS50b0ZpeGVkKDIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT0nY2FydC1zdW1tYXJ5LWxpbmUtaXRlbSBwdGwnPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nY2FydC1zdW1tYXJ5LWxibCc+U2hpcHBpbmc8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdjYXJ0LXN1bW1hcnktdmFsJz4keyhzaGlwcGluZyAvIDEwMCkudG9GaXhlZCgyKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9J3Nob3BwaW5nLWNhcnQtc2VwYXJhdG9yIHB0bCBwYmwnPjxkaXYgY2xhc3NOYW1lPSdpbm5lcic+PC9kaXY+PC9saT5cclxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT0nY2FydC1zdW1tYXJ5LWxpbmUtaXRlbSc+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdjYXJ0LXN1bW1hcnktbGJsJz5Ub3RhbDwvc3Bhbj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2NhcnQtc3VtbWFyeS12YWwnPlxyXG4gICAgICAgICAgICAgICAgJHsoKGl0ZW1zVG90YWxQcmljZSArIHNoaXBwaW5nICsgdGhpcy5zdGF0ZS5tb2RlbC5hZGp1c3RtZW50KSAvIDEwMCkudG9GaXhlZCgyKX1cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICA8L3VsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzaGlwcGluZy1tc2cgbXRsIG1ibCc+XHJcbiAgICAgICAgICBGUkVFIFNISVBQSU5HIE9OIE9SREVSUyBPVkVSICR7KHRoaXMucHJvcHMuZnJlZVNoaXBwaW5nTWluIC8gMTAwKS50b0ZpeGVkKDIpfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxDYXJ0SXRlbUxpc3QgaXRlbXM9e3RoaXMuc3RhdGUubW9kZWwuaXRlbXN9IC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENhcnQ7IiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNSBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuXG5mdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBjbGFzc2VzID0gJyc7XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdGlmICgnc3RyaW5nJyA9PT0gYXJnVHlwZSB8fCAnbnVtYmVyJyA9PT0gYXJnVHlwZSkge1xuXHRcdFx0Y2xhc3NlcyArPSAnICcgKyBhcmc7XG5cblx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0Y2xhc3NlcyArPSAnICcgKyBjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZyk7XG5cblx0XHR9IGVsc2UgaWYgKCdvYmplY3QnID09PSBhcmdUeXBlKSB7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdGlmIChhcmcuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdGNsYXNzZXMgKz0gJyAnICsga2V5O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGNsYXNzZXMuc3Vic3RyKDEpO1xufVxuXG4vLyBzYWZlbHkgZXhwb3J0IGNsYXNzTmFtZXMgZm9yIG5vZGUgLyBicm93c2VyaWZ5XG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xufVxuXG4vKiBnbG9iYWwgZGVmaW5lICovXG4vLyBzYWZlbHkgZXhwb3J0IGNsYXNzTmFtZXMgZm9yIFJlcXVpcmVKU1xuaWYgKHR5cGVvZiBkZWZpbmUgIT09ICd1bmRlZmluZWQnICYmIGRlZmluZS5hbWQpIHtcblx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHR9KTtcbn1cbiJdfQ==
