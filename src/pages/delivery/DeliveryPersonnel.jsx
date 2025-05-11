import { useState, useCallback, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Table,
  Badge,
  Modal,
  OverlayTrigger,
  Tooltip,
  Pagination,
} from "react-bootstrap";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  Eye,
  Phone,
  MapPin,
  Bike,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Map,
  Star,
} from "lucide-react";
import OptimizedImage from "../../components/OptimizedImage";
import VirtualList from "../../components/VirtualList";

// Mock data for delivery partners
const mockDeliveryPartners = [
  {
    id: 1,
    name: "Rajesh Kumar",
    photo: "https://via.placeholder.com/150",
    phone: "+91 9876543210",
    address: "123 Main St, Mumbai",
    aadharCard: "XXXX-XXXX-1234",
    totalDeliveries: 245,
    likes: 120,
    dislikes: 15,
    spamReports: 2,
    rating: 4.5,
    status: "Active",
    currentStatus: "Available",
    joiningDate: "2023-01-15",
    vehicleType: "Bike",
    vehicleNumber: "MH01AB1234",
  },
  {
    id: 2,
    name: "Suresh Patel",
    photo: "https://via.placeholder.com/150",
    phone: "+91 9876543211",
    address: "456 Park Ave, Delhi",
    aadharCard: "XXXX-XXXX-5678",
    totalDeliveries: 178,
    likes: 85,
    dislikes: 12,
    spamReports: 1,
    rating: 4.2,
    status: "Active",
    currentStatus: "Delivering",
    joiningDate: "2023-02-20",
    vehicleType: "Scooter",
    vehicleNumber: "DL02CD5678",
  },
  {
    id: 3,
    name: "Amit Singh",
    photo: "https://via.placeholder.com/150",
    phone: "+91 9876543212",
    address: "789 Oak St, Bangalore",
    aadharCard: "XXXX-XXXX-9012",
    totalDeliveries: 320,
    likes: 180,
    dislikes: 25,
    spamReports: 3,
    rating: 3.8,
    status: "Blocked",
    currentStatus: "Unavailable",
    joiningDate: "2022-11-10",
    vehicleType: "Bike",
    vehicleNumber: "KA03EF9012",
  },
  {
    id: 4,
    name: "Priya Sharma",
    photo: "https://via.placeholder.com/150",
    phone: "+91 9876543213",
    address: "101 Pine St, Hyderabad",
    aadharCard: "XXXX-XXXX-3456",
    totalDeliveries: 156,
    likes: 90,
    dislikes: 10,
    spamReports: 0,
    rating: 4.7,
    status: "Active",
    currentStatus: "Available",
    joiningDate: "2023-03-05",
    vehicleType: "Scooter",
    vehicleNumber: "TS04GH3456",
  },
  {
    id: 5,
    name: "Vikram Reddy",
    photo: "https://via.placeholder.com/150",
    phone: "+91 9876543214",
    address: "202 Maple St, Chennai",
    aadharCard: "XXXX-XXXX-7890",
    totalDeliveries: 210,
    likes: 110,
    dislikes: 20,
    spamReports: 2,
    rating: 4.0,
    status: "Active",
    currentStatus: "Delivering",
    joiningDate: "2023-01-25",
    vehicleType: "Bike",
    vehicleNumber: "TN05IJ7890",
  },
];

// Mock data for active deliveries
const mockActiveDeliveries = [
  {
    id: 1,
    deliveryPartnerId: 2,
    deliveryPartnerName: "Suresh Patel",
    orderId: "ORD12345",
    restaurant: "Spice Garden",
    user: "Rahul Sharma",
    userAddress: "123 Main St, Mumbai",
    status: "Accepted",
    estimatedDeliveryTime: "30 mins",
    orderAmount: 450,
    deliveryCharge: 40,
  },
  {
    id: 2,
    deliveryPartnerId: 5,
    deliveryPartnerName: "Vikram Reddy",
    orderId: "ORD12346",
    restaurant: "Tandoori Nights",
    user: "Priya Patel",
    userAddress: "456 Park Ave, Delhi",
    status: "Picked Up",
    estimatedDeliveryTime: "15 mins",
    orderAmount: 650,
    deliveryCharge: 50,
  },
];

// Get status badge variant
const getStatusVariant = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Blocked":
      return "danger";
    default:
      return "secondary";
  }
};

// Get current status badge variant
const getCurrentStatusVariant = (status) => {
  switch (status) {
    case "Available":
      return "success";
    case "Delivering":
      return "primary";
    case "Unavailable":
      return "danger";
    default:
      return "secondary";
  }
};

// Memoized partner row component for better performance
const PartnerRow = memo(
  ({
    partner,
    onViewPartner,
    onOpenDialog,
    getStatusVariant,
    getCurrentStatusVariant,
  }) => {
    return (
      <tr key={partner.id}>
        <td>
          <div className="d-flex align-items-center">
            <OptimizedImage
              src={
                "https://www.shutterstock.com/image-photo/indian-happy-delivery-boy-showing-260nw-2120449805.jpg"
              }
              alt={partner.name}
              roundedCircle
              width={32}
              height={32}
              className="me-2"
            />
            {partner.name}
          </div>
        </td>
        <td>
          <div className="d-flex align-items-center">
            <Phone size={14} className="me-1 text-secondary" />
            {partner.phone}
          </div>
        </td>
        <td>
          <div className="d-flex align-items-center">
            <MapPin size={14} className="me-1 text-secondary" />
            {partner.address}
          </div>
        </td>
        <td className="text-end">{partner.totalDeliveries}</td>
        <td className="text-end">
          <div className="d-flex align-items-center justify-content-end">
            <ThumbsUp size={14} className="me-1 text-success" />
            {partner.likes}
          </div>
        </td>
        <td className="text-end">
          <div className="d-flex align-items-center justify-content-end">
            <ThumbsDown size={14} className="me-1 text-danger" />
            {partner.dislikes}
          </div>
        </td>
        <td className="text-end">
          <div className="d-flex align-items-center justify-content-end">
            <Flag size={14} className="me-1 text-warning" />
            {partner.spamReports}
          </div>
        </td>
        <td>
          <div className="d-flex align-items-center">
            <Star size={14} className="me-1 text-warning" />
            {partner.rating}
          </div>
        </td>
        <td>
          <Badge bg={getStatusVariant(partner.status)}>{partner.status}</Badge>
        </td>
        <td>
          <Badge bg={getCurrentStatusVariant(partner.currentStatus)}>
            {partner.currentStatus}
          </Badge>
        </td>
        <td className="text-center">
          <div className="d-flex justify-content-center">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>View Details</Tooltip>}
            >
              <Button
                variant="link"
                className="p-1 text-info"
                onClick={() => onViewPartner(partner)}
              >
                <Eye size={16} />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
              <Button
                variant="link"
                className="p-1 text-primary"
                onClick={() => console.log("Edit partner", partner.id)}
              >
                <Edit size={16} />
              </Button>
            </OverlayTrigger>

            {partner.status === "Active" ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Block</Tooltip>}
              >
                <Button
                  variant="link"
                  className="p-1 text-warning"
                  onClick={() => onOpenDialog(partner, "block")}
                >
                  <Ban size={16} />
                </Button>
              </OverlayTrigger>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Unblock</Tooltip>}
              >
                <Button
                  variant="link"
                  className="p-1 text-success"
                  onClick={() => onOpenDialog(partner, "unblock")}
                >
                  <CheckCircle size={16} />
                </Button>
              </OverlayTrigger>
            )}

            <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
              <Button
                variant="link"
                className="p-1 text-danger"
                onClick={() => onOpenDialog(partner, "delete")}
              >
                <Trash2 size={16} />
              </Button>
            </OverlayTrigger>
          </div>
        </td>
      </tr>
    );
  }
);

function DeliveryPersonnel() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [dialogAction, setDialogAction] = useState("");
  const [viewPartnerDetails, setViewPartnerDetails] = useState(false);
  const [useVirtualList, setUseVirtualList] = useState(false);

  // Memoized event handlers
  const handleChangePage = useCallback((pageNumber) => {
    setPage(pageNumber - 1);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  }, []);

  const handleOpenDialog = useCallback((partner, action) => {
    setSelectedPartner(partner);
    setDialogAction(action);
    setOpenDialog(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  const handleConfirmAction = useCallback(() => {
    // Handle the action (block/unblock/delete)
    console.log(
      `${dialogAction} delivery partner with ID: ${selectedPartner?.id}`
    );
    setOpenDialog(false);
  }, [dialogAction, selectedPartner]);

  const handleViewPartner = useCallback((partner) => {
    setSelectedPartner(partner);
    setViewPartnerDetails(true);
  }, []);

  const handleClosePartnerDetails = useCallback(() => {
    setViewPartnerDetails(false);
  }, []);

  const handleViewLiveTracking = useCallback(() => {
    navigate("/delivery/live");
  }, [navigate]);

  const toggleVirtualList = useCallback(() => {
    setUseVirtualList((prev) => !prev);
  }, []);

  // Filter delivery partners based on search term - memoized for better performance
  const filteredPartners = useMemo(
    () =>
      mockDeliveryPartners.filter(
        (partner) =>
          partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          partner.phone.includes(searchTerm) ||
          partner.address.toLowerCase().includes(searchTerm)
      ),
    [searchTerm]
  );

  return (
    <Container fluid>
      <h4 className="mb-3">Delivery Personnel Management</h4>

      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-stretch align-items-sm-center mb-3 gap-2">
        <InputGroup className="w-100 w-sm-50">
          <InputGroup.Text>
            <Search size={16} />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search by name, phone, or address"
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
        <div className="d-flex gap-2 flex-wrap">
          <Button
            variant="outline-primary"
            className="d-flex align-items-center"
            onClick={toggleVirtualList}
          >
            {useVirtualList ? "Standard View" : "Virtual List"}
          </Button>
          <Button
            variant="outline-primary"
            className="d-flex align-items-center"
            onClick={handleViewLiveTracking}
          >
            <Map size={16} className="me-2" />
            Live Tracking
          </Button>
          <Button
            variant="primary"
            className="d-flex align-items-center"
            onClick={() => console.log("Add new delivery partner")}
          >
            <Plus size={16} className="me-2" />
            Add Delivery Partner
          </Button>
        </div>
      </div>

      <Card className="shadow-sm">
        <Card.Body className="p-0">
          {useVirtualList ? (
            // Virtual List Implementation
            <div className="mb-3">
              <div className="table-responsive">
                <Table hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th className="text-end">Total Deliveries</th>
                      <th className="text-end">Likes</th>
                      <th className="text-end">Dislikes</th>
                      <th className="text-end">Spam Reports</th>
                      <th>Rating</th>
                      <th>Status</th>
                      <th>Current Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                </Table>
              </div>
              <div style={{ height: "500px" }}>
                <VirtualList
                  items={filteredPartners}
                  itemHeight={60}
                  height={500}
                  overscan={5}
                  renderItem={(partner) => (
                    <div key={partner.id} className="py-2 border-bottom">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <OptimizedImage
                            src={
                              "https://www.shutterstock.com/image-photo/indian-happy-delivery-boy-showing-260nw-2120449805.jpg"
                            }
                            alt={partner.name}
                            roundedCircle
                            width={32}
                            height={32}
                            className="me-2"
                          />
                          <div>
                            <div className="fw-medium">{partner.name}</div>
                            <div className="d-flex align-items-center small text-muted">
                              <Phone size={12} className="me-1" />
                              {partner.phone}
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <Badge
                            bg={getStatusVariant(partner.status)}
                            className="me-2"
                          >
                            {partner.status}
                          </Badge>
                          <Badge
                            bg={getCurrentStatusVariant(partner.currentStatus)}
                            className="me-2"
                          >
                            {partner.currentStatus}
                          </Badge>
                          <div className="d-flex">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-1"
                              onClick={() => handleViewPartner(partner)}
                            >
                              View
                            </Button>
                            <Button
                              variant={
                                partner.status === "Active"
                                  ? "outline-warning"
                                  : "outline-success"
                              }
                              size="sm"
                              onClick={() =>
                                handleOpenDialog(
                                  partner,
                                  partner.status === "Active"
                                    ? "block"
                                    : "unblock"
                                )
                              }
                            >
                              {partner.status === "Active"
                                ? "Block"
                                : "Unblock"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
          ) : (
            // Standard Table View
            <div className="table-responsive">
              <Table hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th className="text-end">Total Deliveries</th>
                    <th className="text-end">Likes</th>
                    <th className="text-end">Dislikes</th>
                    <th className="text-end">Spam Reports</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Current Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPartners
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((partner) => (
                      <tr key={partner.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <OptimizedImage
                              src={
                                "https://www.shutterstock.com/image-photo/indian-happy-delivery-boy-showing-260nw-2120449805.jpg"
                              }
                              alt={partner.name}
                              roundedCircle
                              width={32}
                              height={32}
                              className="me-2"
                            />
                            {partner.name}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <Phone size={14} className="me-1 text-secondary" />
                            {partner.phone}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <MapPin size={14} className="me-1 text-secondary" />
                            {partner.address}
                          </div>
                        </td>
                        <td className="text-end">{partner.totalDeliveries}</td>
                        <td className="text-end">
                          <div className="d-flex align-items-center justify-content-end">
                            <ThumbsUp size={14} className="me-1 text-success" />
                            {partner.likes}
                          </div>
                        </td>
                        <td className="text-end">
                          <div className="d-flex align-items-center justify-content-end">
                            <ThumbsDown
                              size={14}
                              className="me-1 text-danger"
                            />
                            {partner.dislikes}
                          </div>
                        </td>
                        <td className="text-end">
                          <div className="d-flex align-items-center justify-content-end">
                            <Flag size={14} className="me-1 text-warning" />
                            {partner.spamReports}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="d-flex me-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  fill={
                                    i < Math.floor(partner.rating)
                                      ? "gold"
                                      : "none"
                                  }
                                  color={
                                    i < Math.floor(partner.rating)
                                      ? "gold"
                                      : "#ccc"
                                  }
                                />
                              ))}
                            </div>
                            <small>({partner.rating})</small>
                          </div>
                        </td>
                        <td>
                          <Badge bg={getStatusVariant(partner.status)}>
                            {partner.status}
                          </Badge>
                        </td>
                        <td>
                          <Badge
                            bg={getCurrentStatusVariant(partner.currentStatus)}
                          >
                            {partner.currentStatus}
                          </Badge>
                        </td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center">
                            <OverlayTrigger
                              placement="top"
                              overlay={<Tooltip>View Details</Tooltip>}
                            >
                              <Button
                                variant="link"
                                className="p-1 text-info"
                                onClick={() => handleViewPartner(partner)}
                              >
                                <Eye size={16} />
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                              placement="top"
                              overlay={<Tooltip>Edit</Tooltip>}
                            >
                              <Button
                                variant="link"
                                className="p-1 text-primary"
                                onClick={() =>
                                  console.log(`Edit partner ${partner.id}`)
                                }
                              >
                                <Edit size={16} />
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip>
                                  {partner.status === "Blocked"
                                    ? "Unblock"
                                    : "Block"}
                                </Tooltip>
                              }
                            >
                              <Button
                                variant="link"
                                className={`p-1 ${
                                  partner.status === "Blocked"
                                    ? "text-success"
                                    : "text-warning"
                                }`}
                                onClick={() =>
                                  handleOpenDialog(
                                    partner,
                                    partner.status === "Blocked"
                                      ? "unblock"
                                      : "block"
                                  )
                                }
                              >
                                {partner.status === "Blocked" ? (
                                  <CheckCircle size={16} />
                                ) : (
                                  <Ban size={16} />
                                )}
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                              placement="top"
                              overlay={<Tooltip>Delete</Tooltip>}
                            >
                              <Button
                                variant="link"
                                className="p-1 text-danger"
                                onClick={() =>
                                  handleOpenDialog(partner, "delete")
                                }
                              >
                                <Trash2 size={16} />
                              </Button>
                            </OverlayTrigger>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          )}
          <div className="d-flex justify-content-between align-items-center p-3">
            <div>
              <Form.Select
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
                style={{ width: "auto" }}
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
              </Form.Select>
            </div>
            <Pagination>
              <Pagination.Prev
                onClick={() => page > 0 && handleChangePage(page)}
                disabled={page === 0}
              />
              {[...Array(Math.ceil(filteredPartners.length / rowsPerPage))].map(
                (_, i) => (
                  <Pagination.Item
                    key={i}
                    active={i === page}
                    onClick={() => handleChangePage(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                )
              )}
              <Pagination.Next
                onClick={() =>
                  page < Math.ceil(filteredPartners.length / rowsPerPage) - 1 &&
                  handleChangePage(page + 2)
                }
                disabled={
                  page >= Math.ceil(filteredPartners.length / rowsPerPage) - 1
                }
              />
            </Pagination>
          </div>
        </Card.Body>
      </Card>

      {/* Confirmation Dialog */}
      <Modal show={openDialog} onHide={handleCloseDialog}>
        <Modal.Header closeButton>
          <Modal.Title>
            {dialogAction === "delete"
              ? "Delete Delivery Partner"
              : dialogAction === "block"
              ? "Block Delivery Partner"
              : "Unblock Delivery Partner"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dialogAction === "delete"
            ? `Are you sure you want to delete ${selectedPartner?.name}? This action cannot be undone.`
            : dialogAction === "block"
            ? `Are you sure you want to block ${selectedPartner?.name}? This will prevent them from accepting deliveries.`
            : `Are you sure you want to unblock ${selectedPartner?.name}? This will allow them to accept deliveries again.`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            variant={
              dialogAction === "delete"
                ? "danger"
                : dialogAction === "block"
                ? "warning"
                : "success"
            }
            onClick={handleConfirmAction}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Partner Details Modal */}
      <Modal
        show={viewPartnerDetails}
        onHide={handleClosePartnerDetails}
        size="lg"
        dialogClassName="modal-90w"
      >
        {selectedPartner && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Delivery Partner Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="g-3">
                <Col xs={12} md={4}>
                  <Card className="h-100">
                    <Card.Img
                      variant="top"
                      src={selectedPartner.photo}
                      alt={selectedPartner.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <h5 className="mb-3">{selectedPartner.name}</h5>
                      <div className="d-flex align-items-center mb-2">
                        <Phone size={16} className="me-2 text-secondary" />
                        <div>{selectedPartner.phone}</div>
                      </div>
                      <div className="d-flex align-items-start mb-2">
                        <MapPin
                          size={16}
                          className="me-2 mt-1 text-secondary"
                        />
                        <div>{selectedPartner.address}</div>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <Bike size={16} className="me-2 text-secondary" />
                        <div>
                          {selectedPartner.vehicleType} -{" "}
                          {selectedPartner.vehicleNumber}
                        </div>
                      </div>
                      <hr className="my-2" />
                      <div className="text-secondary small">
                        Aadhar Card: {selectedPartner.aadharCard}
                      </div>
                      <div className="text-secondary small">
                        Joined: {selectedPartner.joiningDate}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} md={8}>
                  <Card className="mb-3">
                    <Card.Body>
                      <h5 className="mb-3">Performance Metrics</h5>
                      <Row className="g-2">
                        <Col xs={6} sm={3}>
                          <div className="text-center">
                            <h5 className="text-primary mb-1">
                              {selectedPartner.totalDeliveries}
                            </h5>
                            <div className="text-secondary small">
                              Total Deliveries
                            </div>
                          </div>
                        </Col>
                        <Col xs={6} sm={3}>
                          <div className="text-center">
                            <h5 className="text-success mb-1">
                              {selectedPartner.likes}
                            </h5>
                            <div className="text-secondary small">Likes</div>
                          </div>
                        </Col>
                        <Col xs={6} sm={3}>
                          <div className="text-center">
                            <h5 className="text-danger mb-1">
                              {selectedPartner.dislikes}
                            </h5>
                            <div className="text-secondary small">Dislikes</div>
                          </div>
                        </Col>
                        <Col xs={6} sm={3}>
                          <div className="text-center">
                            <h5 className="text-warning mb-1">
                              {selectedPartner.spamReports}
                            </h5>
                            <div className="text-secondary small">
                              Spam Reports
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <div className="d-flex align-items-center justify-content-center mt-3">
                        <div className="d-flex me-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              fill={
                                i < Math.floor(selectedPartner.rating)
                                  ? "gold"
                                  : "none"
                              }
                              color={
                                i < Math.floor(selectedPartner.rating)
                                  ? "gold"
                                  : "#ccc"
                              }
                            />
                          ))}
                        </div>
                        <div>({selectedPartner.rating})</div>
                      </div>
                    </Card.Body>
                  </Card>

                  <Card>
                    <Card.Body>
                      <h5 className="mb-3">Current Status</h5>
                      <div className="d-flex align-items-center mb-3">
                        <Badge
                          bg={getStatusVariant(selectedPartner.status)}
                          className="me-2"
                        >
                          {selectedPartner.status}
                        </Badge>
                        <Badge
                          bg={getCurrentStatusVariant(
                            selectedPartner.currentStatus
                          )}
                        >
                          {selectedPartner.currentStatus}
                        </Badge>
                      </div>

                      {selectedPartner.currentStatus === "Delivering" && (
                        <>
                          <h6 className="mb-2">Active Delivery</h6>
                          {mockActiveDeliveries
                            .filter(
                              (delivery) =>
                                delivery.deliveryPartnerId ===
                                selectedPartner.id
                            )
                            .map((delivery) => (
                              <div
                                key={delivery.id}
                                className="border rounded p-3 mb-2"
                              >
                                <h6>Order ID: {delivery.orderId}</h6>
                                <Row className="g-2 mt-1">
                                  <Col xs={6}>
                                    <div className="text-secondary small">
                                      Restaurant: {delivery.restaurant}
                                    </div>
                                  </Col>
                                  <Col xs={6}>
                                    <div className="text-secondary small">
                                      Customer: {delivery.user}
                                    </div>
                                  </Col>
                                  <Col xs={12}>
                                    <div className="text-secondary small">
                                      Delivery Address: {delivery.userAddress}
                                    </div>
                                  </Col>
                                  <Col xs={4}>
                                    <div className="text-secondary small">
                                      Status:{" "}
                                      <Badge bg="primary">
                                        {delivery.status}
                                      </Badge>
                                    </div>
                                  </Col>
                                  <Col xs={4}>
                                    <div className="text-secondary small">
                                      ETA: {delivery.estimatedDeliveryTime}
                                    </div>
                                  </Col>
                                  <Col xs={4}>
                                    <div className="text-secondary small">
                                      Delivery Charge: ₹
                                      {delivery.deliveryCharge}
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            ))}
                        </>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClosePartnerDetails}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
}

// Export memoized component for better performance
export default memo(DeliveryPersonnel);
