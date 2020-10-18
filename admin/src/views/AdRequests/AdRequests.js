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
import { useObservable } from "store";
import { adsRequests$ } from "store/ads";

function AdRequests() {
  const adRequests = useObservable(adsRequests$)
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Ads Requests</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Campaign Name</th>
                      <th>Brand</th>
                      {/* <th>Budget</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {adRequests?.map((value, index) => (
                      <tr key={index}>
                        <td>{value?.campaign?.serviceName}</td>
                        <td>{value?.brand?.name}</td>
                        {/* <td className="text-right">$ {value?.campaign}</td> */}
                      </tr>
                    ))}
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

export default AdRequests;
