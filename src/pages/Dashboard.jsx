import { memo } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  People,
  Shop,
  Cart,
  CurrencyDollar,
  GraphUp,
  GraphDown,
} from "react-bootstrap-icons";
import ReactApexChart from "react-apexcharts";

// Mock data for charts - moved outside component for better performance
const revenueData = [
  { name: "Jan", subscription: 4000, ads: 2400, orders: 2400 },
  { name: "Feb", subscription: 3000, ads: 1398, orders: 2210 },
  { name: "Mar", subscription: 2000, ads: 9800, orders: 2290 },
  { name: "Apr", subscription: 2780, ads: 3908, orders: 2000 },
  { name: "May", subscription: 1890, ads: 4800, orders: 2181 },
  { name: "Jun", subscription: 2390, ads: 3800, orders: 2500 },
  { name: "Jul", subscription: 3490, ads: 4300, orders: 2100 },
];

const userGrowthData = [
  { name: "Jan", users: 400 },
  { name: "Feb", users: 600 },
  { name: "Mar", users: 800 },
  { name: "Apr", users: 1200 },
  { name: "May", users: 1600 },
  { name: "Jun", users: 1900 },
  { name: "Jul", users: 2200 },
];

const subscriptionData = [
  { name: "Free", value: 400 },
  { name: "Basic", value: 300 },
  { name: "Premium", value: 200 },
  { name: "Enterprise", value: 100 },
];

// Chart colors
const chartColors = {
  primary: "#1565c0",
  secondary: "#64b5f6",
  success: "#4CAF50",
  warning: "#FFC107",
  danger: "#F44336",
  info: "#00BCD4",
};

// Stats cards data - moved outside component
const statsCards = [
  {
    title: "Total Users",
    value: "12,361",
    icon: <People size={40} className="posto-text-primary" />,
    change: "+12%",
    changeDirection: "up",
  },
  {
    title: "Active Restaurants",
    value: "243",
    icon: <Shop size={40} className="posto-text-secondary" />,
    change: "+5%",
    changeDirection: "up",
  },
  {
    title: "Orders Today",
    value: "1,243",
    icon: <Cart size={40} style={{ color: "#4CAF50" }} />,
    change: "+18%",
    changeDirection: "up",
  },
  {
    title: "Revenue Today",
    value: "₹32,435",
    icon: <CurrencyDollar size={40} style={{ color: "#FFC107" }} />,
    change: "+8%",
    changeDirection: "up",
  },
];

// Memoized chart components for better performance
const StatsCard = memo(({ card, index }) => {
  // Define different color classes for each card
  const colorClasses = [
    "primary", // Blue for users
    "secondary", // Light blue for restaurants
    "success", // Green for orders
    "warning", // Yellow for revenue
  ];

  const colorClass = colorClasses[index % colorClasses.length];

  return (
    <Card className={`h-100 stats-card ${colorClass} posto-hover-lift`}>
      <Card.Body className="p-4">
        <div className={`icon-wrapper mb-3 bg-${colorClass} bg-opacity-10`}>
          {card.icon}
        </div>
        <h6 className="text-muted mb-3">{card.title}</h6>
        <h3 className="stats-value mb-2">{card.value}</h3>
        <div
          className={`d-flex align-items-center ${
            card.changeDirection === "up" ? "text-success" : "text-danger"
          }`}
        >
          {card.changeDirection === "up" ? (
            <GraphUp className="me-1" />
          ) : (
            <GraphDown className="me-1" />
          )}
          <span className="fw-medium">{card.change}</span>
          <span className="text-muted ms-1 small">from last month</span>
        </div>
      </Card.Body>
    </Card>
  );
});

const RevenueChart = memo(() => {
  // ApexCharts options and series
  const options = {
    chart: {
      type: "area",
      height: 350,
      toolbar: {
        show: false,
      },
      fontFamily: "'Poppins', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
      dropShadow: {
        enabled: true,
        top: 3,
        left: 2,
        blur: 4,
        opacity: 0.1,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: "rgba(0, 0, 0, 0.05)",
      row: {
        colors: ["transparent", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: revenueData.map((item) => item.name),
      labels: {
        style: {
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => `₹${value.toLocaleString()}`,
        style: {
          fontSize: "12px",
        },
      },
    },
    colors: [chartColors.primary, chartColors.secondary, chartColors.success],
    legend: {
      position: "top",
      horizontalAlign: "right",
      offsetY: -15,
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (value) => `₹${value.toLocaleString()}`,
      },
      marker: {
        show: true,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          legend: {
            position: "bottom",
            offsetY: 0,
          },
        },
      },
    ],
  };

  const series = [
    {
      name: "Subscription",
      data: revenueData.map((item) => item.subscription),
    },
    {
      name: "Ads",
      data: revenueData.map((item) => item.ads),
    },
    {
      name: "Orders",
      data: revenueData.map((item) => item.orders),
    },
  ];

  return (
    <Card className="posto-shadow-lg h-100 posto-hover-lift">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold m-0">Revenue Overview</h5>
          <div className="d-flex align-items-center">
            <div className="badge bg-success me-2">+24%</div>
            <small className="text-muted">vs last month</small>
          </div>
        </div>
        <div style={{ height: "350px" }}>
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height="100%"
          />
        </div>
      </Card.Body>
    </Card>
  );
});

const SubscriptionChart = memo(() => {
  const options = {
    chart: {
      type: "donut",
      height: 350,
      fontFamily: "'Poppins', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
      dropShadow: {
        enabled: true,
        top: 3,
        left: 2,
        blur: 4,
        opacity: 0.1,
      },
    },
    labels: subscriptionData.map((item) => item.name),
    colors: [
      chartColors.primary,
      chartColors.secondary,
      chartColors.success,
      chartColors.warning,
    ],
    legend: {
      position: "bottom",
      offsetY: 0,
      height: 40,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          background: "transparent",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "22px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              color: undefined,
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: "16px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              color: undefined,
              offsetY: 16,
              formatter: function (val) {
                return val;
              },
            },
            total: {
              show: true,
              showAlways: false,
              label: "Total",
              fontSize: "16px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              color: "#373d3f",
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: (value) => `${value} restaurants`,
      },
      style: {
        fontSize: "14px",
      },
    },
    stroke: {
      width: 0,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const series = subscriptionData.map((item) => item.value);

  return (
    <Card className="posto-shadow-lg h-100 posto-hover-lift">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold m-0">Subscription Distribution</h5>
          <div className="badge bg-primary">1,000 Restaurants</div>
        </div>
        <div style={{ height: "350px" }}>
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            height="100%"
          />
        </div>
      </Card.Body>
    </Card>
  );
});

const UserGrowthChart = memo(() => {
  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
      fontFamily: "'Poppins', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
      dropShadow: {
        enabled: true,
        top: 3,
        left: 2,
        blur: 4,
        opacity: 0.1,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "60%",
        distributed: false,
        endingShape: "rounded",
        colors: {
          backgroundBarColors: ["rgba(0, 0, 0, 0.05)"],
          backgroundBarOpacity: 0.1,
        },
      },
    },
    grid: {
      borderColor: "rgba(0, 0, 0, 0.05)",
      row: {
        colors: ["transparent", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: userGrowthData.map((item) => item.name),
      labels: {
        style: {
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value.toLocaleString()}`,
        style: {
          fontSize: "12px",
        },
      },
    },
    colors: [chartColors.primary],
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: (value) => `${value.toLocaleString()} users`,
      },
      marker: {
        show: true,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.2,
        gradientToColors: [chartColors.secondary],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  };

  const series = [
    {
      name: "Users",
      data: userGrowthData.map((item) => item.users),
    },
  ];

  return (
    <Card className="posto-shadow-lg posto-hover-lift">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold m-0">User Growth</h5>
          <div className="d-flex align-items-center">
            <div className="badge bg-primary me-2">+32%</div>
            <small className="text-muted">vs last quarter</small>
          </div>
        </div>
        <div style={{ height: "300px" }}>
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height="100%"
          />
        </div>
      </Card.Body>
    </Card>
  );
});

function Dashboard() {
  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold m-0">Dashboard</h3>
        <div className="d-flex align-items-center">
          <Button variant="outline-primary" size="sm" className="me-2">
            <span className="d-none d-md-inline">Export</span> Report
          </Button>
          <Button variant="primary" size="sm">
            <span className="d-none d-md-inline">This</span> Month
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <Row className="mb-4 g-3">
        {statsCards.map((card, index) => (
          <Col xs={12} sm={6} md={3} key={index}>
            <StatsCard card={card} index={index} />
          </Col>
        ))}
      </Row>

      {/* Charts */}
      <Row className="g-3 mb-4">
        {/* Revenue Chart */}
        <Col xs={12} lg={8}>
          <RevenueChart />
        </Col>

        {/* Subscription Distribution */}
        <Col xs={12} lg={4}>
          <SubscriptionChart />
        </Col>
      </Row>

      {/* User Growth */}
      <Row className="mb-4">
        <Col xs={12}>
          <UserGrowthChart />
        </Col>
      </Row>
    </Container>
  );
}

export default memo(Dashboard);
