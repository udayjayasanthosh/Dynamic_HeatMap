"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var DynamicHeatMap = function DynamicHeatMap(_ref) {
  var _ref$year = _ref.year,
    year = _ref$year === void 0 ? new Date().getFullYear() : _ref$year,
    _ref$month = _ref.month,
    month = _ref$month === void 0 ? new Date().getMonth() + 1 : _ref$month,
    _ref$LabelColors = _ref.LabelColors,
    LabelColors = _ref$LabelColors === void 0 ? {} : _ref$LabelColors,
    _ref$HeatMapData = _ref.HeatMapData,
    HeatMapData = _ref$HeatMapData === void 0 ? [] : _ref$HeatMapData,
    _ref$ShowMonth = _ref.ShowMonth,
    ShowMonth = _ref$ShowMonth === void 0 ? true : _ref$ShowMonth,
    _ref$ShowDate = _ref.ShowDate,
    ShowDate = _ref$ShowDate === void 0 ? true : _ref$ShowDate,
    _ref$DarkTheme = _ref.DarkTheme,
    DarkTheme = _ref$DarkTheme === void 0 ? false : _ref$DarkTheme,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? '100%' : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? '100%' : _ref$height;
  var parsedYear = parseInt(year);
  var parsedMonth = Math.min(Math.max(parseInt(month), 1), 12);
  var showMonth = !(ShowMonth === false || ShowMonth === 'false');
  var showDate = !(ShowDate === false || ShowDate === 'false');
  var isDarkTheme = DarkTheme === true || DarkTheme === 'true';
  var theme = {
    background: isDarkTheme ? 'hsl(240, 5%, 11%)' : 'transparent',
    text: isDarkTheme ? 'hsl(0, 0%, 96%)' : 'hsl(0, 0%, 13%)',
    title: isDarkTheme ? 'hsl(0, 0%, 90%)' : 'hsl(0, 0%, 7%)',
    cell: {
      active: isDarkTheme ? 'hsl(240, 4%, 32%)' : 'hsla(0, 1%, 86%, 1.00)',
      hover: isDarkTheme ? 'hsl(240, 4%, 38%)' : 'hsl(0, 0%, 92%)',
      inactive: 'transparent',
      textInactive: 'transparent',
      "default": isDarkTheme ? 'hsl(240, 4%, 24%)' : 'hsl(0, 0%, 90%)'
    }
  };
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var generateCalendarData = function generateCalendarData() {
    var startOfMonth = new Date(parsedYear, parsedMonth - 1, 1);
    var endOfMonth = new Date(parsedYear, parsedMonth, 0);
    var start = new Date(startOfMonth);
    start.setDate(start.getDate() - start.getDay());
    var end = new Date(endOfMonth);
    end.setDate(end.getDate() + (6 - end.getDay()));
    var calendar = [];
    var current = new Date(start);
    current.setDate(current.getDate() + 1);
    while (current <= end) {
      var week = Array.from({
        length: 7
      }, function () {
        var isoDate = current.toISOString().split('T')[0];
        var match = HeatMapData.find(function (d) {
          return d.date === isoDate;
        });
        var dayMonth = parseInt(isoDate.split('-')[1]);
        var dayData = {
          date: isoDate,
          day: isoDate.split('-')[2].replace(/^0/, ''),
          label: (match === null || match === void 0 ? void 0 : match.label) || null,
          isCurrentMonth: dayMonth === parsedMonth,
          data: (match === null || match === void 0 ? void 0 : match.data) || null
        };
        current.setDate(current.getDate() + 1);
        return dayData;
      });
      calendar.push(week);
    }
    return calendar;
  };
  var calendarData = generateCalendarData();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    id: "dynamic-heatmap",
    style: {
      width: width,
      height: height,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '8px',
      padding: '0.5%',
      backgroundColor: theme.background,
      color: theme.text,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif"
    },
    children: [showMonth && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '2%',
        width: '100%'
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("h1", {
        style: {
          fontSize: '1.8em',
          fontWeight: 600,
          margin: 0,
          color: theme.title,
          letterSpacing: '0.3px'
        },
        children: [months[parsedMonth - 1], " ", parsedYear]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '2%',
        padding: '2%'
      },
      children: calendarData.map(function (week, weekIndex) {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          style: {
            display: 'grid',
            gridTemplateRows: 'repeat(7, 1fr)',
            gap: '2%',
            padding: '2%'
          },
          children: week.map(function (day) {
            var isCurrent = day.isCurrentMonth;
            var bgColor = isCurrent ? day.label ? LabelColors[day.label] || theme.cell.active : theme.cell.active : theme.cell.inactive;
            var textColor = isCurrent ? theme.text : theme.cell.textInactive;
            return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '25%',
                padding: '1%',
                fontSize: '0.85em',
                fontWeight: 450,
                transition: 'all 0.15s ease-out',
                backgroundColor: bgColor,
                color: textColor,
                cursor: isCurrent ? 'pointer' : 'default'
              },
              title: isCurrent ? day.data ? "".concat(day.date, "\nData: ").concat(day.data) : "".concat(day.date, "\nNo data") : '',
              onMouseEnter: function onMouseEnter(e) {
                if (isCurrent) e.currentTarget.style.backgroundColor = theme.cell.hover;
              },
              onMouseLeave: function onMouseLeave(e) {
                if (isCurrent) e.currentTarget.style.backgroundColor = bgColor;
              },
              children: showDate && day.day
            }, day.date);
          })
        }, "week-".concat(weekIndex));
      })
    })]
  });
};
var _default = exports["default"] = DynamicHeatMap;