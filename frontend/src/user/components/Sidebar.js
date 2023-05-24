import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { logout } from "../../actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faTimes,
  faUser,
  faRegistered,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Button, Navbar } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const location = useLocation();

  const { pathname } = location;

  const [show, setShow] = useState(false);

  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const NavItem = (props) => {
    const {
      title,
      link,
      external,
      target,
      icon,
      image,
      badgeText,
      badgeBg = "secondary",
      badgeColor = "primary",
    } = props;
    const classNames = badgeText
      ? "d-flex justify-content-start align-items-center justify-content-between"
      : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? (
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
            ) : null}
            {image ? (
              <Image
                src={image}
                width={20}
                height={20}
                className="sidebar-icon svg-icon"
              />
            ) : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge
              pill
              bg={badgeBg}
              text={badgeColor}
              className="badge-md notification-count ms-2"
            >
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };
  const dispatch = useDispatch();
  return (
    <>
      <Navbar
        expand={false}
        collapseOnSelect
        variant="dark"
        className="navbar-theme-primary px-4 d-md-none justify-content-end"
      >
        <Navbar.Toggle
          as={Button}
          aria-controls="main-navbar"
          onClick={onCollapse}
        >
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar
          className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}
        >
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8g1xgfONND3jpusoYg1XpV8o7gknHPTIMfA&usqp=CAU"
                    className="card-img-top rounded-circle border-white"
                  />
                </div>
                <div className="d-block">
                  <h6>Admin</h6>
                  <Button
                    variant="secondary"
                    size="xs"
                    onClick={() => dispatch(logout())}
                    className="text-dark"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />{" "}
                    Đăng xuất
                  </Button>
                </div>
              </div>
              <Nav.Link
                className="collapse-close d-md-none"
                onClick={onCollapse}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem title="DMM Group" link="profile" />

              <NavItem title="Trang cá nhân" link="/profile" icon={faUser} />
              <NavItem
                title="Đăng ký tăng ca"
                icon={faRegistered}
                link="/overtime"
              />
              <NavItem title="Công việc" icon={faBriefcase} link="/project" />
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};

export default Sidebar;
