# Dynamic_HeatMap


---

````md
# Dynamic HeatMap React

A fully customizable **dynamic heatmap calendar** React component with light and dark themes, label-based color mapping, and tooltip data display.

---

## 📦 Installation

```bash
npm install dynamic-heatmap-react
````

or

```bash
yarn add dynamic-heatmap-react
```

---

## 🚀 Usage

```jsx
import React from "react";
import DynamicHeatMap from "dynamic-heatmap-react";

export default function App() {
  return (
    <DynamicHeatMap
      year={2025}
      month={8}
      LabelColors={{
        work: "#ff4d4d",
        rest: "#4caf50",
        meeting: "#2196f3"
      }}
      HeatMapData={[
        { date: "2025-08-01", label: "work", data: "Worked 8 hours" },
        { date: "2025-08-02", label: "rest", data: "Holiday" },
        { date: "2025-08-03", label: "meeting", data: "Project planning" }
      ]}
      ShowMonth={true}
      ShowDate={true}
      DarkTheme={false}
      width="100%"
      height="500px"
    />
  );
}
```

---

## ⚙️ Props

| Prop          | Type                 | Default       | Description                              |
| ------------- | -------------------- | ------------- | ---------------------------------------- |
| `year`        | `number` \| `string` | Current year  | The year for the heatmap                 |
| `month`       | `number` \| `string` | Current month | Month to display (1–12)                  |
| `LabelColors` | `object`             | `{}`          | Map of label → color                     |
| `HeatMapData` | `array`              | `[]`          | Array of `{ date, label, data }` objects |
| `ShowMonth`   | `boolean`            | `true`        | Whether to show month title              |
| `ShowDate`    | `boolean`            | `true`        | Whether to show date numbers             |
| `DarkTheme`   | `boolean`            | `false`       | Enable dark mode styling                 |
| `width`       | `string`             | `'100%'`      | Width of the component                   |
| `height`      | `string`             | `'100%'`      | Height of the component                  |

---

## 📊 Data Format

The `HeatMapData` prop should be an array of objects:

```js
[
  {
    date: "YYYY-MM-DD",  // Must be in ISO date format
    label: "work",       // Must match a key in LabelColors
    data: "Custom tooltip text"
  }
]
```

---

## 🎨 Features

* **Custom label colors** via `LabelColors`
* **Light/Dark theme** with `DarkTheme`
* **Hover tooltips** showing extra data
* **Responsive** with adjustable width and height
* **Smooth hover animations**
* **Only inline styles** (no external CSS needed)

---

## 🖤 Dark Theme Example

```jsx
<DynamicHeatMap
  year={2025}
  month={12}
  DarkTheme={true}
  LabelColors={{ work: "#ff9800", rest: "#8bc34a" }}
  HeatMapData={[
    { date: "2025-12-01", label: "work", data: "Worked 10 hours" },
    { date: "2025-12-02", label: "rest", data: "Weekend" }
  ]}
/>
```

---

## 📜 License

MIT License © 2025 [Uday Jaya Santhosh](https://github.com/udayjayasanthosh)
