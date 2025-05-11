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
  People,
  Cart,
  CurrencyDollar,
  Pencil,
  SlashCircle,
  CheckCircle,
  Trash,
  Book,
  Calendar2,
  Megaphone,
  ChatDots,
} from "react-bootstrap-icons";
import ReactApexChart from "react-apexcharts";

// Mock restaurant data
const mockRestaurant = {
  id: 1,
  name: "Spice Garden",
  address: "123 Main St, Mumbai",
  mobile: "+91 9876543210",
  email: "contact@spicegarden.com",
  description:
    "Authentic Indian cuisine with a modern twist. We specialize in North Indian and Mughlai dishes.",
  openingHours: "10:00 AM - 11:00 PM",
  cuisine: ["North Indian", "Mughlai", "Chinese"],
  ordersToday: 45,
  totalOrders: 1245,
  connectedUsers: 320,
  todaySales: 12500,
  subscriptionStatus: "Pro",
  subscriptionDetails: {
    plan: "Pro",
    startDate: "2023-01-15",
    endDate: "2024-01-15",
    price: "₹2999/year",
    features: [
      "No commission on orders",
      "Priority customer support",
      "Advanced analytics",
      "Custom branding",
    ],
  },
  tableBookingsToday: 12,
  isBlocked: false,
  rating: 4.5,
  totalReviews: 230,
  joinedDate: "2022-12-10",
};

// Mock billing history
const mockBillingHistory = [
  {
    id: 1,
    date: "2023-07-01",
    description: "Monthly Subscription",
    amount: 299,
    status: "Paid",
  },
  {
    id: 2,
    date: "2023-07-15",
    description: "Banner Ad Campaign",
    amount: 1500,
    status: "Paid",
  },
  {
    id: 3,
    date: "2023-08-01",
    description: "Monthly Subscription",
    amount: 299,
    status: "Paid",
  },
  {
    id: 4,
    date: "2023-08-10",
    description: "Food Ad Promotion",
    amount: 750,
    status: "Paid",
  },
  {
    id: 5,
    date: "2023-09-01",
    description: "Monthly Subscription",
    amount: 299,
    status: "Paid",
  },
  {
    id: 6,
    date: "2023-09-20",
    description: "SMS Notification Service",
    amount: 450,
    status: "Pending",
  },
];

// Mock feedback messages
const mockFeedbackMessages = [
  {
    id: 1,
    date: "2023-09-15",
    message:
      "The app is working great, but we need more customization options for our menu items.",
    status: "Unread",
  },
  {
    id: 2,
    date: "2023-08-22",
    message:
      "We are having issues with the table booking feature. Sometimes it shows wrong availability.",
    status: "Read",
  },
  {
    id: 3,
    date: "2023-07-30",
    message:
      "Thank you for the recent update. The new dashboard is much easier to use.",
    status: "Read",
  },
];

// Mock visitor analytics data
const visitorAnalyticsData = [
  { name: "Mon", visitors: 120 },
  { name: "Tue", visitors: 150 },
  { name: "Wed", visitors: 180 },
  { name: "Thu", visitors: 170 },
  { name: "Fri", visitors: 200 },
  { name: "Sat", visitors: 250 },
  { name: "Sun", visitors: 220 },
];

// Mock ad data
const adData = [
  { name: "Banner Ads", value: 400 },
  { name: "Food Ads", value: 300 },
  { name: "Promo Ads", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

// Memoized tab components for better performance
const SubscriptionTab = memo(({ subscriptionDetails }) => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h5 className="mb-3">Subscription Details</h5>
        <Row className="g-4">
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item className="px-0">
                <div className="text-muted small">Plan</div>
                <div>{subscriptionDetails.plan}</div>
              </ListGroup.Item>
              <ListGroup.Item className="px-0">
                <div className="text-muted small">Start Date</div>
                <div>{subscriptionDetails.startDate}</div>
              </ListGroup.Item>
              <ListGroup.Item className="px-0">
                <div className="text-muted small">End Date</div>
                <div>{subscriptionDetails.endDate}</div>
              </ListGroup.Item>
              <ListGroup.Item className="px-0">
                <div className="text-muted small">Price</div>
                <div>{subscriptionDetails.price}</div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={6}>
            <div className="mb-2 fw-semibold">Features:</div>
            <ListGroup variant="flush">
              {subscriptionDetails.features.map((feature, index) => (
                <ListGroup.Item
                  key={index}
                  className="px-0 d-flex align-items-center"
                >
                  <CheckCircle className="text-primary me-2" size={16} />
                  <div>{feature}</div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
        <div className="d-flex justify-content-end mt-4">
          <Button variant="outline-primary" className="me-2">
            Change Plan
          </Button>
          <Button variant="primary">Renew Subscription</Button>
        </div>
      </Card.Body>
    </Card>
  );
});

const BillingHistoryTab = memo(({ billingHistory }) => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h5 className="mb-3">Monthly Bill History</h5>
        <div className="table-responsive">
          <Table hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th className="text-end">Amount (₹)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((bill) => (
                <tr key={bill.id}>
                  <td>{bill.date}</td>
                  <td>{bill.description}</td>
                  <td className="text-end">{bill.amount}</td>
                  <td>
                    <Badge bg={bill.status === "Paid" ? "success" : "warning"}>
                      {bill.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
});

const FeedbackTab = memo(({ feedbackMessages, restaurantName }) => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h5 className="mb-3">Feedback Messages</h5>
        {feedbackMessages.map((feedback) => (
          <Card key={feedback.id} className="mb-3 border">
            <Card.Header className="d-flex justify-content-between align-items-center bg-white">
              <div className="d-flex align-items-center">
                <div
                  className={`rounded-circle d-flex align-items-center justify-content-center me-3 ${
                    feedback.status === "Unread" ? "bg-primary" : "bg-secondary"
                  }`}
                  style={{ width: 40, height: 40 }}
                >
                  <ChatDots className="text-white" size={20} />
                </div>
                <div>
                  <div className="fw-medium">{`Message from ${restaurantName}`}</div>
                  <div className="text-muted small">{feedback.date}</div>
                </div>
              </div>
              <Badge
                bg={feedback.status === "Unread" ? "primary" : "secondary"}
              >
                {feedback.status}
              </Badge>
            </Card.Header>
            <Card.Body>
              <p className="mb-0">{feedback.message}</p>
            </Card.Body>
          </Card>
        ))}
      </Card.Body>
    </Card>
  );
});

const AnalyticsTab = memo(({ visitorAnalyticsData, adData, COLORS }) => {
  const visitorChartOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
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
        categories: visitorAnalyticsData.map((item) => item.name),
      },
      yaxis: {
        title: {
          text: "Visitors",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " visitors";
          },
        },
      },
      colors: ["#0d6efd"],
    }),
    [visitorAnalyticsData]
  );

  const visitorChartSeries = useMemo(
    () => [
      {
        name: "Visitors",
        data: visitorAnalyticsData.map((item) => item.visitors),
      },
    ],
    [visitorAnalyticsData]
  );

  const adChartOptions = useMemo(
    () => ({
      chart: {
        type: "donut",
      },
      labels: adData.map((item) => item.name),
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
    }),
    [adData, COLORS]
  );

  const adChartSeries = useMemo(
    () => adData.map((item) => item.value),
    [adData]
  );

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h5 className="mb-3">Visitor Analytics</h5>
        <Row className="g-4">
          <Col md={8}>
            <div style={{ height: "300px" }}>
              <ReactApexChart
                options={visitorChartOptions}
                series={visitorChartSeries}
                type="bar"
                height="100%"
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="text-center mb-2 fw-medium">Ad Distribution</div>
            <div style={{ height: "300px" }}>
              <ReactApexChart
                options={adChartOptions}
                series={adChartSeries}
                type="donut"
                height="100%"
              />
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
});

function RestaurantProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  // Memoized event handlers
  const handleTabChange = useCallback((k) => {
    setActiveTab(parseInt(k));
  }, []);

  const handleBackClick = useCallback(() => {
    navigate("/restaurants");
  }, [navigate]);

  // In a real app, you would fetch the restaurant data based on the ID
  useEffect(() => {
    // Fetch restaurant data
    console.log(`Fetching data for restaurant with ID: ${id}`);
  }, [id]);

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
        <h4 className="mb-0">Restaurant Profile</h4>
      </div>

      <Row className="g-4">
        {/* Restaurant Info Card */}
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex align-items-center">
                  <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                    style={{ width: 64, height: 64, fontSize: "1.5rem" }}
                  >
                    {mockRestaurant.name.charAt(0)}
                  </div>
                  <div>
                    <h5>{mockRestaurant.name}</h5>
                    <div>
                      <Badge bg="primary" className="me-2">
                        {mockRestaurant.subscriptionStatus}
                      </Badge>
                      <Badge
                        bg={mockRestaurant.isBlocked ? "danger" : "success"}
                      >
                        {mockRestaurant.isBlocked ? "Blocked" : "Active"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Edit</Tooltip>}
                  >
                    <Button variant="link" className="p-1 text-primary">
                      <Pencil size={18} />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        {mockRestaurant.isBlocked ? "Unblock" : "Block"}
                      </Tooltip>
                    }
                  >
                    <Button
                      variant="link"
                      className={`p-1 ${
                        mockRestaurant.isBlocked
                          ? "text-success"
                          : "text-warning"
                      }`}
                    >
                      {mockRestaurant.isBlocked ? (
                        <CheckCircle size={18} />
                      ) : (
                        <SlashCircle size={18} />
                      )}
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Delete</Tooltip>}
                  >
                    <Button variant="link" className="p-1 text-danger">
                      <Trash size={18} />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>

              <hr className="my-3" />

              <ListGroup variant="flush">
                <ListGroup.Item className="px-0 d-flex align-items-center">
                  <GeoAlt className="me-3 text-secondary" size={20} />
                  <div>
                    <div className="text-muted small">Address</div>
                    <div>{mockRestaurant.address}</div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="px-0 d-flex align-items-center">
                  <Telephone className="me-3 text-secondary" size={20} />
                  <div>
                    <div className="text-muted small">Mobile</div>
                    <div>{mockRestaurant.mobile}</div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="px-0 d-flex align-items-center">
                  <Envelope className="me-3 text-secondary" size={20} />
                  <div>
                    <div className="text-muted small">Email</div>
                    <div>{mockRestaurant.email}</div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="px-0 d-flex align-items-center">
                  <Cup className="me-3 text-secondary" size={20} />
                  <div>
                    <div className="text-muted small">Cuisine</div>
                    <div className="d-flex flex-wrap gap-1 mt-1">
                      {mockRestaurant.cuisine.map((item, index) => (
                        <Badge
                          key={index}
                          bg="light"
                          text="dark"
                          className="me-1"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </ListGroup.Item>
              </ListGroup>

              <p className="mt-3 mb-3 text-secondary">
                {mockRestaurant.description}
              </p>

              <hr className="my-3" />

              <div className="text-muted small mb-1">
                Member since: {mockRestaurant.joinedDate}
              </div>
              <div className="text-muted small">
                Rating: {mockRestaurant.rating} ({mockRestaurant.totalReviews}{" "}
                reviews)
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Stats Cards */}
        <Col md={8}>
          <Row className="g-3">
            <Col sm={6} md={3}>
              <Card className="shadow-sm text-center h-100">
                <Card.Body>
                  <Cart className="text-primary mb-2" size={40} />
                  <h5 className="mb-1">{mockRestaurant.ordersToday}</h5>
                  <div className="text-muted small">Today's Orders</div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} md={3}>
              <Card className="shadow-sm text-center h-100">
                <Card.Body>
                  <Cart className="text-secondary mb-2" size={40} />
                  <h5 className="mb-1">{mockRestaurant.totalOrders}</h5>
                  <div className="text-muted small">Total Orders</div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} md={3}>
              <Card className="shadow-sm text-center h-100">
                <Card.Body>
                  <People className="text-success mb-2" size={40} />
                  <h5 className="mb-1">{mockRestaurant.connectedUsers}</h5>
                  <div className="text-muted small">Connected Users</div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} md={3}>
              <Card className="shadow-sm text-center h-100">
                <Card.Body>
                  <CurrencyDollar className="text-warning mb-2" size={40} />
                  <h5 className="mb-1">₹{mockRestaurant.todaySales}</h5>
                  <div className="text-muted small">Today's Sales</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="mt-4">
            <Tabs
              activeKey={activeTab}
              onSelect={handleTabChange}
              className="mb-3"
              id="restaurant-tabs"
            >
              <Tab eventKey={0} title="Subscription" />
              <Tab eventKey={1} title="Billing History" />
              <Tab eventKey={2} title="Feedback" />
              <Tab eventKey={3} title="Analytics" />
            </Tabs>
            <div>
              {/* Subscription Tab */}
              {activeTab === 0 && (
                <SubscriptionTab
                  subscriptionDetails={mockRestaurant.subscriptionDetails}
                />
              )}

              {/* Billing History Tab */}
              {activeTab === 1 && (
                <BillingHistoryTab billingHistory={mockBillingHistory} />
              )}

              {/* Feedback Tab */}
              {activeTab === 2 && (
                <FeedbackTab
                  feedbackMessages={mockFeedbackMessages}
                  restaurantName={mockRestaurant.name}
                />
              )}

              {/* Analytics Tab */}
              {activeTab === 3 && (
                <AnalyticsTab
                  visitorAnalyticsData={visitorAnalyticsData}
                  adData={adData}
                  COLORS={COLORS}
                />
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

// Export memoized component for better performance
export default memo(RestaurantProfile);
