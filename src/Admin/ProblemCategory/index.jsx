import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import "./style.scss";
import { InputWithSearchComp } from "../../stories/InputWithSearch/InputWithSearch";
import {
  BsChevronRight,
  BsFilter,
  BsLayoutTextSidebarReverse,
} from "react-icons/bs";
import { RiAwardFill } from "react-icons/ri";
import { ImageCardComp } from "../../stories/ImageCard/ImageCard";
import { CommonDropDownComp } from "../../stories/CommonDropdown/CommonDropdownComp";
import Layout from "../../Admin/Layout";
import { Button } from "../../stories/Button";
import { BsPlusLg } from "react-icons/bs";
import { useHistory, useLocation } from "react-router-dom";
const Courses = (props) => {
  const history = useHistory();
  const SearchProps = {
    placeholder: "Search problem category",
  };

  const filterDropProps = {
    name: "Filter by",
    Icon: BsFilter,
    options: [
      { name: "Course - 1", path: "/playCourse" },
      { name: "Course - 2", path: "/playCourse" },
    ],
  };
  const ImageCardProps = {
    label: "ImageCardComp",
    imgUrl: "https://picsum.photos/318/180",
    title: "How can I improve self care with Ikigai?",
    count: "1,288 students",
    time: "5m",
    type: "Health",
  };

  const CoursesList = [
    {
      // text: "Courses to help you learn about",
      // title: "Inspiration",
      cards: [
        {
          label: "ImageCardComp",
          imgUrl: "https://picsum.photos/318/180",
          title: "Our Future",
          count: "1,288 students",
          time: "5m",
          type: "Inspiration",
        },
        {
          label: "ImageCardComp",
          imgUrl: "https://picsum.photos/318/180",
          title: "Solver in us",
          count: "1,288 students",
          time: "5m",
          type: "Inspiration",
        },
        {
          label: "ImageCardComp",
          imgUrl: "https://picsum.photos/318/180",
          title: "Innovation for better life",
          count: "1,288 students",
          time: "5m",
          type: "Inspiration",
        },
        {
          label: "ImageCardComp",
          imgUrl: "https://picsum.photos/318/180",
          title: "Sustainable Development Goals",
          count: "1,288 students",
          time: "5m",
          type: "Inspiration",
        },
      ],
    },
  ];

  return (
    <Layout>
      <Container>
        <Row className="courses-head view-head w-100 mx-0 mt-5  mb-50">
          <Col md={12} lg={5}>
            <h2 className="my-auto">Problem Categories</h2>
          </Col>
          <Col md={12} lg={7}>
            <div className="d-flex filter-drop w-100 pr-0">
              <Row className="w-100">
                <Col md={5} lg={5}>
                  <InputWithSearchComp {...SearchProps} />
                </Col>
                <Col md={3} lg={3}>
                  <CommonDropDownComp {...filterDropProps} />
                </Col>
                <Col md={4} lg={4} className="text-right my-auto">
                  <Button
                    btnClass="primary"
                    size="small"
                    Icon={BsPlusLg}
                    label="Add Problem Category"
                    onClick={() => history.push("/admin/add-problem-category")}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Container>
          <div className="courses-list pt-5 mt-5">
            {CoursesList &&
              CoursesList.map((course, i) => {
                return (
                  <div key={i} className="courses-list   pb-5">
                    <p>{course.text}</p>
                    <div className="d-flex justify-content-between mb-3 mobile-view">
                      <h2>{course.title}</h2>
                    </div>
                    <Row className=" mb-5 course-section">
                      {course.cards.map((item, index) => {
                        return (
                          <ImageCardComp
                            {...item}
                            key={index}
                            onClick={() =>
                              props.history.push("/admin/course-details")
                            }
                          />
                        );
                      })}
                    </Row>
                  </div>
                );
              })}
          </div>
          {/* </Col> */}
          {/* </Row> */}
        </Container>
      </Container>
    </Layout>
  );
};

export default withRouter(Courses);