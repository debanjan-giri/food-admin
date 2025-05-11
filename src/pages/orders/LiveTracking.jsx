import { useState, useMemo, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  ListGroup,
  Badge,
  Stack,
  ProgressBar,
} from "react-bootstrap";
import {
  ArrowLeft,
  Search,
  Phone,
  MapPin,
  UtensilsCrossed,
  User,
  Bike,
  Clock,
  DollarSign,
  Utensils,
  CheckCircle,
  Navigation,
  Map,
} from "lucide-react";
import OptimizedImage from "../../components/OptimizedImage";
import "./LiveTracking.css";

// Mock data for active deliveries
const mockActiveDeliveries = [
  {
    id: 1,
    orderId: "ORD12345",
    deliveryPartner: {
      id: 2,
      name: "Suresh Patel",
      phone: "+91 9876543211",
      photo: "https://via.placeholder.com/150",
      rating: 4.2,
      vehicleType: "Scooter",
      vehicleNumber: "DL02CD5678",
    },
    restaurant: {
      id: 1,
      name: "Spice Garden",
      address: "123 Main St, Mumbai",
      phone: "+91 9876543210",
    },
    user: {
      id: 1,
      name: "Rahul Sharma",
      address: "456 Park Ave, Mumbai",
      phone: "+91 9876543220",
    },
    orderDetails: {
      items: [
        { name: "Butter Chicken", quantity: 1, price: 350 },
        { name: "Naan", quantity: 2, price: 60 },
        { name: "Jeera Rice", quantity: 1, price: 150 },
      ],
      totalAmount: 560,
      paymentMethod: "Online Payment",
      orderTime: "2023-09-25 14:30:00",
    },
    deliveryDetails: {
      status: "Accepted",
      estimatedDeliveryTime: "30 mins",
      deliveryCharge: 40,
      distance: "3.5 km",
      currentLocation: "Near Spice Garden, Mumbai",
      steps: [
        { label: "Order Placed", completed: true, time: "14:30" },
        { label: "Restaurant Accepted", completed: true, time: "14:35" },
        { label: "Delivery Partner Assigned", completed: true, time: "14:40" },
        { label: "Preparing Food", completed: true, time: "14:45" },
        { label: "Picked Up", completed: false, time: "" },
        { label: "Delivered", completed: false, time: "" },
      ],
    },
  },
  {
    id: 2,
    orderId: "ORD12346",
    deliveryPartner: {
      id: 5,
      name: "Vikram Reddy",
      phone: "+91 9876543214",
      photo: "https://via.placeholder.com/150",
      rating: 4.0,
      vehicleType: "Bike",
      vehicleNumber: "TN05IJ7890",
    },
    restaurant: {
      id: 2,
      name: "Tandoori Nights",
      address: "456 Park Ave, Delhi",
      phone: "+91 9876543211",
    },
    user: {
      id: 2,
      name: "Priya Patel",
      address: "789 Oak St, Delhi",
      phone: "+91 9876543221",
    },
    orderDetails: {
      items: [
        { name: "Paneer Tikka", quantity: 1, price: 280 },
        { name: "Roti", quantity: 4, price: 80 },
        { name: "Dal Makhani", quantity: 1, price: 220 },
        { name: "Gulab Jamun", quantity: 2, price: 120 },
      ],
      totalAmount: 700,
      paymentMethod: "Cash on Delivery",
      orderTime: "2023-09-25 14:15:00",
    },
    deliveryDetails: {
      status: "Picked Up",
      estimatedDeliveryTime: "15 mins",
      deliveryCharge: 50,
      distance: "4.2 km",
      currentLocation: "On Ring Road, Delhi",
      steps: [
        { label: "Order Placed", completed: true, time: "14:15" },
        { label: "Restaurant Accepted", completed: true, time: "14:20" },
        { label: "Delivery Partner Assigned", completed: true, time: "14:25" },
        { label: "Preparing Food", completed: true, time: "14:35" },
        { label: "Picked Up", completed: true, time: "14:50" },
        { label: "Delivered", completed: false, time: "" },
      ],
    },
  },
  {
    id: 3,
    orderId: "ORD12347",
    deliveryPartner: {
      id: 1,
      name: "Rajesh Kumar",
      phone: "+91 9876543210",
      photo: "https://via.placeholder.com/150",
      rating: 4.5,
      vehicleType: "Bike",
      vehicleNumber: "MH01AB1234",
    },
    restaurant: {
      id: 4,
      name: "Biryani Palace",
      address: "101 Pine St, Hyderabad",
      phone: "+91 9876543213",
    },
    user: {
      id: 4,
      name: "Sneha Gupta",
      address: "202 Maple St, Hyderabad",
      phone: "+91 9876543223",
    },
    orderDetails: {
      items: [
        { name: "Hyderabadi Biryani", quantity: 2, price: 600 },
        { name: "Raita", quantity: 1, price: 50 },
        { name: "Kebab", quantity: 4, price: 240 },
      ],
      totalAmount: 890,
      paymentMethod: "Online Payment",
      orderTime: "2023-09-25 14:00:00",
    },
    deliveryDetails: {
      status: "Preparing",
      estimatedDeliveryTime: "45 mins",
      deliveryCharge: 60,
      distance: "5.8 km",
      currentLocation: "At Biryani Palace, Hyderabad",
      steps: [
        { label: "Order Placed", completed: true, time: "14:00" },
        { label: "Restaurant Accepted", completed: true, time: "14:05" },
        { label: "Delivery Partner Assigned", completed: true, time: "14:10" },
        { label: "Preparing Food", completed: true, time: "14:15" },
        { label: "Picked Up", completed: false, time: "" },
        { label: "Delivered", completed: false, time: "" },
      ],
    },
  },
];

// Memoized status badge variant function
const getStatusVariant = (status) => {
  switch (status) {
    case "Accepted":
      return "primary";
    case "Preparing":
      return "warning";
    case "Picked Up":
      return "info";
    case "Delivered":
      return "success";
    default:
      return "secondary";
  }
};

function LiveTracking() {
  const navigate = useNavigate();
  const [selectedDelivery, setSelectedDelivery] = useState(
    mockActiveDeliveries[0]
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Memoized event handlers
  const handleStatusFilterChange = useCallback((event) => {
    setStatusFilter(event.target.value);
  }, []);

  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleSelectDelivery = useCallback((delivery) => {
    setSelectedDelivery(delivery);
  }, []);

  // Memoized filtered deliveries for better performance
  const filteredDeliveries = useMemo(() => {
    return mockActiveDeliveries.filter((delivery) => {
      const matchesSearch =
        searchTerm === "" ||
        delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.deliveryPartner.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        delivery.restaurant.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        delivery.user.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        delivery.deliveryDetails.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  return (
    <Container fluid className="p-0">
      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3 mb-3">
        <Button
          variant="outline-primary"
          className="align-self-start align-self-sm-center"
          onClick={() => navigate("/delivery")}
        >
          <ArrowLeft size={16} className="me-2" />
          Back
        </Button>
        <h4 className="mb-0">Live Tracking Panel</h4>
      </div>

      <Row className="g-3">
        <Col xs={12} md={4}>
          <Card className="shadow-sm rounded">
            <Card.Body className="p-3">
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3 gap-2">
                <h6 className="mb-0">Active Deliveries</h6>
                <div className="d-flex flex-column flex-sm-row gap-2 w-100 w-sm-auto">
                  <InputGroup>
                    <InputGroup.Text>
                      <Search size={16} />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Search"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </InputGroup>
                  <Form.Select
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                    className="min-width-120"
                  >
                    <option value="all">All</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Picked Up">Picked Up</option>
                    <option value="Delivered">Delivered</option>
                  </Form.Select>
                </div>
              </div>
              <ListGroup>
                {filteredDeliveries.map((delivery) => (
                  <Card
                    key={delivery.id}
                    className={`mb-2 rounded cursor-pointer ${
                      selectedDelivery.id === delivery.id
                        ? "border-primary border-2"
                        : ""
                    }`}
                    onClick={() => handleSelectDelivery(delivery)}
                  >
                    <Card.Body className="p-2">
                      <div className="d-flex">
                        <div className="me-3">
                          <OptimizedImage
                            src={
                              "https://www.shutterstock.com/image-photo/indian-happy-delivery-boy-showing-260nw-2120449805.jpg"
                            }
                            alt="Delivery Person"
                            width={48}
                            height={48}
                            roundedCircle
                          />
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="mb-0">{delivery.orderId}</h6>
                            <Badge
                              bg={getStatusVariant(
                                delivery.deliveryDetails.status
                              )}
                            >
                              {delivery.deliveryDetails.status}
                            </Badge>
                          </div>
                          <div className="d-flex align-items-center mt-1">
                            <Bike size={14} className="me-1 text-muted" />
                            <small className="text-muted">
                              {delivery.deliveryPartner.name}
                            </small>
                          </div>
                          <div className="d-flex align-items-center mt-1">
                            <UtensilsCrossed
                              size={14}
                              className="me-1 text-muted"
                            />
                            <small className="text-muted">
                              {delivery.restaurant.name}
                            </small>
                          </div>
                          <div className="d-flex align-items-center mt-1">
                            <User size={14} className="me-1 text-muted" />
                            <small className="text-muted">
                              {delivery.user.name}
                            </small>
                          </div>
                          <div className="d-flex align-items-center mt-1">
                            <Clock size={14} className="me-1 text-muted" />
                            <small className="text-muted">
                              ETA:{" "}
                              {delivery.deliveryDetails.estimatedDeliveryTime}
                            </small>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={8}>
          {selectedDelivery && (
            <Card className="shadow-sm rounded">
              <Card.Body className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">
                    Delivery Details - {selectedDelivery.orderId}
                  </h5>
                  <Badge
                    bg={getStatusVariant(
                      selectedDelivery.deliveryDetails.status
                    )}
                  >
                    {selectedDelivery.deliveryDetails.status}
                  </Badge>
                </div>

                <Row className="g-3">
                  <Col xs={12} md={6}>
                    <Card className="mb-3 rounded">
                      <Card.Header className="d-flex align-items-center">
                        <OptimizedImage
                          src={
                            "https://www.shutterstock.com/image-photo/indian-happy-delivery-boy-showing-260nw-2120449805.jpg"
                          }
                          alt="Delivery Partner"
                          roundedCircle
                          width={40}
                          height={40}
                          className="me-2"
                        />
                        <div>
                          <h6 className="mb-0">Delivery Partner</h6>
                          <small>{selectedDelivery.deliveryPartner.name}</small>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <div className="d-flex align-items-center mb-2">
                          <Phone size={16} className="me-2 text-muted" />
                          <span>{selectedDelivery.deliveryPartner.phone}</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <Bike size={16} className="me-2 text-muted" />
                          <span>
                            {selectedDelivery.deliveryPartner.vehicleType} -{" "}
                            {selectedDelivery.deliveryPartner.vehicleNumber}
                          </span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <Navigation size={16} className="me-2 text-muted" />
                          <span>
                            Current Location:{" "}
                            {selectedDelivery.deliveryDetails.currentLocation}
                          </span>
                        </div>
                        <Button
                          variant="outline-primary"
                          className="w-100 mt-2"
                        >
                          <Map size={16} className="me-2" />
                          View on Map
                        </Button>
                      </Card.Body>
                    </Card>

                    <Row className="g-3">
                      <Col xs={12} sm={6}>
                        <Card className="h-100 rounded">
                          <Card.Header className="d-flex align-items-center">
                            <div
                              className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-2"
                              style={{ width: 40, height: 40 }}
                            >
                              <UtensilsCrossed size={20} color="white" />
                            </div>
                            <div>
                              <h6 className="mb-0">Restaurant</h6>
                              <small>{selectedDelivery.restaurant.name}</small>
                            </div>
                          </Card.Header>
                          <Card.Body>
                            <div className="d-flex align-items-start mb-2">
                              <MapPin
                                size={16}
                                className="me-2 mt-1 text-muted"
                              />
                              <span>{selectedDelivery.restaurant.address}</span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <Phone size={16} className="me-2 text-muted" />
                              <span>{selectedDelivery.restaurant.phone}</span>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col xs={12} sm={6}>
                        <Card className="h-100 rounded">
                          <Card.Header className="d-flex align-items-center">
                            <div
                              className="rounded-circle bg-info d-flex align-items-center justify-content-center me-2"
                              style={{ width: 40, height: 40 }}
                            >
                              <User size={20} color="white" />
                            </div>
                            <div>
                              <h6 className="mb-0">Customer</h6>
                              <small>{selectedDelivery.user.name}</small>
                            </div>
                          </Card.Header>
                          <Card.Body>
                            <div className="d-flex align-items-start mb-2">
                              <MapPin
                                size={16}
                                className="me-2 mt-1 text-muted"
                              />
                              <span>{selectedDelivery.user.address}</span>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <Phone size={16} className="me-2 text-muted" />
                              <span>{selectedDelivery.user.phone}</span>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={12} md={6}>
                    <Card className="mb-3 rounded">
                      <Card.Header>
                        <h6 className="mb-0">Order Details</h6>
                        <small>
                          Order Time: {selectedDelivery.orderDetails.orderTime}
                        </small>
                      </Card.Header>
                      <Card.Body>
                        <ListGroup variant="flush">
                          {selectedDelivery.orderDetails.items.map(
                            (item, index) => (
                              <ListGroup.Item
                                key={index}
                                className="d-flex align-items-center px-0"
                              >
                                <Utensils
                                  size={16}
                                  className="me-2 text-muted"
                                />
                                <div className="d-flex justify-content-between w-100">
                                  <span>
                                    {item.name} x{item.quantity}
                                  </span>
                                  <span>₹{item.price}</span>
                                </div>
                              </ListGroup.Item>
                            )
                          )}
                        </ListGroup>
                        <hr className="my-2" />
                        <div className="d-flex justify-content-between mb-2">
                          <span>Subtotal:</span>
                          <span>
                            ₹
                            {selectedDelivery.orderDetails.totalAmount -
                              selectedDelivery.deliveryDetails.deliveryCharge}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Delivery Charge:</span>
                          <span>
                            ₹{selectedDelivery.deliveryDetails.deliveryCharge}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="fw-bold">Total:</span>
                          <span className="fw-bold">
                            ₹{selectedDelivery.orderDetails.totalAmount}
                          </span>
                        </div>
                        <div className="d-flex align-items-center mt-3">
                          <DollarSign size={16} className="me-2 text-muted" />
                          <span>
                            Payment Method:{" "}
                            {selectedDelivery.orderDetails.paymentMethod}
                          </span>
                        </div>
                      </Card.Body>
                    </Card>

                    <Card className="rounded">
                      <Card.Header>
                        <h6 className="mb-0">Delivery Status</h6>
                        <small>
                          Distance: {selectedDelivery.deliveryDetails.distance}{" "}
                          | ETA:{" "}
                          {
                            selectedDelivery.deliveryDetails
                              .estimatedDeliveryTime
                          }
                        </small>
                      </Card.Header>
                      <Card.Body>
                        {selectedDelivery.deliveryDetails.steps.map(
                          (step, index) => {
                            const activeStep =
                              selectedDelivery.deliveryDetails.steps.findIndex(
                                (s) => !s.completed
                              );

                            return (
                              <div key={index} className="d-flex mb-3">
                                <div className="me-3 position-relative">
                                  <div
                                    className={`rounded-circle d-flex align-items-center justify-content-center ${
                                      step.completed
                                        ? "bg-success"
                                        : index === activeStep
                                        ? "bg-primary"
                                        : "bg-light border"
                                    }`}
                                    style={{ width: 24, height: 24 }}
                                  >
                                    {step.completed && (
                                      <CheckCircle size={14} color="white" />
                                    )}
                                  </div>
                                  {index <
                                    selectedDelivery.deliveryDetails.steps
                                      .length -
                                      1 && (
                                    <div
                                      className="position-absolute"
                                      style={{
                                        width: 2,
                                        background:
                                          index < activeStep
                                            ? "#198754"
                                            : "#dee2e6",
                                        top: 24,
                                        bottom: -24,
                                        left: 11,
                                      }}
                                    ></div>
                                  )}
                                </div>
                                <div className="d-flex justify-content-between w-100">
                                  <span>{step.label}</span>
                                  {step.time && (
                                    <small className="text-muted">
                                      {step.time}
                                    </small>
                                  )}
                                </div>
                              </div>
                            );
                          }
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

// Export memoized component for better performance
export default memo(LiveTracking);
