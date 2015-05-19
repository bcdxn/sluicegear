(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/app/app.js":[function(require,module,exports){
var Cart = require('./Components/cart');

module.exports = React.render(React.createElement(Cart, null), document.getElementById('app'));

},{"./Components/cart":"c:\\Users\\Benjamin\\Projects\\sluicegear\\client\\src\\app\\Components\\cart\\index.js"}],"c:\\Users\\Benjamin\\Projects\\sluicegear\\client\\src\\app\\Components\\cart-item-list\\index.js":[function(require,module,exports){
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

},{"../cart-item":"c:\\Users\\Benjamin\\Projects\\sluicegear\\client\\src\\app\\Components\\cart-item\\index.js"}],"c:\\Users\\Benjamin\\Projects\\sluicegear\\client\\src\\app\\Components\\cart-item\\index.js":[function(require,module,exports){
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

},{}],"c:\\Users\\Benjamin\\Projects\\sluicegear\\client\\src\\app\\Components\\cart\\index.js":[function(require,module,exports){
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

},{"../cart-item-list":"c:\\Users\\Benjamin\\Projects\\sluicegear\\client\\src\\app\\Components\\cart-item-list\\index.js","classnames":"c:\\Users\\Benjamin\\Projects\\sluicegear\\node_modules\\classnames\\index.js"}],"c:\\Users\\Benjamin\\Projects\\sluicegear\\node_modules\\classnames\\index.js":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjOlxcVXNlcnNcXEJlbmphbWluXFxQcm9qZWN0c1xcc2x1aWNlZ2VhclxcY2xpZW50XFxzcmNcXGFwcFxcYXBwLmpzIiwiYzpcXFVzZXJzXFxCZW5qYW1pblxcUHJvamVjdHNcXHNsdWljZWdlYXJcXGNsaWVudFxcc3JjXFxhcHBcXENvbXBvbmVudHNcXGNhcnQtaXRlbS1saXN0XFxpbmRleC5qcyIsImM6XFxVc2Vyc1xcQmVuamFtaW5cXFByb2plY3RzXFxzbHVpY2VnZWFyXFxjbGllbnRcXHNyY1xcYXBwXFxDb21wb25lbnRzXFxjYXJ0LWl0ZW1cXGluZGV4LmpzIiwiYzpcXFVzZXJzXFxCZW5qYW1pblxcUHJvamVjdHNcXHNsdWljZWdlYXJcXGNsaWVudFxcc3JjXFxhcHBcXENvbXBvbmVudHNcXGNhcnRcXGluZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs7QUFFeEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFDLElBQUksRUFBQSxJQUFBLENBQUcsQ0FBQSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7OztBQ0Z2RSxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7O0FBRXZDLElBQUksa0NBQWtDLDRCQUFBO0VBQ3BDLE1BQU0sRUFBRSxZQUFZO0lBQ2xCLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksRUFBRTtNQUNwRDtRQUNFLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsb0JBQUMsUUFBUSxFQUFB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QSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQ2FydCA9IHJlcXVpcmUoJy4vQ29tcG9uZW50cy9jYXJ0Jyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LnJlbmRlcig8Q2FydCAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTsiLCJ2YXIgQ2FydEl0ZW0gPSByZXF1aXJlKCcuLi9jYXJ0LWl0ZW0nKTtcclxuXHJcbnZhciBDYXJ0SXRlbUxpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaXRlbU5vZGVzID0gIHRoaXMucHJvcHMuaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGxpPjxDYXJ0SXRlbSBza3U9e2l0ZW0uc2t1fSBkZXNjcmlwdGlvbj17aXRlbS5kZXNjcmlwdGlvbn0gcHJpY2U9e2l0ZW0ucHJpY2V9Lz48L2xpPlxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx1bCBjbGFzcz0nY2FydC1pdGVtcy1saXN0Jz5cclxuICAgICAgICB7aXRlbU5vZGVzfVxyXG4gICAgICA8L3VsPlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDYXJ0SXRlbUxpc3Q7IiwidmFyIENhcnRJdGVtID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGltYWdlU291cmNlID0gJy9pbWcvcHJvZHVjdHMvJyArIHRoaXMucHJvcHMuc2t1ICsgJy5qcGcnO1xyXG4gICAgXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nY2FydC1pdGVtJz5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY2FydC1pdGVtLWltZy13cmFwcGVyJz5cclxuICAgICAgICAgIDxpbWcgc3JjPXtpbWFnZVNvdXJjZX0gLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY2FydC1pdGVtLWRldGFpbHMnPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NhcnQtaXRlbS1kZXNjcmlwdGlvbic+XHJcbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmRlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY2FydC1pdGVtLXByaWNlJz5cclxuICAgICAgICAgICAgICAkeyh0aGlzLnByb3BzLnByaWNlIC8gMTAwKS50b0ZpeGVkKDIpfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NhcnQtaXRlbS1yZW1vdmUtd3JhcHBlcic+XHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nY2FydC1pdGVtLXJlbW92ZS1idG4nIHRpdGxlPSdyZW1vdmUnPng8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENhcnRJdGVtOyIsInZhciBDYXJ0SXRlbUxpc3QgPSByZXF1aXJlKCcuLi9jYXJ0LWl0ZW0tbGlzdCcpLFxyXG4gICAgY2xhc3NOYW1lcyAgICA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcclxuXHJcbi8qIHNhbXBsZSBpdGVtc1xyXG5beydza3UnOiAnU0lOLVInLCAnZGVzY3JpcHRpb24nOiAnU2luZ2xlLXdpZGUgcmVkIGhhbW1vY2snLCAncHJpY2UnOiA1OTk1IH1cclxuLHsnc2t1JzogJ1NJTi1MJywgJ2Rlc2NyaXB0aW9uJzogJ0RvdWJsZS13aWRlIGJsdWUgaGFtbW9jaycsICdwcmljZSc6IDU5OTUgfV1cclxuKi9cclxuXHJcbnZhciBDYXJ0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBmcmVlU2hpcHBpbmdNaW46IDE1MDAwLFxyXG4gICAgICBzaGlwcGluZ1ByaWNlOiA4OTUsXHJcbiAgICAgIGVtcHR5Q2FydE1zZzogJ1lvdXIgY2FydCBpcyBlbXB0eSdcclxuICAgIH07XHJcbiAgfSxcclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIC8vIERpc3BsYXkgbG9naWMgYXR0cmlidXRlc1xyXG4gICAgICAnZGlzcGxheSc6IHtcclxuICAgICAgICAnY2FydEhlaWdodCc6IHdpbmRvdy5pbm5lckhlaWdodFxyXG4gICAgICB9LFxyXG4gICAgICAvLyBCdXNpbmVzcyBsb2dpYyBhdHRyaWJ1dGVzXHJcbiAgICAgICdtb2RlbCc6IHtcclxuICAgICAgICAnc2FsZXNUYXgnOiAgIDAsXHJcbiAgICAgICAgJ2FkanVzdG1lbnQnOiAwLFxyXG4gICAgICAgICdpdGVtcyc6ICAgICAgW3snc2t1JzogJ1NJTi1SJywgJ2Rlc2NyaXB0aW9uJzogJ1NpbmdsZS13aWRlIHJlZCBoYW1tb2NrJywgJ3ByaWNlJzogNTk5NSB9XHJcbix7J3NrdSc6ICdTSU4tTCcsICdkZXNjcmlwdGlvbic6ICdEb3VibGUtd2lkZSBibHVlIGhhbW1vY2snLCAncHJpY2UnOiA1OTk1IH1dLFxyXG4gICAgICAgICdjb3Vwb24nOiAgICAge31cclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LFxyXG5cclxuICBoYW5kbGVSZXNpemU6IGZ1bmN0aW9uKGUpIHtcclxuICAgIHRoaXMuc3RhdGUuZGlzcGxheS5jYXJ0SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7ICdkaXNwbGF5JzogdGhpcy5zdGF0ZS5kaXNwbGF5IH0pO1xyXG4gIH0sXHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XHJcbiAgfSxcclxuXHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBjYXJ0U3R5bGUgPSB7XHJcbiAgICAgICAgICBoZWlnaHQ6IHRoaXMuc3RhdGUuZGlzcGxheS5jYXJ0SGVpZ2h0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYXJ0Q2xhc3NlcyA9IGNsYXNzTmFtZXMoe1xyXG4gICAgICAgICAgJ3Nob3BwaW5nLWNhcnQnOiAgICAgICB0cnVlLFxyXG4gICAgICAgICAgJ3Nob3BwaW5nLWNhcnQtZW1wdHknOiB0aGlzLnN0YXRlLm1vZGVsLml0ZW1zLmxlbmd0aCA8IDEsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgY2hlY2tvdXRCdG5DbGFzc2VzID0gY2xhc3NOYW1lcyh7XHJcbiAgICAgICAgICAnYnRuJzogdHJ1ZSwgJ2dyZWVuJzogdHJ1ZSwgJ3NvbGlkJzogdHJ1ZSwgJ3JpZ2h0LWJ0bic6IHRydWUsXHJcbiAgICAgICAgICAnc2hhZG93JzogdHJ1ZSwgJ2NhcnQtY2hlY2tvdXQtYnRuJzogdHJ1ZSxcclxuICAgICAgICAgICdkaXNhYmxlZCc6IHRoaXMuc3RhdGUubW9kZWwuaXRlbXMubGVuZ3RoIDwgMVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGl0ZW1zTGJsICAgICAgICA9ICgodGhpcy5zdGF0ZS5tb2RlbC5pdGVtcy5sZW5ndGggPT09IDEpID8gJyBpdGVtJyA6ICcgaXRlbXMnKSxcclxuICAgICAgICBpdGVtc1RvdGFsUHJpY2UgPSAwLFxyXG4gICAgICAgIHNoaXBwaW5nICAgICAgICA9IHRoaXMucHJvcHMuc2hpcHBpbmdQcmljZTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnN0YXRlLm1vZGVsLml0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgIGl0ZW1zVG90YWxQcmljZSArPSBpdGVtLnByaWNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChpdGVtc1RvdGFsUHJpY2UgPj0gdGhpcy5wcm9wcy5mcmVlU2hpcHBpbmdNaW4pIHtcclxuICAgICAgICAgIHNoaXBwaW5nID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NhcnRDbGFzc2VzfSBzdHlsZT17Y2FydFN0eWxlfT5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2hvcHBpbmctY2FydC1nbG9iYWwtY3RybHMnPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2J0bi1ncnAnPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nYnRuIGJsdWUgc29saWQgbGVmdC1idG4gc2hhZG93IGNhcnQtY2xvc2UtYnRuJz5LZWVwIFNob3BwaW5nPC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtjaGVja291dEJ0bkNsYXNzZXN9PkNoZWNrb3V0PC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZW1wdHktY2FydC1tc2cgcHRsJz57dGhpcy5wcm9wcy5lbXB0eUNhcnRNc2d9PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NhcnQtc3VtbWFyeSBwdGwgcHJtIHBibCBwbG0nPlxyXG4gICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICA8bGkgY2xhc3NOYW1lPSdjYXJ0LXN1bW1hcnktbGluZS1pdGVtJz5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2NhcnQtc3VtbWFyeS1sYmwnPnt0aGlzLnN0YXRlLm1vZGVsLml0ZW1zLmxlbmd0aH0ge2l0ZW1zTGJsfTwvc3Bhbj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2NhcnQtc3VtbWFyeS12YWwnPiR7KGl0ZW1zVG90YWxQcmljZSAvIDEwMCkudG9GaXhlZCgyKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9J2NhcnQtc3VtbWFyeS1saW5lLWl0ZW0gcHRsJz5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J2NhcnQtc3VtbWFyeS1sYmwnPlNoaXBwaW5nPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nY2FydC1zdW1tYXJ5LXZhbCc+JHsoc2hpcHBpbmcgLyAxMDApLnRvRml4ZWQoMil9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8bGkgY2xhc3NOYW1lPSdzaG9wcGluZy1jYXJ0LXNlcGFyYXRvciBwdGwgcGJsJz48ZGl2IGNsYXNzTmFtZT0naW5uZXInPjwvZGl2PjwvbGk+XHJcbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9J2NhcnQtc3VtbWFyeS1saW5lLWl0ZW0nPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nY2FydC1zdW1tYXJ5LWxibCc+VG90YWw8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdjYXJ0LXN1bW1hcnktdmFsJz5cclxuICAgICAgICAgICAgICAgICR7KChpdGVtc1RvdGFsUHJpY2UgKyBzaGlwcGluZyArIHRoaXMuc3RhdGUubW9kZWwuYWRqdXN0bWVudCkgLyAxMDApLnRvRml4ZWQoMil9XHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgPC91bD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2hpcHBpbmctbXNnIG10bCBtYmwnPlxyXG4gICAgICAgICAgRlJFRSBTSElQUElORyBPTiBPUkRFUlMgT1ZFUiAkeyh0aGlzLnByb3BzLmZyZWVTaGlwcGluZ01pbiAvIDEwMCkudG9GaXhlZCgyKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8Q2FydEl0ZW1MaXN0IGl0ZW1zPXt0aGlzLnN0YXRlLm1vZGVsLml0ZW1zfSAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDYXJ0OyIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTUgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cblxuZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgY2xhc3NlcyA9ICcnO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRpZiAoJ3N0cmluZycgPT09IGFyZ1R5cGUgfHwgJ251bWJlcicgPT09IGFyZ1R5cGUpIHtcblx0XHRcdGNsYXNzZXMgKz0gJyAnICsgYXJnO1xuXG5cdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdGNsYXNzZXMgKz0gJyAnICsgY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpO1xuXG5cdFx0fSBlbHNlIGlmICgnb2JqZWN0JyA9PT0gYXJnVHlwZSkge1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRpZiAoYXJnLmhhc093blByb3BlcnR5KGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRjbGFzc2VzICs9ICcgJyArIGtleTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjbGFzc2VzLnN1YnN0cigxKTtcbn1cblxuLy8gc2FmZWx5IGV4cG9ydCBjbGFzc05hbWVzIGZvciBub2RlIC8gYnJvd3NlcmlmeVxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcbn1cblxuLyogZ2xvYmFsIGRlZmluZSAqL1xuLy8gc2FmZWx5IGV4cG9ydCBjbGFzc05hbWVzIGZvciBSZXF1aXJlSlNcbmlmICh0eXBlb2YgZGVmaW5lICE9PSAndW5kZWZpbmVkJyAmJiBkZWZpbmUuYW1kKSB7XG5cdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0fSk7XG59XG4iXX0=
