import React from 'react';
const DynamicHeatMap = ({
  year = new Date().getFullYear(),
  month = new Date().getMonth() + 1,
  LabelColors = {},
  HeatMapData = [],
  ShowMonth = true,
  ShowDate = true,
  DarkTheme = false,
  width = '100%',
  height = '100%'
}) => {
  const parsedYear = parseInt(year);
  const parsedMonth = Math.min(Math.max(parseInt(month), 1), 12);
  const showMonth = !(ShowMonth === false || ShowMonth === 'false');
  const showDate = !(ShowDate === false || ShowDate === 'false');
  const isDarkTheme = DarkTheme === true || DarkTheme === 'true';

  const theme = {
    background: isDarkTheme ? 'hsl(240, 5%, 11%)' : 'transparent',
    text: isDarkTheme ? 'hsl(0, 0%, 96%)' : 'hsl(0, 0%, 13%)',
    title: isDarkTheme ? 'hsl(0, 0%, 90%)' : 'hsl(0, 0%, 7%)',
    cell: {
      active: isDarkTheme ? 'hsl(240, 4%, 32%)' : 'hsla(0, 1%, 86%, 1.00)',
      hover: isDarkTheme ? 'hsl(240, 4%, 38%)' : 'hsl(0, 0%, 92%)',
      inactive: 'transparent',
      textInactive: 'transparent',
      default: isDarkTheme ? 'hsl(240, 4%, 24%)' : 'hsl(0, 0%, 90%)'
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const generateCalendarData = () => {
    const startOfMonth = new Date(parsedYear, parsedMonth - 1, 1);
    const endOfMonth = new Date(parsedYear, parsedMonth, 0);
    const start = new Date(startOfMonth);
    start.setDate(start.getDate() - start.getDay());

    const end = new Date(endOfMonth);
    end.setDate(end.getDate() + (6 - end.getDay()));

    const calendar = [];
    let current = new Date(start);
    current.setDate(current.getDate() + 1);

    while (current <= end) {
      const week = Array.from({ length: 7 }, () => {
        const isoDate = current.toISOString().split('T')[0];
        const match = HeatMapData.find((d) => d.date === isoDate);
        const dayMonth = parseInt(isoDate.split('-')[1]);

        const dayData = {
          date: isoDate,
          day: isoDate.split('-')[2].replace(/^0/, ''),
          label: match?.label || null,
          isCurrentMonth: dayMonth === parsedMonth,
          data: match?.data || null
        };

        current.setDate(current.getDate() + 1);
        return dayData;
      });
      calendar.push(week);
    }

    return calendar;
  };

  const calendarData = generateCalendarData();

  return (
    <div
      id="dynamic-heatmap"
      style={{
        width,
        height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        padding: '0.5%',
        backgroundColor: theme.background,
        color: theme.text,
        fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif`
      }}
    >
      {showMonth && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '2%',
            width: '100%'
          }}
        >
          <h1
            style={{
              fontSize: '1.8em',
              fontWeight: 600,
              margin: 0,
              color: theme.title,
              letterSpacing: '0.3px'
            }}
          >
            {months[parsedMonth - 1]} {parsedYear}
          </h1>
        </div>
      )}

      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '2%',
          padding: '2%'
        }}
      >
        {calendarData.map((week, weekIndex) => (
          <div
            key={`week-${weekIndex}`}
            style={{
              display: 'grid',
              gridTemplateRows: 'repeat(7, 1fr)',
              gap: '2%',
              padding: '2%'
            }}
          >
            {week.map((day) => {
              const isCurrent = day.isCurrentMonth;
              const bgColor = isCurrent
                ? (day.label ? LabelColors[day.label] || theme.cell.active : theme.cell.active)
                : theme.cell.inactive;
              const textColor = isCurrent ? theme.text : theme.cell.textInactive;

              return (
                <div
                  key={day.date}
                  style={{
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
                  }}
                  title={
                    isCurrent
                      ? (day.data ? `${day.date}\nData: ${day.data}` : `${day.date}\nNo data`)
                      : ''
                  }
                  onMouseEnter={(e) => {
                    if (isCurrent) e.currentTarget.style.backgroundColor = theme.cell.hover;
                  }}
                  onMouseLeave={(e) => {
                    if (isCurrent) e.currentTarget.style.backgroundColor = bgColor;
                  }}
                >
                  {showDate && day.day}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicHeatMap;
