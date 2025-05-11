import { useState, memo, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Badge,
  Modal,
  OverlayTrigger,
  Tooltip,
  Pagination,
  InputGroup,
} from "react-bootstrap";
import {
  Search,
  PlusCircle,
  Pencil,
  Trash,
  SlashCircle,
  CheckCircle,
  Eye,
  GeoAlt,
  Telephone,
} from "react-bootstrap-icons";
import VirtualList from "../../components/VirtualList";

// Mock data for restaurants
const mockRestaurants = [
  {
    id: 1,
    name: "Spice Garden",
    address: "123 Main St, Mumbai",
    mobile: "+91 9876543210",
    ordersToday: 45,
    totalOrders: 1245,
    connectedUsers: 320,
    todaySales: 12500,
    subscriptionStatus: "Pro",
    isBlocked: false,
  },
  {
    id: 2,
    name: "Tandoori Nights",
    address: "456 Park Ave, Delhi",
    mobile: "+91 9876543211",
    ordersToday: 32,
    totalOrders: 987,
    connectedUsers: 210,
    todaySales: 8900,
    subscriptionStatus: "Freemium",
    isBlocked: false,
  },
  {
    id: 3,
    name: "Curry House",
    address: "789 Oak St, Bangalore",
    mobile: "+91 9876543212",
    ordersToday: 28,
    totalOrders: 765,
    connectedUsers: 180,
    todaySales: 7600,
    subscriptionStatus: "Pro",
    isBlocked: true,
  },
  {
    id: 4,
    name: "Biryani Palace",
    address: "101 Pine St, Hyderabad",
    mobile: "+91 9876543213",
    ordersToday: 56,
    totalOrders: 1567,
    connectedUsers: 420,
    todaySales: 15800,
    subscriptionStatus: "Pro",
    isBlocked: false,
  },
  {
    id: 5,
    name: "Dosa Corner",
    address: "202 Maple St, Chennai",
    mobile: "+91 9876543214",
    ordersToday: 38,
    totalOrders: 1123,
    connectedUsers: 290,
    todaySales: 9200,
    subscriptionStatus: "Freemium",
    isBlocked: false,
  },
];

// Memoized restaurant row component for better performance
const RestaurantRow = memo(
  ({ restaurant, onViewRestaurant, onShowModal, onNavigateEdit }) => {
    return (
      <tr key={restaurant.id}>
        <td>{restaurant.name}</td>
        <td>{restaurant.address}</td>
        <td>{restaurant.mobile}</td>
        <td className="text-end">{restaurant.ordersToday}</td>
        <td className="text-end">{restaurant.totalOrders}</td>
        <td className="text-end">{restaurant.connectedUsers}</td>
        <td className="text-end">{restaurant.todaySales}</td>
        <td>
          <Badge
            bg={
              restaurant.subscriptionStatus === "Pro" ? "primary" : "secondary"
            }
          >
            {restaurant.subscriptionStatus}
          </Badge>
        </td>
        <td>
          <Badge bg={restaurant.isBlocked ? "danger" : "success"}>
            {restaurant.isBlocked ? "Blocked" : "Active"}
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
                onClick={() => onViewRestaurant(restaurant.id)}
              >
                <Eye size={18} />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
              <Button
                variant="link"
                className="p-1 text-primary"
                onClick={() => onNavigateEdit(restaurant.id)}
              >
                <Pencil size={18} />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>{restaurant.isBlocked ? "Unblock" : "Block"}</Tooltip>
              }
            >
              <Button
                variant="link"
                className={`p-1 ${
                  restaurant.isBlocked ? "text-success" : "text-warning"
                }`}
                onClick={() =>
                  onShowModal(
                    restaurant,
                    restaurant.isBlocked ? "unblock" : "block"
                  )
                }
              >
                {restaurant.isBlocked ? (
                  <CheckCircle size={18} />
                ) : (
                  <SlashCircle size={18} />
                )}
              </Button>
            </OverlayTrigger>

            <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
              <Button
                variant="link"
                className="p-1 text-danger"
                onClick={() => onShowModal(restaurant, "delete")}
              >
                <Trash size={18} />
              </Button>
            </OverlayTrigger>
          </div>
        </td>
      </tr>
    );
  }
);

function RestaurantList() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [dialogAction, setDialogAction] = useState("");
  const [useVirtualList, setUseVirtualList] = useState(false);

  // Memoized event handlers
  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  const handleItemsPerPageChange = useCallback((e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleViewRestaurant = useCallback(
    (id) => {
      navigate(`/restaurants/${id}`);
    },
    [navigate]
  );

  const handleNavigateEdit = useCallback(
    (id) => {
      navigate(`/restaurants/edit/${id}`);
    },
    [navigate]
  );

  const handleShowModal = useCallback((restaurant, action) => {
    setSelectedRestaurant(restaurant);
    setDialogAction(action);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleConfirmAction = useCallback(() => {
    // Handle the action (block/unblock/delete)
    console.log(
      `${dialogAction} restaurant with ID: ${selectedRestaurant?.id}`
    );
    setShowModal(false);
  }, [dialogAction, selectedRestaurant]);

  const toggleVirtualList = useCallback(() => {
    setUseVirtualList((prev) => !prev);
  }, []);

  // Filter restaurants based on search term - memoized for better performance
  const filteredRestaurants = useMemo(
    () =>
      mockRestaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          restaurant.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          restaurant.mobile.includes(searchTerm)
      ),
    [searchTerm]
  );

  // Calculate pagination - memoized for better performance
  const { indexOfFirstItem, indexOfLastItem, totalPages, currentItems } =
    useMemo(() => {
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);
      const currentItems = filteredRestaurants.slice(
        indexOfFirstItem,
        indexOfLastItem
      );

      return { indexOfFirstItem, indexOfLastItem, totalPages, currentItems };
    }, [currentPage, itemsPerPage, filteredRestaurants]);

  return (
    <Container fluid>
      <Row className="mb-4 align-items-center">
        <Col>
          <h4>Restaurant Management</h4>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            onClick={() => navigate("/restaurants/new")}
            className="d-flex align-items-center"
          >
            <PlusCircle className="me-2" /> Add Restaurant
          </Button>
        </Col>
      </Row>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Form className="flex-grow-1 me-3">
              <InputGroup>
                <InputGroup.Text>
                  <Search />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search by name, location, or phone number"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </InputGroup>
            </Form>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={toggleVirtualList}
              className="d-flex align-items-center"
            >
              {useVirtualList ? "Standard View" : "Virtual List"}
            </Button>
          </div>

          {useVirtualList ? (
            // Virtual List Implementation
            <div className="mb-3">
              <div className="table-responsive">
                <Table hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Mobile</th>
                      <th className="text-end">Today's Orders</th>
                      <th className="text-end">Total Orders</th>
                      <th className="text-end">Connected Users</th>
                      <th className="text-end">Today's Sales (₹)</th>
                      <th>Subscription</th>
                      <th>Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                </Table>
              </div>
              <div style={{ height: "500px" }}>
                <VirtualList
                  items={filteredRestaurants}
                  itemHeight={60}
                  height={500}
                  overscan={5}
                  renderItem={(restaurant) => (
                    <div key={restaurant.id} className="py-2 border-bottom">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div
                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                            style={{
                              width: 36,
                              height: 36,
                              fontSize: "0.9rem",
                            }}
                          >
                            {restaurant.name.charAt(0)}
                          </div>
                          <div>
                            <div className="fw-medium">{restaurant.name}</div>
                            <div className="d-flex align-items-center small text-muted">
                              <GeoAlt size={12} className="me-1" />
                              {restaurant.address}
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <Badge
                            bg={
                              restaurant.subscriptionStatus === "Pro"
                                ? "primary"
                                : "secondary"
                            }
                            className="me-2"
                          >
                            {restaurant.subscriptionStatus}
                          </Badge>
                          <Badge
                            bg={restaurant.isBlocked ? "danger" : "success"}
                            className="me-2"
                          >
                            {restaurant.isBlocked ? "Blocked" : "Active"}
                          </Badge>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleViewRestaurant(restaurant.id)}
                          >
                            View
                          </Button>
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
                    <th>Address</th>
                    <th>Mobile</th>
                    <th className="text-end">Today's Orders</th>
                    <th className="text-end">Total Orders</th>
                    <th className="text-end">Connected Users</th>
                    <th className="text-end">Today's Sales (₹)</th>
                    <th>Subscription</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((restaurant) => (
                    <RestaurantRow
                      key={restaurant.id}
                      restaurant={restaurant}
                      onViewRestaurant={handleViewRestaurant}
                      onShowModal={handleShowModal}
                      onNavigateEdit={handleNavigateEdit}
                    />
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          <Row className="mt-3 align-items-center">
            <Col xs={12} md={6} className="mb-2 mb-md-0">
              <Form.Select
                style={{ width: "auto" }}
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
              </Form.Select>
            </Col>
            <Col xs={12} md={6}>
              <Pagination className="justify-content-md-end">
                <Pagination.First
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                />
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />

                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
                <Pagination.Last
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {dialogAction === "delete"
              ? "Delete Restaurant"
              : dialogAction === "block"
              ? "Block Restaurant"
              : "Unblock Restaurant"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dialogAction === "delete"
            ? `Are you sure you want to delete ${selectedRestaurant?.name}? This action cannot be undone.`
            : dialogAction === "block"
            ? `Are you sure you want to block ${selectedRestaurant?.name}? This will prevent them from accepting orders.`
            : `Are you sure you want to unblock ${selectedRestaurant?.name}? This will allow them to accept orders again.`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
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
    </Container>
  );
}

export default memo(RestaurantList);
