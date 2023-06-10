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
import Chart from "chart.js/auto";

const Home = () => {
  const [dataAPI, setDataAPI] = useState([]);

  const [dataAPIProject, setDataAPIProject] = useState([]);

  const [dataAPIManager, setDataAPIManager] = useState([]);

  const [countOvertime, setCountOvertime] = useState([]);

  const [apiAllEmployee, setApiAllEmployee] = useState([]);
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
      setApiAllEmployee(data);
    }
    fetchData();
  }, []);
  /* END event call api get all employee */

  useEffect(() => {
    // Tạo biểu đồ sau khi dữ liệu đã được cập nhật
    if (apiAllEmployee?.data?.length > 0) {
      createChart();
    }
  }, [apiAllEmployee]);
  const createChart = () => {
    // Tạo một đối tượng Map để đếm số lượng nhân viên được tạo ra trong từng tháng
    const employeeCountsByMonth = new Map();

    // Lặp qua tất cả nhân viên và tính toán số lượng nhân viên theo tháng
    apiAllEmployee?.data?.forEach((employee) => {
      const createdAt = new Date(employee.createdAt);
      const month = createdAt.getMonth(); // Lấy tháng từ createdAt

      if (employeeCountsByMonth.has(month)) {
        employeeCountsByMonth.set(month, employeeCountsByMonth.get(month) + 1);
      } else {
        employeeCountsByMonth.set(month, 1);
      }
    });

    // Chuẩn bị dữ liệu cho biểu đồ
    const labels = Array.from(employeeCountsByMonth.keys()).map((month) =>
      getMonthName(month)
    );
    const counts = Array.from(employeeCountsByMonth.values());

    // Lấy tham chiếu đến element canvas
    const ctx = document.getElementById("myChart").getContext("2d");

    // Tạo biểu đồ cột
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Số lượng nhân viên",
            data: counts,
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  const getMonthName = (month) => {
    const monthNames = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];

    return monthNames[month];
  };
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
      <Row>
        <Col xs={12} sm={6} xl={6} className="mb-4">
          <canvas id="myChart"></canvas>
        </Col>
      </Row>
    </>
  );
};

export default Home;
