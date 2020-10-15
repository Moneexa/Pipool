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
import React from "react";
import { campaignList$, listCampaign } from 'store/campaigns-insights';
import { useObservable } from 'store';
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

function Insights() {
  const campaignList = useObservable(campaignList$);
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Campaign Insights</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">#</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th className="text-center">Location</th>
                      <th className="text-center">Age</th>
                      <th className="text-center">Minimum Folowers</th>
                      <th className="text-center">Posting Languages</th>

                    </tr>
                  </thead>
                  <tbody>
                    {campaignList?.map((value, index) => {
                      return (<tr key={index}>
                        <td className="text-center">{index}</td>
                        <td>{value.serviceName}</td>
                        <td>{value.category}</td>
                        <td className="text-center">{value.location}</td>
                        <td className="text-center">{value.age}</td>
                        <td className="text-center">{value.minFollowers}</td>
                        <td className="text-center">{value.postingLanguages}</td>

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
                      </tr>)

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


export default Insights;
