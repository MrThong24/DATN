import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment-timezone";
import {
  Row,
  Col,
  Nav,
  Image,
  Navbar,
  Dropdown,
  Container,
  ListGroup,
} from "@themesberg/react-bootstrap";
import { logout } from "../../actions/userActions";
import { useDispatch } from "react-redux";
import apiNotification from "../../api/apiNotification";
import "../../styles/general.css";
import { useNavigate } from "react-router";
import { useMemo } from "react";

const Navbarr = () => {
  const [notifications, setNotifications] = useState();
  // const [isSeen, setIsSeen] = useState();

  const [userId, setUserId] = useState({});

  const fetchData = async (id_user) => {
    try {
      await apiNotification.getNotificationById(id_user).then((data) => {
        setNotifications(data.data);
      });
    } catch (error) {}
  };

  const isNoti = useMemo(() => {
    return notifications?.some((item) => {
      return !item?.list_user?.find(({ id_user }) => id_user === userId?._id)
        ?.status_notification;
    });
  }, [notifications, userId]);

  useEffect(() => {
    const user =
      localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo");
    setUserId(JSON.parse(user));
    fetchData(JSON.parse(user)?._id);
  }, []);

  const dispatch = useDispatch();

  // const newNotification =

  const markNotificationsAsRead = () => {
    setTimeout(() => {
      setNotifications(notifications?.map((n) => ({ ...n, read: true })));
    }, 300);
  };

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0 navbar-css">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">{""}</div>
          <Nav className="align-items-center">
            <Dropdown as={Nav.Item} onToggle={markNotificationsAsRead}>
              <Dropdown.Toggle
                as={Nav.Link}
                className="text-dark icon-notifications me-lg-3"
              >
                <span className="icon icon-sm">
                  <FontAwesomeIcon icon={faBell} className="bell-shake" />
                  {isNoti && (
                    <span className="icon-badge rounded-circle unread-notifications" />
                  )}
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-center mt-2 py-0">
                <ListGroup className="list-group-flush">
                  <Nav.Link
                    href="#"
                    className="text-center text-primary fw-bold border-bottom border-light py-3"
                  >
                    Thông báo
                  </Nav.Link>
                  <div style={{ maxHeight: "400px", overflow: "auto" }}>
                    {notifications?.map((notification) => (
                      <Notification
                        key={notification?._id}
                        notification={notification}
                        userId={userId?._id}
                      />
                    ))}
                  </div>
                </ListGroup>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <Image
                    src={`http://localhost:5000/${userId?.image}`}
                    className="user-avatar md-avatar rounded-circle"
                  />
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold">
                      {userId?.name_employee}
                    </span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu
                style={{ width: "120px" }}
                className="user-dropdown dropdown-menu-right mt-2"
                onClick={() => dispatch(logout())}
              >
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="text-danger me-2"
                  />{" "}
                  Đăng xuất
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

const Notification = ({ notification, userId }) => {
  const {
    list_user,
    id_project: { _id },
  } = notification;
  const navigate = useNavigate();

  const status_notification = list_user.filter(
    (item) => item.id_user === userId
  )[0].status_notification;
  const handleClick = async () => {
    if (status_notification) {
      window.location.replace(`/project/${_id}`);
      // window.location.reload();
      return;
    }
    window.location.replace(`/project/${_id}`);
    // window.location.reload();
    try {
      await apiNotification
        .updateNotificationById({
          id_user: userId,
          id_project: _id,
        })
        .then(() => {});
    } catch (error) {}
  };
  return (
    <ListGroup.Item
      action
      className="border-bottom border-light"
      onClick={handleClick}
    >
      <Row className="align-items-center">
        <Col className="ps-0 ms--2 w-[620px]">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4
                className="h6 py-1"
                style={{
                  fontSize: "15px",
                }}
              >
                Bạn đã được thêm vào dự án :
              </h4>
              <p>
                {!status_notification && (
                  <span
                    style={{
                      backgroundColor: "red",
                      position: "absolute",
                      top: 5,
                      right: 8,
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                    }}
                  >
                    {" "}
                  </span>
                )}
              </p>
              <span
                style={{
                  fontSize: "16px",
                  color: "black",
                  fontWeight: "600",
                }}
              >
                {notification?.id_project?.name_project}
              </span>
            </div>
            <div className="text-end">
              <small>
                {moment(notification?.createdAt).format("DD/MM/YYYY")}
              </small>
            </div>
          </div>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default Navbarr;
