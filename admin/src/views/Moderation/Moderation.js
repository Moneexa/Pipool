/*!

=========================================================
* Now UI Dashboard PRO React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from "react";
import { useStoreActions, useStoreState } from 'easy-peasy'
// reactstrap components
import {
  Table,
  UncontrolledTooltip,
  ButtonGroup,
  FormGroup,
  Label,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

function Moderation() {
  const reportsList = useStoreState(state => state.reportsAdmin.reportsList);
  const listReports = useStoreActions(actions => actions.reportsAdmin.listReports);
  useEffect(() => {
    listReports()
  }, [])

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Campaigns Reported</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">#</th>
                      <th>Campaign</th>
                      <th>Author</th>
                      <th className="text-center">Date of Submission</th>
                      <th className="text-center">message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      reportsList.map((value, index) => {
                        return (
                          <tr key={index}>
                            <td className="text-center">{index}</td>
                            <td>{value.campaign.serviceName}</td>
                            <td>{value.author.channelName}</td>
                            <td className="text-center">{value.dateOfSubmission.substring(0,10)}</td>
                            <td className="text-center">{value.message}</td>
                            <td className="text-right btns-mr-5">
                              <Button
                                className="btn-icon"
                                color="info"
                                id="tooltip590841497"
                                size="sm"
                                type="button"
                              >
                                <i className="now-ui-icons users_single-02" />
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target="tooltip590841497"
                              />
                              <Button
                                className="btn-icon"
                                color="success"
                                id="tooltip26024663"
                                size="sm"
                                type="button"
                              >
                                <i className="now-ui-icons ui-2_settings-90" />
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target="tooltip26024663"
                              />
                              <Button
                                className="btn-icon"
                                color="danger"
                                id="tooltip930083782"
                                size="sm"
                                type="button"
                              >
                                <i className="now-ui-icons ui-1_simple-remove" />
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target="tooltip930083782"
                              />
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}


export default Moderation;