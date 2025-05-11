import { useState } from "react";
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
  Tabs,
  Tab,
  Pagination,
  Image,
} from "react-bootstrap";
import {
  Search,
  Filter,
  Eye,
  Reply,
  CheckCircle,
  X,
  Clock,
  User,
  Store,
  Truck,
  MessageSquare,
} from "lucide-react";

// Mock data for support tickets
const mockTickets = [
  {
    id: 1,
    subject: "Order not delivered",
    description:
      "I placed an order 2 hours ago but it has not been delivered yet.",
    category: "Delivery Issue",
    priority: "High",
    status: "Open",
    createdAt: "2023-09-25 14:30:00",
    updatedAt: "2023-09-25 14:30:00",
    source: "User",
    sourceId: 3,
    sourceName: "Amit Kumar",
    assignedTo: "Support Team A",
    replies: [
      {
        id: 1,
        message:
          "We are checking with the delivery partner and will update you soon.",
        sender: "Admin",
        senderName: "Support Team",
        timestamp: "2023-09-25 14:45:00",
      },
    ],
  },
  {
    id: 2,
    subject: "Refund not processed",
    description: "I cancelled my order but have not received the refund yet.",
    category: "Refund",
    priority: "Medium",
    status: "In Progress",
    createdAt: "2023-09-24 11:20:00",
    updatedAt: "2023-09-25 10:15:00",
    source: "User",
    sourceId: 2,
    sourceName: "Priya Patel",
    assignedTo: "Support Team B",
    replies: [
      {
        id: 1,
        message:
          "We have initiated the refund process. It will reflect in your account within 3-5 business days.",
        sender: "Admin",
        senderName: "Support Team",
        timestamp: "2023-09-24 12:30:00",
      },
      {
        id: 2,
        message: "Thank you for the update. I will wait for the refund.",
        sender: "User",
        senderName: "Priya Patel",
        timestamp: "2023-09-24 13:45:00",
      },
    ],
  },
  {
    id: 3,
    subject: "Menu items not showing correctly",
    description:
      "Some of our menu items are not displaying correctly in the app.",
    category: "App Problem",
    priority: "Medium",
    status: "Resolved",
    createdAt: "2023-09-23 09:10:00",
    updatedAt: "2023-09-24 16:30:00",
    source: "Restaurant",
    sourceId: 1,
    sourceName: "Spice Garden",
    assignedTo: "Support Team C",
    replies: [
      {
        id: 1,
        message:
          "We are looking into this issue and will fix it as soon as possible.",
        sender: "Admin",
        senderName: "Support Team",
        timestamp: "2023-09-23 10:20:00",
      },
      {
        id: 2,
        message: "The issue has been fixed. Please check your menu now.",
        sender: "Admin",
        senderName: "Support Team",
        timestamp: "2023-09-24 15:30:00",
      },
      {
        id: 3,
        message: "Thank you! All menu items are now displaying correctly.",
        sender: "Restaurant",
        senderName: "Spice Garden",
        timestamp: "2023-09-24 16:15:00",
      },
    ],
  },
  {
    id: 4,
    subject: "Unable to update profile",
    description:
      "I am trying to update my profile but getting an error message.",
    category: "App Problem",
    priority: "Low",
    status: "Open",
    createdAt: "2023-09-25 13:00:00",
    updatedAt: "2023-09-25 13:00:00",
    source: "User",
    sourceId: 4,
    sourceName: "Sneha Gupta",
    assignedTo: "Unassigned",
    replies: [],
  },
  {
    id: 5,
    subject: "Wrong order delivered",
    description: "I received a different order than what I placed.",
    category: "Food Issue",
    priority: "High",
    status: "In Progress",
    createdAt: "2023-09-24 19:45:00",
    updatedAt: "2023-09-25 09:30:00",
    source: "User",
    sourceId: 1,
    sourceName: "Rahul Sharma",
    assignedTo: "Support Team A",
    replies: [
      {
        id: 1,
        message:
          "We apologize for the inconvenience. We are contacting the restaurant to resolve this issue.",
        sender: "Admin",
        senderName: "Support Team",
        timestamp: "2023-09-24 20:00:00",
      },
    ],
  },
  {
    id: 6,
    subject: "Payment issue",
    description: "I am unable to add a new payment method to my account.",
    category: "Payment",
    priority: "Medium",
    status: "Open",
    createdAt: "2023-09-25 11:30:00",
    updatedAt: "2023-09-25 11:30:00",
    source: "User",
    sourceId: 6,
    sourceName: "Neha Reddy",
    assignedTo: "Unassigned",
    replies: [],
  },
  {
    id: 7,
    subject: "Delivery area issue",
    description:
      "Our restaurant delivery area is not correctly set in the app.",
    category: "App Problem",
    priority: "Medium",
    status: "In Progress",
    createdAt: "2023-09-24 14:20:00",
    updatedAt: "2023-09-25 10:45:00",
    source: "Restaurant",
    sourceId: 2,
    sourceName: "Tandoori Nights",
    assignedTo: "Support Team B",
    replies: [
      {
        id: 1,
        message:
          "We are checking the delivery area settings and will update you soon.",
        sender: "Admin",
        senderName: "Support Team",
        timestamp: "2023-09-24 15:00:00",
      },
    ],
  },
];

export default function HelpSupport() {
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleTabChange = (key) => {
    setActiveTab(parseInt(key));
  };

  const handleChangePage = (pageNumber) => {
    setPage(pageNumber - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(0);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
    setPage(0);
  };

  const handleSourceFilterChange = (event) => {
    setSourceFilter(event.target.value);
    setPage(0);
  };

  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleSendReply = () => {
    if (replyText.trim() === "") return;

    console.log(`Sending reply to ticket ${selectedTicket.id}: ${replyText}`);
    setReplyText("");
  };

  // Filter tickets based on search term and filters
  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.sourceName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || ticket.category === categoryFilter;
    const matchesSource =
      sourceFilter === "all" || ticket.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesCategory && matchesSource;
  });

  // Get source icon
  const getSourceIcon = (source) => {
    switch (source) {
      case "User":
        return <User size={16} />;
      case "Restaurant":
        return <Store size={16} />;
      case "Delivery":
        return <Truck size={16} />;
      default:
        return <User size={16} />;
    }
  };

  // Get status badge variant
  const getStatusVariant = (status) => {
    switch (status) {
      case "Open":
        return "danger";
      case "In Progress":
        return "warning";
      case "Resolved":
        return "success";
      default:
        return "secondary";
    }
  };

  // Get priority color class
  const getPriorityColorClass = (priority) => {
    switch (priority) {
      case "High":
        return "text-danger";
      case "Medium":
        return "text-warning";
      case "Low":
        return "text-info";
      default:
        return "text-secondary";
    }
  };

  return (
    <Container fluid>
      <h4 className="mb-3">Help & Support Management</h4>

      <Tabs
        activeKey={activeTab}
        onSelect={handleTabChange}
        className="mb-3"
        id="support-tabs"
      >
        <Tab eventKey={0} title="All Tickets" />
        <Tab eventKey={1} title="Open" />
        <Tab eventKey={2} title="In Progress" />
        <Tab eventKey={3} title="Resolved" />
      </Tabs>

      <Row className="g-3">
        <Col xs={12} md={selectedTicket ? 6 : 12}>
          <Card className="shadow-sm">
            <Card.Body className="p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Support Tickets</h5>
                <div className="d-flex gap-2 flex-wrap">
                  <InputGroup style={{ width: "auto" }}>
                    <InputGroup.Text>
                      <Search size={16} />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Search tickets"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </InputGroup>
                  <Form.Select
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                    style={{ width: "auto" }}
                  >
                    <option value="all">All Status</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </Form.Select>
                  <Form.Select
                    value={categoryFilter}
                    onChange={handleCategoryFilterChange}
                    style={{ width: "auto" }}
                  >
                    <option value="all">All Categories</option>
                    <option value="Food Issue">Food Issue</option>
                    <option value="Delivery Issue">Delivery Issue</option>
                    <option value="Refund">Refund</option>
                    <option value="App Problem">App Problem</option>
                    <option value="Payment">Payment</option>
                  </Form.Select>
                  <Form.Select
                    value={sourceFilter}
                    onChange={handleSourceFilterChange}
                    style={{ width: "auto" }}
                  >
                    <option value="all">All Sources</option>
                    <option value="User">User</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Delivery">Delivery Partner</option>
                  </Form.Select>
                </div>
              </div>
              <div className="table-responsive">
                <Table hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Subject</th>
                      <th>Source</th>
                      <th>Category</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTickets
                      .filter((ticket) => {
                        if (activeTab === 0) return true;
                        if (activeTab === 1) return ticket.status === "Open";
                        if (activeTab === 2)
                          return ticket.status === "In Progress";
                        if (activeTab === 3)
                          return ticket.status === "Resolved";
                        return true;
                      })
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((ticket) => (
                        <tr
                          key={ticket.id}
                          className={
                            selectedTicket && selectedTicket.id === ticket.id
                              ? "table-active"
                              : ""
                          }
                          onClick={() => handleTicketSelect(ticket)}
                          style={{ cursor: "pointer" }}
                        >
                          <td>#{ticket.id}</td>
                          <td>{ticket.subject}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              {getSourceIcon(ticket.source)}
                              <span className="ms-1">{ticket.sourceName}</span>
                            </div>
                          </td>
                          <td>{ticket.category}</td>
                          <td>
                            <span
                              className={getPriorityColorClass(ticket.priority)}
                            >
                              {ticket.priority}
                            </span>
                          </td>
                          <td>
                            <Badge bg={getStatusVariant(ticket.status)}>
                              {ticket.status}
                            </Badge>
                          </td>
                          <td>{ticket.createdAt}</td>
                          <td className="text-center">
                            <Button
                              variant="link"
                              className="p-1 text-info"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTicketSelect(ticket);
                              }}
                            >
                              <Eye size={16} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <Form.Select
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}
                  style={{ width: "auto" }}
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={25}>25 per page</option>
                </Form.Select>
                <Pagination>
                  <Pagination.Prev
                    onClick={() => page > 0 && handleChangePage(page)}
                    disabled={page === 0}
                  />
                  {[
                    ...Array(
                      Math.ceil(
                        filteredTickets.filter((ticket) => {
                          if (activeTab === 0) return true;
                          if (activeTab === 1) return ticket.status === "Open";
                          if (activeTab === 2)
                            return ticket.status === "In Progress";
                          if (activeTab === 3)
                            return ticket.status === "Resolved";
                          return true;
                        }).length / rowsPerPage
                      )
                    ),
                  ].map((_, i) => (
                    <Pagination.Item
                      key={i}
                      active={i === page}
                      onClick={() => handleChangePage(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() =>
                      page <
                        Math.ceil(
                          filteredTickets.filter((ticket) => {
                            if (activeTab === 0) return true;
                            if (activeTab === 1)
                              return ticket.status === "Open";
                            if (activeTab === 2)
                              return ticket.status === "In Progress";
                            if (activeTab === 3)
                              return ticket.status === "Resolved";
                            return true;
                          }).length / rowsPerPage
                        ) -
                          1 && handleChangePage(page + 2)
                    }
                    disabled={
                      page >=
                      Math.ceil(
                        filteredTickets.filter((ticket) => {
                          if (activeTab === 0) return true;
                          if (activeTab === 1) return ticket.status === "Open";
                          if (activeTab === 2)
                            return ticket.status === "In Progress";
                          if (activeTab === 3)
                            return ticket.status === "Resolved";
                          return true;
                        }).length / rowsPerPage
                      ) -
                        1
                    }
                  />
                </Pagination>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {selectedTicket && (
          <Col xs={12} md={6}>
            <Card className="shadow-sm">
              <Card.Body className="p-3">
                <div className="d-flex justify-content-between align-items-start">
                  <h5>
                    Ticket #{selectedTicket.id}: {selectedTicket.subject}
                  </h5>
                  <Badge bg={getStatusVariant(selectedTicket.status)}>
                    {selectedTicket.status}
                  </Badge>
                </div>
                <div className="mt-3">
                  <div className="text-secondary small">
                    From: {selectedTicket.sourceName} ({selectedTicket.source})
                  </div>
                  <div className="text-secondary small">
                    Category: {selectedTicket.category}
                  </div>
                  <div className="text-secondary small">
                    Priority: {selectedTicket.priority}
                  </div>
                  <div className="text-secondary small">
                    Created: {selectedTicket.createdAt}
                  </div>
                  <div className="text-secondary small">
                    Assigned To: {selectedTicket.assignedTo}
                  </div>
                </div>
                <hr className="my-3" />
                <div className="fw-bold">Description:</div>
                <p>{selectedTicket.description}</p>
                <hr className="my-3" />
                <div className="fw-bold">Conversation:</div>
                <div className="mt-3 mb-3">
                  {selectedTicket.replies.length > 0 ? (
                    selectedTicket.replies.map((reply) => (
                      <Card key={reply.id} className="mb-2">
                        <Card.Body className="p-3">
                          <div className="d-flex align-items-center mb-2">
                            <div
                              className={`d-flex align-items-center justify-content-center rounded-circle me-2 ${
                                reply.sender === "Admin"
                                  ? "bg-primary"
                                  : "bg-secondary"
                              }`}
                              style={{
                                width: "32px",
                                height: "32px",
                                color: "white",
                              }}
                            >
                              {reply.sender === "Admin"
                                ? "A"
                                : reply.senderName.charAt(0)}
                            </div>
                            <div>
                              <div className="fw-bold">{reply.senderName}</div>
                              <div className="text-secondary small">
                                {reply.timestamp}
                              </div>
                            </div>
                          </div>
                          <div>{reply.message}</div>
                        </Card.Body>
                      </Card>
                    ))
                  ) : (
                    <div className="text-secondary text-center">
                      No replies yet.
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  <Form.Group className="mb-3">
                    <Form.Label>Reply</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={replyText}
                      onChange={handleReplyChange}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between">
                    <div>
                      <Button
                        variant="outline-success"
                        className="d-flex align-items-center me-2"
                      >
                        <CheckCircle size={16} className="me-2" />
                        Mark as Resolved
                      </Button>
                      <Button
                        variant="outline-primary"
                        className="d-flex align-items-center"
                      >
                        <Clock size={16} className="me-2" />
                        In Progress
                      </Button>
                    </div>
                    <Button
                      variant="primary"
                      className="d-flex align-items-center"
                      onClick={handleSendReply}
                      disabled={replyText.trim() === ""}
                    >
                      <Reply size={16} className="me-2" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
}
