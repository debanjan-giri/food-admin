import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  Offcanvas,
  Button,
  Badge,
  Dropdown,
  Image,
  Form,
  InputGroup,
} from "react-bootstrap";
import {
  List,
  HouseDoor,
  HouseDoorFill,
  Shop,
  ShopWindow,
  People,
  PeopleFill,
  Megaphone,
  MegaphoneFill,
  Bell,
  BellFill,
  QuestionCircle,
  QuestionCircleFill,
  Bicycle,
  PersonCircle,
  Gear,
  BoxArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  Sun,
  Moon,
  Grid,
  BarChart,
  CreditCard,
} from "react-bootstrap-icons";
import "./DashboardLayout.css";
import { FolderDot } from "lucide-react";

const DashboardLayout = memo(function () {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "New restaurant registration",
      time: "5 min ago",
      read: false,
    },
    { id: 2, text: "New order placed", time: "10 min ago", read: false },
    { id: 3, text: "Payment received", time: "30 min ago", read: false },
    { id: 4, text: "Support ticket updated", time: "1 hour ago", read: false },
  ]);

  // Width of sidebar in expanded and collapsed states
  const expandedWidth = 250;
  const collapsedWidth = 70;

  // Handle sidebar toggle - memoized to prevent unnecessary re-renders
  const handleSidebarToggle = useCallback(() => {
    setSidebarExpanded((prev) => {
      const newState = !prev;
      // Save preference to localStorage
      localStorage.setItem("sidebarExpanded", newState);
      return newState;
    });
  }, []);

  // Handle profile dropdown toggle - memoized
  const handleProfileToggle = useCallback(() => {
    setShowProfileDropdown((prev) => !prev);
  }, []);

  // Handle dark mode toggle - memoized
  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const newState = !prev;
      // Save preference to localStorage
      localStorage.setItem("darkMode", newState);
      // Apply dark mode class to body
      if (newState) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
      return newState;
    });
  }, []);

  // Handle notification read - memoized
  const markNotificationAsRead = useCallback((id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  }, []);

  // Handle mark all notifications as read - memoized
  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({ ...notification, read: true }))
    );
  }, []);

  // Load preferences from localStorage on component mount
  useEffect(() => {
    const savedSidebarState = localStorage.getItem("sidebarExpanded");
    if (savedSidebarState !== null) {
      setSidebarExpanded(savedSidebarState === "true");
    }

    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === "true");
      if (savedDarkMode === "true") {
        document.body.classList.add("dark-mode");
      }
    }
  }, []);

  // Menu items with categories and active state icons - memoized to prevent unnecessary re-renders
  const menuItems = useMemo(
    () => [
      {
        category: "Main",
        items: [
          {
            text: "Dashboard",
            icon:
              location.pathname === "/" ? (
                <HouseDoorFill size={20} />
              ) : (
                <HouseDoor size={20} />
              ),
            path: "/",
          },
        ],
      },
      {
        category: "Management",
        items: [
          {
            text: "Restaurants",
            icon: location.pathname.includes("/restaurants") ? (
              <ShopWindow size={20} />
            ) : (
              <Shop size={20} />
            ),
            path: "/restaurants",
          },
          {
            text: "Users",
            icon: location.pathname.includes("/users") ? (
              <PeopleFill size={20} />
            ) : (
              <People size={20} />
            ),
            path: "/users",
          },
          {
            text: "Orders",
            icon: location.pathname.includes("/orders") ? (
              <Grid size={20} />
            ) : (
              <Grid size={20} />
            ),
            path: "/orders",
          },
          {
            text: "Delivery Partners",
            icon: location.pathname.includes("/delivery") ? (
              <Bicycle size={20} />
            ) : (
              <Bicycle size={20} />
            ),
            path: "/delivery",
          },
        ],
      },
      {
        category: "Marketing",
        items: [
          {
            text: "Advertisements",
            icon: location.pathname.includes("/advertisements") ? (
              <MegaphoneFill size={20} />
            ) : (
              <Megaphone size={20} />
            ),
            path: "/advertisements",
          },
          {
            text: "Notifications",
            icon: location.pathname.includes("/notifications") ? (
              <BellFill size={20} />
            ) : (
              <Bell size={20} />
            ),
            path: "/notifications",
          },
        ],
      },
      {
        category: "Support",
        items: [
          {
            text: "Help & Support",
            icon: location.pathname.includes("/support") ? (
              <QuestionCircleFill size={20} />
            ) : (
              <QuestionCircle size={20} />
            ),
            path: "/support",
          },
        ],
      },
    ],
    [location.pathname]
  );

  return (
    <div className={`d-flex ${darkMode ? "dark-mode" : ""}`}>
      {/* Navbar */}
      <Navbar
        expand="lg"
        className="posto-navbar"
        fixed="top"
        style={{
          width: sidebarExpanded
            ? `calc(100% - ${expandedWidth}px)`
            : `calc(100% - ${collapsedWidth}px)`,
          marginLeft: sidebarExpanded
            ? `${expandedWidth}px`
            : `${collapsedWidth}px`,
          transition: "all var(--posto-transition)",
          zIndex: 1030,
        }}
      >
        <Container fluid className="d-flex align-items-center">
          <Button
            variant="link"
            className="posto-sidebar-toggle me-3"
            onClick={handleSidebarToggle}
            title={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarExpanded ? (
              <ChevronLeft size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </Button>

          {/* <Navbar.Brand className="posto-navbar-brand me-4">
            <span>POSTO</span>
          </Navbar.Brand> */}

          {/* Search Bar */}
          <div className="search-container d-none d-md-block me-auto">
            <InputGroup>
              <span className="search-icon">
                <Search size={16} />
              </span>
              <Form.Control
                type="text"
                placeholder="Search..."
                className="search-input"
              />
            </InputGroup>
          </div>

          <div className="d-flex align-items-center">
            {/* Dark Mode Toggle */}
            <Button
              variant="link"
              className="nav-icon me-2"
              onClick={toggleDarkMode}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>

            {/* Notifications Dropdown */}
            <Dropdown align="end" className="me-2">
              <Dropdown.Toggle
                as={Button}
                variant="link"
                className="nav-icon position-relative"
                id="notification-dropdown"
              >
                <BellFill size={18} />
                {notifications.filter((n) => !n.read).length > 0 && (
                  <span className="notification-badge">
                    {notifications.filter((n) => !n.read).length}
                  </span>
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu
                className="shadow border-0 p-0"
                style={{ width: "320px" }}
              >
                <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                  <h6 className="mb-0 fw-bold">Notifications</h6>
                  <Badge bg="primary" pill>
                    {notifications.filter((n) => !n.read).length} new
                  </Badge>
                </div>
                <div style={{ maxHeight: "350px", overflowY: "auto" }}>
                  {notifications.map((notification) => (
                    <Dropdown.Item
                      key={notification.id}
                      className={`px-3 py-2 border-bottom ${
                        !notification.read ? "fw-semibold" : ""
                      }`}
                    >
                      <div className="d-flex align-items-center">
                        <div
                          className={`rounded-circle p-2 me-3 ${
                            !notification.read
                              ? "posto-gradient-primary"
                              : "bg-light"
                          }`}
                          style={{
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <BellFill
                            size={16}
                            className={!notification.read ? "text-white" : ""}
                          />
                        </div>
                        <div>
                          <p className="mb-0">{notification.text}</p>
                          <small className="text-muted">
                            {notification.time}
                          </small>
                        </div>
                      </div>
                    </Dropdown.Item>
                  ))}
                </div>
                <Dropdown.Item className="text-center p-2 border-top">
                  <small className="fw-semibold posto-text-primary">
                    View All Notifications
                  </small>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Profile Dropdown */}
            <Dropdown
              align="end"
              show={showProfileDropdown}
              onToggle={handleProfileToggle}
            >
              <Dropdown.Toggle
                as={Button}
                variant="link"
                className="p-0 d-flex align-items-center profile-dropdown"
                id="profile-dropdown"
              >
                <Image
                  src="https://ui-avatars.com/api/?name=Admin+User&background=0D47A1&color=fff"
                  alt="Profile"
                  className="profile-image"
                />
              </Dropdown.Toggle>

              <Dropdown.Menu
                className="shadow border-0 p-0"
                style={{ width: "220px" }}
              >
                <div className="p-3 border-bottom text-center">
                  <Image
                    src="https://ui-avatars.com/api/?name=Admin+User&background=0D47A1&color=fff"
                    alt="Profile"
                    className="profile-image mb-2"
                    width={60}
                    height={60}
                  />
                  <h6 className="mb-0 fw-bold">Admin User</h6>
                  <small className="text-muted">Administrator</small>
                </div>
                <Dropdown.Item className="px-3 py-2">
                  <PersonCircle size={16} className="me-2" /> My Profile
                </Dropdown.Item>
                <Dropdown.Item className="px-3 py-2">
                  <Gear size={16} className="me-2" /> Account Settings
                </Dropdown.Item>
                <Dropdown.Divider className="my-1" />
                <Dropdown.Item className="px-3 py-2 text-danger">
                  <BoxArrowRight size={16} className="me-2" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Navbar>

      {/* Sidebar */}
      <div
        className={`posto-sidebar ${
          sidebarExpanded ? "" : "posto-sidebar-collapsed"
        }`}
        style={{
          width: sidebarExpanded ? `${expandedWidth}px` : `${collapsedWidth}px`,
        }}
      >
        <div className="posto-sidebar-header">
          {sidebarExpanded ? (
            <div className="posto-sidebar-logo">
              <span>POSTO</span>
            </div>
          ) : (
            <div className="posto-sidebar-logo">P</div>
          )}
        </div>

        <div className="posto-sidebar-body">
          {menuItems.map((category, index) => (
            <div key={index}>
              {sidebarExpanded ? (
                <div className="posto-sidebar-category">
                  {category.category}
                </div>
              ) : (
                <div className="posto-sidebar-category">•</div>
              )}
              <ul className="posto-sidebar-nav">
                {category.items.map((item, itemIndex) => {
                  const isActive =
                    item.path === "/"
                      ? location.pathname === "/"
                      : location.pathname.includes(item.path);

                  return (
                    <li className="posto-sidebar-item" key={itemIndex}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(item.path);
                        }}
                        className={`posto-sidebar-link ${
                          isActive ? "active" : ""
                        }`}
                        title={item.text}
                      >
                        <span className="posto-sidebar-icon">{item.icon}</span>
                        {sidebarExpanded && (
                          <span className="posto-sidebar-text">
                            {item.text}
                          </span>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div
        className="posto-main-content"
        style={{
          marginLeft: sidebarExpanded
            ? `${expandedWidth}px`
            : `${collapsedWidth}px`,
          width: sidebarExpanded
            ? `calc(100% - ${expandedWidth}px)`
            : `calc(100% - ${collapsedWidth}px)`,
        }}
      >
        <Outlet />
      </div>
    </div>
  );
});

export default DashboardLayout;
