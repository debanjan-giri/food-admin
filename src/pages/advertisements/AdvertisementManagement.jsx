import { useState, useCallback, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Tabs,
  Tab,
  Badge,
  InputGroup,
  Modal,
  Pagination,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  Search,
  PlusCircle,
  Pencil,
  Trash,
  Eye,
  Shop,
  Cup,
  TagFill,
  CurrencyDollar,
  BarChartFill,
} from "react-bootstrap-icons";
import ReactApexChart from "react-apexcharts";
import { memo } from "react";

// Memoized ApexChart component for better performance
const MemoizedChart = memo(ReactApexChart);

// Mock data for ads
const mockAds = [
  {
    id: 1,
    restaurantName: "Spice Garden",
    restaurantId: 1,
    type: "Banner",
    title: "Special Discount Weekend",
    description: "20% off on all orders above ₹500",
    startDate: "2023-09-01",
    endDate: "2023-09-30",
    status: "Running",
    payment: 1500,
    reach: 5000,
    clicks: 320,
    image: "https://via.placeholder.com/300x150?text=Banner+Ad",
  },
  {
    id: 2,
    restaurantName: "Tandoori Nights",
    restaurantId: 2,
    type: "Food",
    title: "Try Our New Paneer Tikka",
    description: "Marinated in special spices and grilled to perfection",
    startDate: "2023-09-10",
    endDate: "2023-10-10",
    status: "Running",
    payment: 750,
    reach: 3000,
    clicks: 210,
    image: "https://via.placeholder.com/300x150?text=Food+Ad",
  },
  {
    id: 3,
    restaurantName: "Curry House",
    restaurantId: 3,
    type: "Promo",
    title: "Buy 1 Get 1 Free",
    description: "On all main course items every Monday",
    startDate: "2023-08-15",
    endDate: "2023-09-15",
    status: "Expired",
    payment: 1200,
    reach: 4500,
    clicks: 280,
    image: "https://via.placeholder.com/300x150?text=Promo+Ad",
  },
  {
    id: 4,
    restaurantName: "Biryani Palace",
    restaurantId: 4,
    type: "Banner",
    title: "Authentic Hyderabadi Biryani",
    description: "Now with free delivery on orders above ₹300",
    startDate: "2023-09-05",
    endDate: "2023-10-05",
    status: "Running",
    payment: 1800,
    reach: 6000,
    clicks: 450,
    image: "https://via.placeholder.com/300x150?text=Banner+Ad",
  },
  {
    id: 5,
    restaurantName: "Dosa Corner",
    restaurantId: 5,
    type: "Food",
    title: "Special Masala Dosa",
    description: "Try our chef's special recipe with extra toppings",
    startDate: "2023-08-20",
    endDate: "2023-09-20",
    status: "Expired",
    payment: 600,
    reach: 2500,
    clicks: 180,
    image: "https://via.placeholder.com/300x150?text=Food+Ad",
  },
];

// Mock data for pricing
const mockPricing = [
  { id: 1, type: "Banner Ad", price: "₹250 per 1K reach", duration: "30 days" },
  { id: 2, type: "Food Ad", price: "₹200 per 1K reach", duration: "30 days" },
  { id: 3, type: "Promo Ad", price: "₹300 per 1K reach", duration: "15 days" },
  {
    id: 4,
    type: "Premium Banner",
    price: "₹400 per 1K reach",
    duration: "30 days",
  },
  {
    id: 5,
    type: "Featured Restaurant",
    price: "₹500 per 1K reach",
    duration: "7 days",
  },
];

// Mock data for revenue
const revenueData = [
  { month: "Jan", banner: 4000, food: 2400, promo: 1800 },
  { month: "Feb", banner: 3500, food: 2100, promo: 1600 },
  { month: "Mar", banner: 5000, food: 3000, promo: 2200 },
  { month: "Apr", banner: 4200, food: 2700, promo: 1900 },
  { month: "May", banner: 4800, food: 3200, promo: 2400 },
  { month: "Jun", banner: 5500, food: 3800, promo: 2800 },
];

// Mock data for ad distribution
const adDistributionData = [
  { name: "Banner Ads", value: 45 },
  { name: "Food Ads", value: 30 },
  { name: "Promo Ads", value: 25 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const AdvertisementManagement = memo(function AdvertisementManagement() {
  const [tabValue, setTabValue] = useState("0");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [dialogAction, setDialogAction] = useState("");

  // Memoized event handlers to prevent unnecessary re-renders
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

  const handleOpenDialog = useCallback((ad, action) => {
    setSelectedAd(ad);
    setDialogAction(action);
    setOpenDialog(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  const handleConfirmAction = useCallback(() => {
    // Handle the action (delete/block)
    console.log(`${dialogAction} ad with ID: ${selectedAd?.id}`);
    setOpenDialog(false);
  }, [dialogAction, selectedAd]);

  // Filter ads based on search term - memoized for better performance
  const filteredAds = useMemo(
    () =>
      mockAds.filter(
        (ad) =>
          ad.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ad.type.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  // Get ad type icon - memoized for better performance
  const getAdTypeIcon = useCallback((type) => {
    switch (type) {
      case "Banner":
        return <BarChartFill size={18} />;
      case "Food":
        return <Cup size={18} />;
      case "Promo":
        return <TagFill size={18} />;
      default:
        return <BarChartFill size={18} />;
    }
  }, []);

  // Get status badge variant - memoized for better performance
  const getStatusVariant = useCallback((status) => {
    switch (status) {
      case "Running":
        return "success";
      case "Expired":
        return "danger";
      case "Blocked":
        return "warning";
      default:
        return "secondary";
    }
  }, []);

  return (
    <Container fluid>
      <h4 className="mb-3">Advertisement & Monetization</h4>

      <Tabs
        activeKey={tabValue}
        onSelect={(k) => setTabValue(k)}
        className="mb-4"
        id="ad-management-tabs"
      >
        <Tab eventKey="0" title="Ad Overview" />
        <Tab eventKey="1" title="Monetization Controls" />
        <Tab eventKey="2" title="Revenue Summary" />
      </Tabs>

      {/* Ad Overview Tab */}
      {tabValue === "0" && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <InputGroup className="w-40">
              <InputGroup.Text>
                <Search />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search by restaurant, title, or type"
                value={searchTerm}
                onChange={handleSearch}
              />
            </InputGroup>
            <Button
              variant="primary"
              onClick={() => console.log("Create new ad")}
              className="d-flex align-items-center"
            >
              <PlusCircle className="me-2" /> Create New Ad
            </Button>
          </div>

          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <div className="table-responsive">
                <Table hover>
                  <thead>
                    <tr>
                      <th>Restaurant</th>
                      <th>Type</th>
                      <th>Title</th>
                      <th>Duration</th>
                      <th className="text-end">Payment (₹)</th>
                      <th className="text-end">Reach</th>
                      <th className="text-end">Clicks</th>
                      <th>Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAds
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((ad) => (
                        <tr key={ad.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <Shop size={16} className="me-2 text-secondary" />
                              {ad.restaurantName}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              {getAdTypeIcon(ad.type)}
                              <span className="ms-2">{ad.type}</span>
                            </div>
                          </td>
                          <td>{ad.title}</td>
                          <td>{`${ad.startDate} to ${ad.endDate}`}</td>
                          <td className="text-end">{ad.payment}</td>
                          <td className="text-end">{ad.reach}</td>
                          <td className="text-end">{ad.clicks}</td>
                          <td>
                            <Badge bg={getStatusVariant(ad.status)}>
                              {ad.status}
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
                                  onClick={() =>
                                    console.log(`View ad ${ad.id}`)
                                  }
                                >
                                  <Eye size={18} />
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
                                    console.log(`Edit ad ${ad.id}`)
                                  }
                                >
                                  <Pencil size={18} />
                                </Button>
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Delete</Tooltip>}
                              >
                                <Button
                                  variant="link"
                                  className="p-1 text-danger"
                                  onClick={() => handleOpenDialog(ad, "delete")}
                                >
                                  <Trash size={18} />
                                </Button>
                              </OverlayTrigger>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
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
                    onClick={() =>
                      handleChangePage(null, Math.max(0, page - 1))
                    }
                    disabled={page === 0}
                  />
                  {[
                    ...Array(
                      Math.ceil(filteredAds.length / rowsPerPage)
                    ).keys(),
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
                          Math.ceil(filteredAds.length / rowsPerPage) - 1,
                          page + 1
                        )
                      )
                    }
                    disabled={
                      page >= Math.ceil(filteredAds.length / rowsPerPage) - 1
                    }
                  />
                </Pagination>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}

      {/* Monetization Controls Tab */}
      {tabValue === "1" && (
        <div>
          <Row className="g-4">
            <Col md={6}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <h5 className="mb-3">Ad Pricing Control Panel</h5>
                  <div className="table-responsive">
                    <Table hover>
                      <thead>
                        <tr>
                          <th>Ad Type</th>
                          <th>Price</th>
                          <th>Duration</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockPricing.map((pricing) => (
                          <tr key={pricing.id}>
                            <td>{pricing.type}</td>
                            <td>{pricing.price}</td>
                            <td>{pricing.duration}</td>
                            <td className="text-center">
                              <Button
                                variant="link"
                                className="p-1 text-primary"
                              >
                                <Pencil size={16} />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <h5 className="mb-3">Create New Ad</h5>
                  <Form className="mt-3">
                    <Row className="g-3">
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label>Ad Type</Form.Label>
                          <Form.Select defaultValue="banner">
                            <option value="banner">Banner Ad</option>
                            <option value="food">Food Ad</option>
                            <option value="promo">Promo Ad</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label>Restaurant</Form.Label>
                          <Form.Select defaultValue="1">
                            <option value="1">Spice Garden</option>
                            <option value="2">Tandoori Nights</option>
                            <option value="3">Curry House</option>
                            <option value="4">Biryani Palace</option>
                            <option value="5">Dosa Corner</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label>Ad Title</Form.Label>
                          <Form.Control type="text" />
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label>Description</Form.Label>
                          <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group>
                          <Form.Label>Start Date</Form.Label>
                          <Form.Control type="date" />
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group>
                          <Form.Label>End Date</Form.Label>
                          <Form.Control type="date" />
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label>Target Reach</Form.Label>
                          <Form.Range
                            min={1000}
                            max={10000}
                            step={1000}
                            defaultValue={5000}
                          />
                          <div className="d-flex justify-content-between">
                            <small>1K</small>
                            <small>5K</small>
                            <small>10K</small>
                          </div>
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <div className="d-flex align-items-center mt-2">
                          <CurrencyDollar
                            size={20}
                            className="text-primary me-2"
                          />
                          <span>
                            Estimated Cost: <strong>₹1,250</strong>
                          </span>
                        </div>
                      </Col>
                      <Col xs={12} className="mt-3">
                        <Button variant="primary" className="w-100">
                          Create Ad
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}

      {/* Revenue Summary Tab */}
      {tabValue === "2" && (
        <div>
          <Row className="g-4">
            <Col md={8}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="mb-3">Ad Revenue Trend</h5>
                  <div style={{ height: "400px" }}>
                    <MemoizedChart
                      options={{
                        chart: {
                          type: "bar",
                          toolbar: {
                            show: false,
                          },
                          animations: {
                            enabled: true,
                            easing: "easeinout",
                            speed: 300,
                            animateGradually: {
                              enabled: false,
                            },
                            dynamicAnimation: {
                              enabled: true,
                              speed: 350,
                            },
                          },
                          fontFamily:
                            "'Poppins', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
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
                          categories: revenueData.map((item) => item.month),
                          labels: {
                            style: {
                              fontSize: "12px",
                            },
                          },
                        },
                        yaxis: {
                          title: {
                            text: "₹ (thousands)",
                          },
                          labels: {
                            style: {
                              fontSize: "12px",
                            },
                          },
                        },
                        fill: {
                          opacity: 1,
                        },
                        tooltip: {
                          y: {
                            formatter: function (val) {
                              return "₹ " + val + " thousands";
                            },
                          },
                        },
                        colors: ["#1565c0", "#64b5f6", "#4caf50"],
                        legend: {
                          position: "top",
                          fontSize: "13px",
                        },
                      }}
                      series={[
                        {
                          name: "Banner Ads",
                          data: revenueData.map((item) => item.banner),
                        },
                        {
                          name: "Food Ads",
                          data: revenueData.map((item) => item.food),
                        },
                        {
                          name: "Promo Ads",
                          data: revenueData.map((item) => item.promo),
                        },
                      ]}
                      type="bar"
                      height="100%"
                      className="chart-container"
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="mb-3">Ad Type Distribution</h5>
                  <div style={{ height: "300px" }}>
                    <MemoizedChart
                      options={{
                        chart: {
                          type: "donut",
                          animations: {
                            enabled: true,
                            easing: "easeinout",
                            speed: 300,
                            animateGradually: {
                              enabled: false,
                            },
                            dynamicAnimation: {
                              enabled: true,
                              speed: 350,
                            },
                          },
                          fontFamily:
                            "'Poppins', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
                        },
                        labels: adDistributionData.map((item) => item.name),
                        dataLabels: {
                          enabled: true,
                          style: {
                            fontSize: "12px",
                            fontFamily:
                              "'Poppins', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
                            fontWeight: 400,
                          },
                        },
                        legend: {
                          position: "bottom",
                          fontSize: "13px",
                          fontFamily:
                            "'Poppins', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
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
                        colors: COLORS,
                        stroke: {
                          width: 0,
                        },
                        tooltip: {
                          style: {
                            fontSize: "12px",
                            fontFamily:
                              "'Poppins', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
                          },
                        },
                      }}
                      series={adDistributionData.map((item) => item.value)}
                      type="donut"
                      height="100%"
                      className="chart-container"
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="mb-4">Revenue Summary</h5>
                  <Row className="g-3">
                    <Col sm={6} md={3}>
                      <Card className="border-0 shadow-sm">
                        <Card.Body>
                          <div className="text-muted mb-2">
                            Total Ad Revenue
                          </div>
                          <h4>₹1,25,000</h4>
                          <div className="text-success small">
                            +15% from last month
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col sm={6} md={3}>
                      <Card className="border-0 shadow-sm">
                        <Card.Body>
                          <div className="text-muted mb-2">
                            Subscription Revenue
                          </div>
                          <h4>₹2,50,000</h4>
                          <div className="text-success small">
                            +8% from last month
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col sm={6} md={3}>
                      <Card className="border-0 shadow-sm">
                        <Card.Body>
                          <div className="text-muted mb-2">
                            Table Booking Revenue
                          </div>
                          <h4>₹75,000</h4>
                          <div className="text-success small">
                            +12% from last month
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col sm={6} md={3}>
                      <Card className="border-0 shadow-sm">
                        <Card.Body>
                          <div className="text-muted mb-2">
                            Pre-order Commission
                          </div>
                          <h4>₹1,80,000</h4>
                          <div className="text-success small">
                            +20% from last month
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}

      {/* Confirmation Dialog */}
      <Modal show={openDialog} onHide={handleCloseDialog}>
        <Modal.Header closeButton>
          <Modal.Title>
            {dialogAction === "delete"
              ? "Delete Advertisement"
              : "Block Advertisement"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dialogAction === "delete"
            ? `Are you sure you want to delete the advertisement "${selectedAd?.title}" for ${selectedAd?.restaurantName}? This action cannot be undone.`
            : `Are you sure you want to block the advertisement "${selectedAd?.title}" for ${selectedAd?.restaurantName}?`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            variant={dialogAction === "delete" ? "danger" : "warning"}
            onClick={handleConfirmAction}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
});

export default AdvertisementManagement;
