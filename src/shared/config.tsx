import { ActiveElement, ChartEvent } from "chart.js";

export const DAYS = 865;


export const GRAPH_OPTIONS = {
    responsive: true,
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            }
        }
    },
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: false,
        },
    },
};
export const NewUser_BarOptions = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,

        text: "New Enrollments",
      },
    },
    
  };
 export  const NewUser_LineOptions = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "New Enrollments",
      },
    },
    
  }