import { useState, useMemo, useCallback, memo } from "react";
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
  InputGroup,
  Modal,
  Pagination,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  Search,
  Eye,
  SlashCircle,
  CheckCircle,
  GeoAlt,
  Telephone,
  Shop,
} from "react-bootstrap-icons";
import VirtualList from "../../components/VirtualList";

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: "Rahul Sharma",
    location: "Mumbai, Maharashtra",
    phone: "+91 9876543210",
    connectedRestaurants: 5,
    ordersToday: 2,
    totalOrders: 45,
    status: "active",
  },
  {
    id: 2,
    name: "Priya Patel",
    location: "Delhi, Delhi",
    phone: "+91 9876543211",
    connectedRestaurants: 3,
    ordersToday: 1,
    totalOrders: 32,
    status: "active",
  },
  {
    id: 3,
    name: "Amit Kumar",
    location: "Bangalore, Karnataka",
    phone: "+91 9876543212",
    connectedRestaurants: 7,
    ordersToday: 0,
    totalOrders: 67,
    status: "suspended",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    location: "Hyderabad, Telangana",
    phone: "+91 9876543213",
    connectedRestaurants: 4,
    ordersToday: 3,
    totalOrders: 51,
    status: "active",
  },
  {
    id: 5,
    name: "Vikram Singh",
    location: "Chennai, Tamil Nadu",
    phone: "+91 9876543214",
    connectedRestaurants: 2,
    ordersToday: 0,
    totalOrders: 28,
    status: "banned",
  },
  {
    id: 6,
    name: "Neha Reddy",
    location: "Pune, Maharashtra",
    phone: "+91 9876543215",
    connectedRestaurants: 6,
    ordersToday: 1,
    totalOrders: 39,
    status: "active",
  },
  {
    id: 7,
    name: "Rajesh Khanna",
    location: "Kolkata, West Bengal",
    phone: "+91 9876543216",
    connectedRestaurants: 3,
    ordersToday: 0,
    totalOrders: 22,
    status: "active",
  },
];

// Memoized user row component for better performance
const UserRow = memo(({ user, onViewUser, onOpenDialog, getStatusVariant }) => {
  return (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>
        <div className="d-flex align-items-center">
          <GeoAlt size={16} className="me-2 text-secondary" />
          {user.location}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <Telephone size={16} className="me-2 text-secondary" />
          {user.phone}
        </div>
      </td>
      <td className="text-end">
        <div className="d-flex align-items-center justify-content-end">
          <Shop size={16} className="me-2 text-secondary" />
          {user.connectedRestaurants}
        </div>
      </td>
      <td className="text-end">{user.ordersToday}</td>
      <td className="text-end">{user.totalOrders}</td>
      <td>
        <Badge bg={getStatusVariant(user.status)}>
          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
        </Badge>
      </td>
      <td className="text-center">
        <div className="d-flex justify-content-center">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>View Profile</Tooltip>}
          >
            <Button
              variant="link"
              className="p-1 text-info"
              onClick={() => onViewUser(user.id)}
            >
              <Eye size={18} />
            </Button>
          </OverlayTrigger>

          {user.status === "active" && (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Suspend User</Tooltip>}
            >
              <Button
                variant="link"
                className="p-1 text-warning"
                onClick={() => onOpenDialog(user, "suspend")}
              >
                <SlashCircle size={18} />
              </Button>
            </OverlayTrigger>
          )}

          {user.status === "active" && (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Ban User</Tooltip>}
            >
              <Button
                variant="link"
                className="p-1 text-danger"
                onClick={() => onOpenDialog(user, "ban")}
              >
                <SlashCircle size={18} />
              </Button>
            </OverlayTrigger>
          )}

          {(user.status === "suspended" || user.status === "banned") && (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Activate User</Tooltip>}
            >
              <Button
                variant="link"
                className="p-1 text-success"
                onClick={() => onOpenDialog(user, "activate")}
              >
                <CheckCircle size={18} />
              </Button>
            </OverlayTrigger>
          )}
        </div>
      </td>
    </tr>
  );
});

// Get status badge variant - memoized outside component
const getStatusVariant = (status) => {
  switch (status) {
    case "active":
      return "success";
    case "suspended":
      return "warning";
    case "banned":
      return "danger";
    default:
      return "secondary";
  }
};

function UserList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogAction, setDialogAction] = useState("");
  const [useVirtualList, setUseVirtualList] = useState(false);

  // Memoized event handlers
  const handleChangePage = useCallback((_, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  }, []);

  const handleViewUser = useCallback(
    (id) => {
      navigate(`/users/${id}`);
    },
    [navigate]
  );

  const handleOpenDialog = useCallback((user, action) => {
    setSelectedUser(user);
    setDialogAction(action);
    setShowModal(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleConfirmAction = useCallback(() => {
    // Handle the action (ban/unban/suspend)
    console.log(`${dialogAction} user with ID: ${selectedUser.id}`);
    setShowModal(false);
  }, [dialogAction, selectedUser]);

  const toggleVirtualList = useCallback(() => {
    setUseVirtualList((prev) => !prev);
  }, []);

  // Filter users based on search term - memoized for better performance
  const filteredUsers = useMemo(
    () =>
      mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone.includes(searchTerm)
      ),
    [searchTerm]
  );

  return (
    <Container fluid>
      <h4 className="mb-4">User Management</h4>

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
                      <th>Location</th>
                      <th>Phone Number</th>
                      <th className="text-end">Connected Restaurants</th>
                      <th className="text-end">Orders Today</th>
                      <th className="text-end">Total Orders</th>
                      <th>Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                </Table>
              </div>
              <div style={{ height: "500px" }}>
                <VirtualList
                  items={filteredUsers}
                  itemHeight={60}
                  height={500}
                  overscan={5}
                  renderItem={(user) => (
                    <div key={user.id} className="py-2 border-bottom">
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
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="fw-medium">{user.name}</div>
                            <div className="d-flex align-items-center small text-muted">
                              <GeoAlt size={12} className="me-1" />
                              {user.location}
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <Badge
                            bg={getStatusVariant(user.status)}
                            className="me-2"
                          >
                            {user.status.charAt(0).toUpperCase() +
                              user.status.slice(1)}
                          </Badge>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleViewUser(user.id)}
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
                    <th>Location</th>
                    <th>Phone Number</th>
                    <th className="text-end">Connected Restaurants</th>
                    <th className="text-end">Orders Today</th>
                    <th className="text-end">Total Orders</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => (
                      <UserRow
                        key={user.id}
                        user={user}
                        onViewUser={handleViewUser}
                        onOpenDialog={handleOpenDialog}
                        getStatusVariant={getStatusVariant}
                      />
                    ))}
                </tbody>
              </Table>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <Form.Select
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
                className="d-inline-block w-auto"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
              </Form.Select>
            </div>
            <Pagination>
              <Pagination.Prev
                onClick={() => handleChangePage(null, Math.max(0, page - 1))}
                disabled={page === 0}
              />
              {[
                ...Array(Math.ceil(filteredUsers.length / rowsPerPage)).keys(),
              ].map((number) => (
                <Pagination.Item
                  key={number}
                  active={number === page}
                  onClick={() => handleChangePage(null, number)}
                >
                  {number + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() =>
                  handleChangePage(
                    null,
                    Math.min(
                      Math.ceil(filteredUsers.length / rowsPerPage) - 1,
                      page + 1
                    )
                  )
                }
                disabled={
                  page >= Math.ceil(filteredUsers.length / rowsPerPage) - 1
                }
              />
            </Pagination>
          </div>
        </Card.Body>
      </Card>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseDialog}>
        <Modal.Header closeButton>
          <Modal.Title>
            {dialogAction === "ban"
              ? "Ban User"
              : dialogAction === "suspend"
              ? "Suspend User"
              : "Activate User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dialogAction === "ban"
            ? `Are you sure you want to ban ${selectedUser?.name}? This will prevent them from using the app completely.`
            : dialogAction === "suspend"
            ? `Are you sure you want to suspend ${selectedUser?.name}? This will temporarily restrict their access.`
            : `Are you sure you want to activate ${selectedUser?.name}? This will restore their full access to the app.`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            variant={
              dialogAction === "ban"
                ? "danger"
                : dialogAction === "suspend"
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

// Export memoized component for better performance
export default memo(UserList);
