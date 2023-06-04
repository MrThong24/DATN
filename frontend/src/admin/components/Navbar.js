import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from "../../actions/userActions";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Image,
  Navbar,
  Dropdown,
  Container,
} from "@themesberg/react-bootstrap";
import { useDispatch } from "react-redux";

const Navbarr = () => {
  const dispatch = useDispatch();

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div>{""}</div>
          <Nav className="align-items-center">
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8g1xgfONND3jpusoYg1XpV8o7gknHPTIMfA&usqp=CAU"
                    className="user-avatar md-avatar rounded-circle"
                  />
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold">Admin</span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu
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

export default Navbarr;
