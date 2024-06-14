# Linux Performance Metric Dashboard

This project is a Linux Performance Metric Dashboard built with React. The dashboard fetches and displays performance metrics such as CPU usage, process ID, user CPU usage, system CPU usage, I/O wait, total CPU usage, and command. Users can select a date and time range to view historical data and choose multiple metrics to display in a single combined graph.

![Screenshot 2024-06-14 at 10 23 28 AM](https://github.com/kushel-reddy/perfmon-react/assets/172392675/5c23bd64-88ae-4e41-b482-64122c82b5a6)

## Features

- Fetch historical performance metrics.
- Fetch data at regular intervals for real-time updates.
- Select metrics to display on a chart.

## Technologies Used

- React
- Socket.io
- Chart.js (for graphs)
- react-chartjs-2 (wrapper for Chart.js)
- react-select (for select dropdown)
- CSS for styling

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/kushel-reddy/perfmon-react.git
    ```

2. Navigate to the project directory:
    ```bash
    cd perfmon-react
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the development server:
    ```bash
    npm start
    ```

2. Open your browser and go to:
    ```
    http://localhost:3000
    ```

3. Use the date and time pickers to select a date and time range.

4. Select a metrics from the dropdown.

5. Click the "Fetch Metrics" button to retrieve and display the selected metric in a graph.

## Project Structure



