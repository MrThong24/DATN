import React, { useEffect, useState } from "react";
import {
  faCashRegister,
  faChartLine,
  faPeopleRoof,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "@themesberg/react-bootstrap";
import { CounterWidget } from "../components/Widgets";
import apiUser from "../../api/apiUser";
import apiProduct from "../../api/apiProduct";
import apiOvertime from "../../api/apiOvertime";

const Home = () => {
  const [dataAPI, setDataAPI] = useState([]);

  const [dataAPIProject, setDataAPIProject] = useState([]);

  const [dataAPIManager, setDataAPIManager] = useState([]);

  const [countOvertime, setCountOvertime] = useState([]);

  /* START event call api get all employee */
  useEffect(() => {
    async function fetchData() {
      const data = await apiUser.getAllUser();
      const dataProject = await apiProduct.getAllProject();
      const overtime = await apiOvertime.getAllOvertime();
      const activeUsers = data?.data?.filter(
        (user) => user.status === "Đang hoạt động"
      );
      const userManager = data?.data?.filter(
        (user) => user.position_employee === "Trưởng nhóm xây dựng"
      );
      setDataAPIManager(userManager);
      setDataAPI(activeUsers);
      setDataAPIProject(dataProject);
      setCountOvertime(overtime);
    }
    fetchData();
  }, []);
  /* END event call api get all employee */

  return (
    <>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Tổng số nhân viên"
            title={dataAPI.length}
            icon={faUsers}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Tổng số dự án"
            title={dataAPIProject?.data?.length}
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Tổng số trưởng nhóm"
            title={dataAPIManager.length}
            percentage={28.4}
            icon={faPeopleRoof}
            iconColor="shape-tertiary"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Tổng số đơn tăng ca"
            title={countOvertime?.data?.overtimes?.length}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>
      </Row>
    </>
  );
};

export default Home;
