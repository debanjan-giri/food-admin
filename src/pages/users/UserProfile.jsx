import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  ListGroup,
  Table,
  Tabs,
  Tab,
  Form,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  ArrowLeft,
  GeoAlt,
  Telephone,
  Envelope,
  Cup,
  Cart,
  SlashCircle,
  CheckCircle,
  Clock,
  Calendar,
  ChatDots,
  Star,
  Shop,
} from "react-bootstrap-icons";
import ReactApexChart from "react-apexcharts";
import OptimizedImage from "../../components/OptimizedImage";

// Mock user data
const mockUser = {
  id: 1,
  name: "Rahul Sharma",
  location: "Mumbai, Maharashtra",
  phone: "+91 9876543210",
  email: "rahul.sharma@example.com",
  joinedDate: "2022-05-15",
  status: "active",
  connectedRestaurants: 5,
  ordersToday: 2,
  totalOrders: 45,
  favoriteRestaurants: ["Spice Garden", "Tandoori Nights", "Curry House"],
  subscriptions: ["Premium User", "Calorie Tracker", "Food Suggestions"],
  lastActive: "2023-09-25 14:30:00",
};

// Mock order history
const mockOrderHistory = [
  {
    id: 1,
    date: "2023-09-25",
    restaurant: "Spice Garden",
    items: ["Butter Chicken", "Naan", "Jeera Rice"],
    amount: 650,
    status: "Delivered",
    paymentMethod: "Online Payment",
  },
  {
    id: 2,
    date: "2023-09-20",
    restaurant: "Tandoori Nights",
    items: ["Paneer Tikka", "Roti", "Dal Makhani"],
    amount: 550,
    status: "Delivered",
    paymentMethod: "Cash on Delivery",
  },
  {
    id: 3,
    date: "2023-09-15",
    restaurant: "Curry House",
    items: ["Chicken Biryani", "Raita"],
    amount: 350,
    status: "Delivered",
    paymentMethod: "Online Payment",
  },
  {
    id: 4,
    date: "2023-09-10",
    restaurant: "Spice Garden",
    items: ["Veg Pulao", "Paneer Butter Masala", "Gulab Jamun"],
    amount: 450,
    status: "Delivered",
    paymentMethod: "Online Payment",
  },
  {
    id: 5,
    date: "2023-09-05",
    restaurant: "Biryani Palace",
    items: ["Hyderabadi Biryani", "Kebab", "Coke"],
    amount: 400,
    status: "Delivered",
    paymentMethod: "Cash on Delivery",
  },
];

// Mock feedback messages
const mockFeedbackMessages = [
  {
    id: 1,
    date: "2023-09-15",
    message:
      "The app is great, but I would like to see more filter options for restaurants.",
    status: "Unread",
  },
  {
    id: 2,
    date: "2023-08-22",
    message:
      "I had an issue with a delivery, but customer support resolved it quickly. Great service!",
    status: "Read",
  },
  {
    id: 3,
    date: "2023-07-30",
    message: "Love the new UI update. Much easier to navigate now.",
    status: "Read",
  },
];

// Mock app usage data
const appUsageData = [
  { day: "Mon", sessions: 5, timeSpent: 25 },
  { day: "Tue", sessions: 3, timeSpent: 15 },
  { day: "Wed", sessions: 7, timeSpent: 35 },
  { day: "Thu", sessions: 4, timeSpent: 20 },
  { day: "Fri", sessions: 6, timeSpent: 30 },
  { day: "Sat", sessions: 8, timeSpent: 40 },
  { day: "Sun", sessions: 5, timeSpent: 25 },
];

// Mock active time data
const activeTimeData = [
  { time: "6-9 AM", percentage: 10 },
  { time: "9-12 PM", percentage: 25 },
  { time: "12-3 PM", percentage: 15 },
  { time: "3-6 PM", percentage: 10 },
  { time: "6-9 PM", percentage: 30 },
  { time: "9-12 AM", percentage: 10 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

// Memoized chart components for better performance
const SessionsChart = memo(({ appUsageData }) => {
  const options = useMemo(
    () => ({
      chart: {
        type: "bar",
        stacked: false,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: appUsageData.map((item) => item.day),
      },
      yaxis: [
        {
          title: {
            text: "Sessions",
          },
          seriesName: "Sessions",
        },
        {
          opposite: true,
          title: {
            text: "Time Spent (min)",
          },
          seriesName: "Time Spent (min)",
        },
      ],
      tooltip: {
        y: {
          formatter: function (val, { seriesIndex }) {
            return seriesIndex === 0 ? val + " sessions" : val + " min";
          },
        },
      },
      legend: {
        position: "top",
      },
      colors: ["#8884d8", "#82ca9d"],
    }),
    [appUsageData]
  );

  const series = useMemo(
    () => [
      {
        name: "Sessions",
        data: appUsageData.map((item) => item.sessions),
      },
      {
        name: "Time Spent (min)",
        data: appUsageData.map((item) => item.timeSpent),
      },
    ],
    [appUsageData]
  );

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height="100%"
    />
  );
});

const ActiveTimeChart = memo(({ activeTimeData }) => {
  const options = useMemo(
    () => ({
      chart: {
        type: "pie",
      },
      labels: activeTimeData.map((item) => item.time),
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
      colors: COLORS,
      legend: {
        position: "bottom",
      },
    }),
    [activeTimeData]
  );

  const series = useMemo(
    () => activeTimeData.map((item) => item.percentage),
    [activeTimeData]
  );

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="pie"
      height="100%"
    />
  );
});

function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  // In a real app, you would fetch the user data based on the ID
  useEffect(() => {
    // Fetch user data
    console.log(`Fetching data for user with ID: ${id}`);
  }, [id]);

  // Memoized event handlers
  const handleTabChange = useCallback((key) => {
    setActiveTab(parseInt(key));
  }, []);

  const handleBackClick = useCallback(() => {
    navigate("/users");
  }, [navigate]);

  return (
    <Container fluid>
      <div className="d-flex align-items-center mb-4">
        <Button
          variant="outline-primary"
          className="me-3 d-flex align-items-center"
          onClick={handleBackClick}
        >
          <ArrowLeft className="me-2" /> Back to List
        </Button>
        <h4 className="mb-0">User Profile</h4>
      </div>

      <Row className="g-4">
        {/* User Info Card */}
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                    style={{ width: 64, height: 64, fontSize: "1.5rem" }}
                  >
                    {mockUser.name.charAt(0)}
                  </div>
                  <div>
                    <h5>{mockUser.name}</h5>
                    <Badge
                      bg={
                        mockUser.status === "active"
                          ? "success"
                          : mockUser.status === "suspended"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {mockUser.status.charAt(0).toUpperCase() +
                        mockUser.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div>
                  {mockUser.status === "active" ? (
                    <Button variant="link" className="p-1 text-warning">
                      <SlashCircle size={18} />
                    </Button>
                  ) : (
                    <Button variant="link" className="p-1 text-success">
                      <CheckCircle size={18} />
                    </Button>
                  )}
                </div>
              </div>

              <hr className="my-3" />

              <ListGroup variant="flush">
                <ListGroup.Item className="px-0 d-flex align-items-center">
                  <GeoAlt className="me-3 text-secondary" size={20} />
                  <div>
                    <div className="text-muted small">Location</div>
                    <div>{mockUser.location}</div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="px-0 d-flex align-items-center">
                  <Telephone className="me-3 text-secondary" size={20} />
                  <div>
                    <div className="text-muted small">Phone</div>
                    <div>{mockUser.phone}</div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="px-0 d-flex align-items-center">
                  <Envelope className="me-3 text-secondary" size={20} />
                  <div>
                    <div className="text-muted small">Email</div>
                    <div>{mockUser.email}</div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="px-0 d-flex align-items-center">
                  <Calendar className="me-3 text-secondary" size={20} />
                  <div>
                    <div className="text-muted small">Joined Date</div>
                    <div>{mockUser.joinedDate}</div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="px-0 d-flex align-items-center">
                  <Clock className="me-3 text-secondary" size={20} />
                  <div>
                    <div className="text-muted small">Last Active</div>
                    <div>{mockUser.lastActive}</div>
                  </div>
                </ListGroup.Item>
              </ListGroup>

              <hr className="my-3" />

              <div className="mb-2 fw-medium">Favorite Restaurants</div>
              <ListGroup variant="flush">
                {mockUser.favoriteRestaurants.map((restaurant, index) => (
                  <ListGroup.Item
                    key={index}
                    className="px-0 d-flex align-items-center"
                  >
                    <Shop className="text-primary me-2" size={16} />
                    <div>{restaurant}</div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <hr className="my-3" />

              <div className="mb-2 fw-medium">Subscribed Features</div>
              <div className="d-flex flex-wrap gap-2">
                {mockUser.subscriptions.map((subscription, index) => (
                  <Badge
                    key={index}
                    bg="primary"
                    className="d-flex align-items-center py-2 px-2"
                  >
                    <Star className="me-1" size={12} /> {subscription}
                  </Badge>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Stats and Tabs */}
        <Col md={8}>
          <Row className="g-3">
            <Col sm={6} md={4}>
              <Card className="shadow-sm text-center h-100">
                <Card.Body>
                  <Cart className="text-primary mb-2" size={40} />
                  <h5 className="mb-1">{mockUser.ordersToday}</h5>
                  <div className="text-muted small">Orders Today</div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} md={4}>
              <Card className="shadow-sm text-center h-100">
                <Card.Body>
                  <Cart className="text-secondary mb-2" size={40} />
                  <h5 className="mb-1">{mockUser.totalOrders}</h5>
                  <div className="text-muted small">Total Orders</div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} md={4}>
              <Card className="shadow-sm text-center h-100">
                <Card.Body>
                  <Shop className="text-success mb-2" size={40} />
                  <h5 className="mb-1">{mockUser.connectedRestaurants}</h5>
                  <div className="text-muted small">Connected Restaurants</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="mt-4">
            <Tabs
              activeKey={activeTab}
              onSelect={handleTabChange}
              className="mb-3"
              id="user-tabs"
            >
              <Tab eventKey={0} title="Order History" />
              <Tab eventKey={1} title="App Usage" />
              <Tab eventKey={2} title="Feedback" />
            </Tabs>
            <div>
              {/* Order History Tab */}
              {activeTab === 0 && (
                <Card className="shadow-sm">
                  <Card.Body>
                    <h5 className="mb-3">Recent Orders</h5>
                    <div className="table-responsive">
                      <Table hover>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Restaurant</th>
                            <th>Items</th>
                            <th className="text-end">Amount (₹)</th>
                            <th>Status</th>
                            <th>Payment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockOrderHistory.map((order) => (
                            <tr key={order.id}>
                              <td>{order.date}</td>
                              <td>{order.restaurant}</td>
                              <td>
                                {order.items.map((item, index) => (
                                  <div
                                    key={index}
                                    className="d-flex align-items-center mb-1"
                                  >
                                    <Cup
                                      size={14}
                                      className="me-1 text-secondary"
                                    />
                                    {item}
                                  </div>
                                ))}
                              </td>
                              <td className="text-end">{order.amount}</td>
                              <td>
                                <Badge
                                  bg={
                                    order.status === "Delivered"
                                      ? "success"
                                      : "warning"
                                  }
                                >
                                  {order.status}
                                </Badge>
                              </td>
                              <td>{order.paymentMethod}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Card.Body>
                </Card>
              )}

              {/* App Usage Tab */}
              {activeTab === 1 && (
                <Card className="shadow-sm">
                  <Card.Body>
                    <h5 className="mb-3">App Usage Analytics</h5>
                    <Row className="g-4">
                      <Col md={6}>
                        <div className="text-center mb-2 fw-medium">
                          Sessions & Time Spent
                        </div>
                        <div
                          style={{ height: "300px" }}
                          className="chart-container"
                        >
                          <SessionsChart appUsageData={appUsageData} />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="text-center mb-2 fw-medium">
                          Active Time of Day
                        </div>
                        <div
                          style={{ height: "300px" }}
                          className="chart-container"
                        >
                          <ActiveTimeChart activeTimeData={activeTimeData} />
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              )}

              {/* Feedback Tab */}
              {activeTab === 2 && (
                <Card className="shadow-sm">
                  <Card.Body>
                    <h5 className="mb-3">Feedback Messages</h5>
                    {mockFeedbackMessages.map((feedback) => (
                      <Card key={feedback.id} className="mb-3 border">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <div className="d-flex align-items-center">
                              <ChatDots
                                className="text-primary me-2"
                                size={18}
                              />
                              <div className="fw-medium">{feedback.date}</div>
                            </div>
                            <Badge
                              bg={
                                feedback.status === "Unread"
                                  ? "primary"
                                  : "secondary"
                              }
                            >
                              {feedback.status}
                            </Badge>
                          </div>
                          <p className="mb-0">{feedback.message}</p>
                        </Card.Body>
                      </Card>
                    ))}
                  </Card.Body>
                </Card>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

// Export memoized component for better performance
export default memo(UserProfile);
