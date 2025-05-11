import { useState, useCallback, useMemo, memo } from "react";
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
} from "react-bootstrap";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Send,
  Clock,
  Bell,
  BellRing,
  Users,
  PartyPopper,
  Cloud,
  Smile,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Mock data for notifications
const mockNotifications = [
  {
    id: 1,
    title: "Weekend Special Offer",
    message: "Get 20% off on all orders this weekend!",
    type: "Promotion",
    target: "All Users",
    sentTo: 5000,
    openRate: "32%",
    clickRate: "18%",
    sentDate: "2023-09-22 10:00:00",
    status: "Sent",
  },
  {
    id: 2,
    title: "New Restaurant Added",
    message: "Check out our newest partner - Spice Garden!",
    type: "Announcement",
    target: "Mumbai Users",
    sentTo: 1200,
    openRate: "45%",
    clickRate: "28%",
    sentDate: "2023-09-20 14:30:00",
    status: "Sent",
  },
  {
    id: 3,
    title: "Diwali Special Menu",
    message: "Celebrate Diwali with our special festive menu!",
    type: "Festival",
    target: "All Users",
    sentTo: 0,
    openRate: "0%",
    clickRate: "0%",
    sentDate: "2023-10-15 09:00:00",
    status: "Scheduled",
  },
  {
    id: 4,
    title: "Reactivate Your Account",
    message: "We miss you! Come back and enjoy special offers just for you.",
    type: "Inactivity",
    target: "Inactive Users",
    sentTo: 850,
    openRate: "22%",
    clickRate: "10%",
    sentDate: "2023-09-18 11:15:00",
    status: "Sent",
  },
  {
    id: 5,
    title: "Rainy Day Offer",
    message:
      "It's raining outside! Perfect time to order hot food with free delivery.",
    type: "Weather",
    target: "Delhi Users",
    sentTo: 0,
    openRate: "0%",
    clickRate: "0%",
    sentDate: "Auto Trigger",
    status: "Auto",
  },
];

// Mock data for auto triggers
const mockAutoTriggers = [
  {
    id: 1,
    name: "Inactivity Reminder",
    description: "Send notification to users who haven't ordered in 15 days",
    type: "Inactivity",
    message: "We miss you! Come back and enjoy special offers just for you.",
    status: "Active",
    lastTriggered: "2023-09-18",
    usersCovered: 850,
  },
  {
    id: 2,
    name: "Weather-based Suggestion",
    description: "Send notification when it's raining in user's location",
    type: "Weather",
    message:
      "It's raining outside! Perfect time to order hot food with free delivery.",
    status: "Active",
    lastTriggered: "2023-09-15",
    usersCovered: 1200,
  },
  {
    id: 3,
    name: "Birthday Wish",
    description: "Send birthday wishes and special offer to users",
    type: "Emotional",
    message:
      "Happy Birthday! Enjoy a special discount of 25% on your order today.",
    status: "Inactive",
    lastTriggered: "2023-09-10",
    usersCovered: 120,
  },
  {
    id: 4,
    name: "Festival Reminder",
    description: "Send notification about special festival menu",
    type: "Calendar",
    message: "Celebrate [Festival] with our special festive menu!",
    status: "Active",
    lastTriggered: "2023-08-30",
    usersCovered: 5000,
  },
];

// Get notification type icon - memoized outside component
const getNotificationTypeIcon = (type) => {
  switch (type) {
    case "Promotion":
      return <BellRing size={16} />;
    case "Announcement":
      return <Bell size={16} />;
    case "Festival":
      return <PartyPopper size={16} />;
    case "Inactivity":
      return <Users size={16} />;
    case "Weather":
      return <Cloud size={16} />;
    case "Emotional":
      return <Smile size={16} />;
    case "Calendar":
      return <Clock size={16} />;
    default:
      return <Bell size={16} />;
  }
};

// Get status badge variant - memoized outside component
const getStatusVariant = (status) => {
  switch (status) {
    case "Sent":
      return "success";
    case "Scheduled":
      return "primary";
    case "Auto":
      return "info";
    case "Failed":
      return "danger";
    default:
      return "secondary";
  }
};

// Memoized notification row component
const NotificationRow = memo(
  ({ notification, getNotificationTypeIcon, getStatusVariant }) => {
    return (
      <tr key={notification.id}>
        <td>{notification.title}</td>
        <td>
          <div className="d-flex align-items-center">
            {getNotificationTypeIcon(notification.type)}
            <span className="ms-1">{notification.type}</span>
          </div>
        </td>
        <td>{notification.target}</td>
        <td>
          <Badge bg={getStatusVariant(notification.status)}>
            {notification.status}
          </Badge>
        </td>
        <td>{notification.sentDate}</td>
      </tr>
    );
  }
);

// Memoized scheduled notification row component
const ScheduledNotificationRow = memo(
  ({ notification, getNotificationTypeIcon }) => {
    return (
      <tr key={notification.id}>
        <td>{notification.title}</td>
        <td>
          <div className="d-flex align-items-center">
            {getNotificationTypeIcon(notification.type)}
            <span className="ms-1">{notification.type}</span>
          </div>
        </td>
        <td>{notification.target}</td>
        <td>{notification.sentDate}</td>
        <td className="text-center">
          <div className="d-flex justify-content-center">
            <Button variant="link" className="p-1 text-primary">
              <Edit size={16} />
            </Button>
            <Button variant="link" className="p-1 text-danger">
              <Trash2 size={16} />
            </Button>
          </div>
        </td>
      </tr>
    );
  }
);

// Memoized auto trigger row component
const AutoTriggerRow = memo(({ trigger, getNotificationTypeIcon }) => {
  return (
    <tr key={trigger.id}>
      <td>{trigger.name}</td>
      <td>{trigger.description}</td>
      <td>
        <div className="d-flex align-items-center">
          {getNotificationTypeIcon(trigger.type)}
          <span className="ms-1">{trigger.type}</span>
        </div>
      </td>
      <td>
        <Badge bg={trigger.status === "Active" ? "success" : "secondary"}>
          {trigger.status}
        </Badge>
      </td>
      <td>{trigger.lastTriggered}</td>
      <td>{trigger.usersCovered}</td>
      <td className="text-center">
        <div className="d-flex justify-content-center">
          <Button variant="link" className="p-1 text-primary">
            <Edit size={16} />
          </Button>
          <Button variant="link" className="p-1 text-danger">
            <Trash2 size={16} />
          </Button>
        </div>
      </td>
    </tr>
  );
});

function NotificationManagement() {
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notificationType, setNotificationType] = useState("Promotion");
  const [targetAudience, setTargetAudience] = useState("all");

  // Memoized event handlers
  const handleTabChange = useCallback((key) => {
    setActiveTab(parseInt(key));
  }, []);

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

  const handleDateChange = useCallback((newDate) => {
    setSelectedDate(newDate);
  }, []);

  const handleNotificationTypeChange = useCallback((event) => {
    setNotificationType(event.target.value);
  }, []);

  const handleTargetAudienceChange = useCallback((event) => {
    setTargetAudience(event.target.value);
  }, []);

  // Filter notifications based on search term - memoized for better performance
  const filteredNotifications = useMemo(
    () =>
      mockNotifications.filter(
        (notification) =>
          notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          notification.message
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          notification.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          notification.target.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  return (
    <Container fluid>
      <h4 className="mb-3">Notification Management</h4>

      <Tabs
        activeKey={activeTab}
        onSelect={handleTabChange}
        className="mb-3"
        id="notification-tabs"
      >
        <Tab eventKey={0} title="Push Notifications" />
        <Tab eventKey={1} title="Scheduled Notifications" />
        <Tab eventKey={2} title="Auto Triggers" />
      </Tabs>

      {/* Push Notifications Tab */}
      {activeTab === 0 && (
        <Row className="g-3">
          <Col xs={12} md={6}>
            <Card className="shadow-sm">
              <Card.Body className="p-3">
                <h5 className="mb-3">Send New Notification</h5>
                <Form className="mt-2">
                  <Row className="g-2">
                    <Col xs={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Notification Title</Form.Label>
                        <Form.Control type="text" />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Notification Type</Form.Label>
                        <Form.Select
                          value={notificationType}
                          onChange={handleNotificationTypeChange}
                        >
                          <option value="Promotion">Promotion</option>
                          <option value="Announcement">Announcement</option>
                          <option value="Festival">Festival</option>
                          <option value="Inactivity">
                            Inactivity Reminder
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Target Audience</Form.Label>
                        <div>
                          <Form.Check
                            type="radio"
                            id="audience-all"
                            label="All Users"
                            name="targetAudience"
                            value="all"
                            checked={targetAudience === "all"}
                            onChange={handleTargetAudienceChange}
                            className="mb-2"
                          />
                          <Form.Check
                            type="radio"
                            id="audience-location"
                            label="By Location"
                            name="targetAudience"
                            value="location"
                            checked={targetAudience === "location"}
                            onChange={handleTargetAudienceChange}
                            className="mb-2"
                          />
                          <Form.Check
                            type="radio"
                            id="audience-restaurant"
                            label="By Connected Restaurant"
                            name="targetAudience"
                            value="restaurant"
                            checked={targetAudience === "restaurant"}
                            onChange={handleTargetAudienceChange}
                            className="mb-2"
                          />
                          <Form.Check
                            type="radio"
                            id="audience-inactive"
                            label="Inactive Users"
                            name="targetAudience"
                            value="inactive"
                            checked={targetAudience === "inactive"}
                            onChange={handleTargetAudienceChange}
                          />
                        </div>
                      </Form.Group>
                    </Col>
                    {targetAudience === "location" && (
                      <Col xs={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Select Location</Form.Label>
                          <Form.Select>
                            <option value="mumbai">Mumbai</option>
                            <option value="delhi">Delhi</option>
                            <option value="bangalore">Bangalore</option>
                            <option value="hyderabad">Hyderabad</option>
                            <option value="chennai">Chennai</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    )}
                    {targetAudience === "restaurant" && (
                      <Col xs={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Select Restaurant</Form.Label>
                          <Form.Select>
                            <option value="1">Spice Garden</option>
                            <option value="2">Tandoori Nights</option>
                            <option value="3">Curry House</option>
                            <option value="4">Biryani Palace</option>
                            <option value="5">Dosa Corner</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    )}
                    <Col xs={12}>
                      <Form.Check
                        type="switch"
                        id="schedule-switch"
                        label="Schedule for later"
                        className="mb-3"
                      />
                    </Col>
                    <Col xs={12}>
                      <div className="d-flex justify-content-between">
                        <Button
                          variant="primary"
                          className="d-flex align-items-center"
                        >
                          <Send size={16} className="me-2" />
                          Send Now
                        </Button>
                        <Button
                          variant="outline-primary"
                          className="d-flex align-items-center"
                        >
                          <Clock size={16} className="me-2" />
                          Schedule
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6}>
            <Card className="shadow-sm">
              <Card.Body className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Recent Notifications</h5>
                  <InputGroup style={{ width: "auto" }}>
                    <InputGroup.Text>
                      <Search size={16} />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Search notifications"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </InputGroup>
                </div>
                <div className="table-responsive">
                  <Table hover size="sm">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Target</th>
                        <th>Status</th>
                        <th>Sent Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredNotifications
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((notification) => (
                          <NotificationRow
                            key={notification.id}
                            notification={notification}
                            getNotificationTypeIcon={getNotificationTypeIcon}
                            getStatusVariant={getStatusVariant}
                          />
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
                        Math.ceil(filteredNotifications.length / rowsPerPage)
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
                            filteredNotifications.length / rowsPerPage
                          ) -
                            1 && handleChangePage(page + 2)
                      }
                      disabled={
                        page >=
                        Math.ceil(filteredNotifications.length / rowsPerPage) -
                          1
                      }
                    />
                  </Pagination>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Scheduled Notifications Tab */}
      {activeTab === 1 && (
        <Row className="g-3">
          <Col xs={12} md={6}>
            <Card className="shadow-sm">
              <Card.Body className="p-3">
                <h5 className="mb-3">Schedule New Notification</h5>
                <Form className="mt-2">
                  <Row className="g-2">
                    <Col xs={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Notification Title</Form.Label>
                        <Form.Control type="text" />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Notification Type</Form.Label>
                        <Form.Select
                          value={notificationType}
                          onChange={handleNotificationTypeChange}
                        >
                          <option value="Promotion">Promotion</option>
                          <option value="Announcement">Announcement</option>
                          <option value="Festival">Festival</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Target Audience</Form.Label>
                        <Form.Select>
                          <option value="all">All Users</option>
                          <option value="mumbai">Mumbai Users</option>
                          <option value="delhi">Delhi Users</option>
                          <option value="premium">Premium Users</option>
                          <option value="inactive">Inactive Users</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Schedule Date & Time</Form.Label>
                        <DatePicker
                          selected={selectedDate}
                          onChange={handleDateChange}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          dateFormat="MMMM d, yyyy h:mm aa"
                          className="form-control"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Button
                        variant="primary"
                        className="w-100 d-flex align-items-center justify-content-center"
                      >
                        <Clock size={16} className="me-2" />
                        Schedule Notification
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6}>
            <Card className="shadow-sm">
              <Card.Body className="p-3">
                <h5 className="mb-3">Scheduled Notifications</h5>
                <div className="table-responsive">
                  <Table hover>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Target</th>
                        <th>Scheduled For</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockNotifications
                        .filter(
                          (notification) => notification.status === "Scheduled"
                        )
                        .map((notification) => (
                          <ScheduledNotificationRow
                            key={notification.id}
                            notification={notification}
                            getNotificationTypeIcon={getNotificationTypeIcon}
                          />
                        ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Auto Triggers Tab */}
      {activeTab === 2 && (
        <Row className="g-3">
          <Col xs={12}>
            <Card className="shadow-sm">
              <Card.Body className="p-3">
                <h5 className="mb-3">Auto Trigger Notifications</h5>
                <div className="table-responsive">
                  <Table hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Last Triggered</th>
                        <th>Users Covered</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockAutoTriggers.map((trigger) => (
                        <AutoTriggerRow
                          key={trigger.id}
                          trigger={trigger}
                          getNotificationTypeIcon={getNotificationTypeIcon}
                        />
                      ))}
                    </tbody>
                  </Table>
                </div>
                <div className="mt-3 d-flex justify-content-end">
                  <Button
                    variant="primary"
                    className="d-flex align-items-center"
                  >
                    <Plus size={16} className="me-2" />
                    Create New Trigger
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12}>
            <Card className="shadow-sm">
              <Card.Body className="p-3">
                <h5 className="mb-3">Create New Auto Trigger</h5>
                <Form className="mt-2">
                  <Row className="g-3">
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Trigger Name</Form.Label>
                        <Form.Control type="text" />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Trigger Type</Form.Label>
                        <Form.Select defaultValue="Inactivity">
                          <option value="Inactivity">
                            Inactivity Reminder
                          </option>
                          <option value="Weather">Weather-based</option>
                          <option value="Emotional">Emotional/Personal</option>
                          <option value="Calendar">Calendar Events</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Notification Message</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Trigger Condition</Form.Label>
                        <Form.Select defaultValue="inactivity">
                          <option value="inactivity">
                            User inactive for X days
                          </option>
                          <option value="weather">
                            Weather condition in user's location
                          </option>
                          <option value="birthday">User's birthday</option>
                          <option value="festival">Festival/Holiday</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Button variant="primary" className="w-100">
                        Create Auto Trigger
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

// Export memoized component for better performance
export default memo(NotificationManagement);
