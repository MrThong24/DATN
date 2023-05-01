/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import VirtualList from "rc-virtual-list";
import { Avatar, Carousel, List } from "antd";

const fakeDataUrl =
  "https://randomuser.me/api/?results=2&inc=name,gender,email,nat,picture&noinfo";
const ContainerHeight = 300;
const contentStyle = {
  margin: 0,
  height: "300px",
  color: "#fff",
  lineHeight: "300px",
  textAlign: "center",
  background: "#364d79",
};

const PageProjectId = () => {
  const [data, setData] = useState([]);
  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
      });
  };
  useEffect(() => {
    appendData();
  }, []);
  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      appendData();
    }
  };
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <Card border="light" className="bg-white shadow-sm mb-4 mt-5">
      <Card.Body>
        <h5 className="mb-5">
          <Link style={{ cursor: "pointer", marginRight: "6px" }} to="/project">
            Công việc
          </Link>
          / Chi tiết công việc
        </h5>
        <Row className="mb-4">
          <Col md={4} style={{ display: "flex", alignItems: "center" }}>
            <h6>
              Tên dự án :{" "}
              <span style={{ fontWeight: 500 }}>
                Dự án thi công ở Đại Học sư phạm
              </span>
            </h6>
          </Col>
          <Col md={4} style={{ display: "flex", alignItems: "center" }}>
            <h6>
              Số lượng công nhân : <span style={{ fontWeight: 500 }}>4</span>
            </h6>
          </Col>
          <Col md={4} style={{ display: "flex", alignItems: "center" }}>
            <h6>
              Quản lý dự án :{" "}
              <span style={{ fontWeight: 500 }}>Bùi Chí Thông</span>
            </h6>
          </Col>
        </Row>
        <Row>
          <Row className="mb-4">
            <Col md={4} style={{ display: "flex", alignItems: "center" }}>
              <h6>
                Địa chỉ công việc :{" "}
                <span style={{ fontWeight: 500 }}>
                  Đại học sư phạm kỹ thuật
                </span>
              </h6>
            </Col>
          </Row>
        </Row>
        <Row className="mb-4">
          <Col md={8}>
            <h6>Chi tiết công việc</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Perferendis totam rerum necessitatibus doloremque neque voluptatem
              excepturi velit inventore ea, rem, repellat minima eum quibusdam
              mollitia, corporis dolor officia error maxime!
            </p>
          </Col>
          <Col md={4}>
            <h6>Hình ảnh dự án</h6>
            <div>
              <Carousel afterChange={onChange}>
                <div>
                  <img
                    src="https://www.invert.vn/media/uploads/uploads/2022/12/03143748-12-hinh-anh-dep.jpeg"
                    style={contentStyle}
                  />
                </div>
              </Carousel>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <h6>Danh sách công nhân</h6>
            <List>
              <VirtualList
                data={data}
                height={ContainerHeight}
                itemHeight={47}
                itemKey="email"
                onScroll={onScroll}
              >
                {(item) => (
                  <List.Item key={item.email}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.picture.large} />}
                      title={<a href="https://ant.design">{item.name.last}</a>}
                      description={item.email}
                    />
                    <div>Content</div>
                  </List.Item>
                )}
              </VirtualList>
            </List>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PageProjectId;
