var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var animals = [{ type: 'turtle', icon: '\uD83D\uDC22' }, { type: 'octopus', icon: '\uD83D\uDC19' }, { type: 'fish', icon: '\uD83D\uDC20' }, { type: 'flamingo', icon: '\uD83E\uDDA9' }, { type: 'penguin', icon: '\uD83D\uDC27' }];

var domContainer = document.querySelector('#root');
var root = ReactDOM.createRoot(domContainer);

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      color: 'black',
      border: 'transparent',
      arr: _this.props.list,
      usedIndex: [],
      interval: null,
      borderWidth: '',
      borderStyle: '',
      borderColor: 'transparent'
    };

    _this.getRandomIndex = function (arr, usedIndex) {
      var availableIndex = arr.map(function (_, index) {
        return index;
      }).filter(function (index) {
        return !usedIndex.includes(index);
      });

      if (availableIndex.length === 0) {
        return -1;
      }

      var randomIndex = availableIndex[Math.floor(Math.random() * availableIndex.length)];

      return randomIndex;
    };

    _this.addKeyAndValue = function (obj, key, value) {
      return Object.assign({}, obj, _defineProperty({}, key, value));
    };

    var interval = setInterval(function () {
      var _this$state = _this.state,
          arr = _this$state.arr,
          usedIndex = _this$state.usedIndex;

      var randomIndex = _this.getRandomIndex(arr, usedIndex);
      if (randomIndex !== -1) {
        var newArr = [].concat(_toConsumableArray(arr));
        var randomObj = newArr[randomIndex];

        if (!randomObj.active) {
          newArr[randomIndex] = _this.addKeyAndValue(randomObj, "active", true);
          usedIndex.push(randomIndex);
          _this.setState({ arr: newArr, usedIndex: usedIndex }, function () {
            console.log(_this.state.arr);
          });
        }
      } else {
        clearInterval(interval);
        console.log('Интервал остановлен');
      }
    }, 2000);
    return _this;
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          _state$arr = _state.arr,
          arr = _state$arr === undefined ? [] : _state$arr,
          _state$color = _state.color,
          color = _state$color === undefined ? '' : _state$color,
          borderWidth = _state.borderWidth,
          _state$borderColor = _state.borderColor,
          borderColor = _state$borderColor === undefined ? '' : _state$borderColor,
          _state$borderStyle = _state.borderStyle,
          borderStyle = _state$borderStyle === undefined ? '' : _state$borderStyle;


      var activeCount = arr.filter(function (el) {
        return el.active;
      }).length;

      var tableBorderWidth = activeCount === arr.length ? '20px' : activeCount >= arr.length / 2 ? '10px' : borderWidth;
      var tableBorderStyle = activeCount >= arr.length / 2 ? 'solid' : borderStyle;
      var tableBorderColor = activeCount >= arr.length / 2 ? 'black' : borderColor;

      return arr.length ? React.createElement(
        'table',
        { style: { borderWidth: tableBorderWidth, borderStyle: tableBorderStyle, borderColor: tableBorderColor } },
        React.createElement(
          'tbody',
          { className: 'table__body' },
          arr.map(function (el, i) {
            return React.createElement(
              'tr',
              { className: 'element__table', key: i, style: { color: el.active ? 'green' : null } },
              React.createElement(
                'td',
                null,
                el.type,
                ': '
              ),
              React.createElement(
                'td',
                null,
                el.icon
              )
            );
          })
        )
      ) : null;
    }
  }]);

  return App;
}(React.Component);

root.render(React.createElement(App, { list: animals }));