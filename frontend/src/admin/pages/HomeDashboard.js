import React, { useEffect, useState } from "react";
import { faCashRegister, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "@themesberg/react-bootstrap";
import { CounterWidget, TeamMembersWidget } from "../components/Widgets";
import apiUser from "../../api/apiUser";
const Home = () => {
  const [dataAPI, setDataAPI] = useState([]);
  const [dataAPIManager, setDataAPIManager] = useState([]);

  /* START event call api get all employee */
  useEffect(() => {
    async function fetchData() {
      const data = await apiUser.getAllUser();
      const activeUsers = data?.data?.filter(
        (user) => user.status === "Ngưng hoạt động"
      );
      const userManager = data?.data?.filter(
        (user) => user.position_employee === "Trưởng nhóm xây dựng"
      );
      setDataAPIManager(userManager);
      setDataAPI(activeUsers);
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
            percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Tổng số dự án"
            title="26"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Tổng số quản lý"
            title={dataAPIManager.length}
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={8} className="mb-4">
              <Row>
                <Col xs={6} lg={6} className="mb-4">
                  <TeamMembersWidget />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Home;
