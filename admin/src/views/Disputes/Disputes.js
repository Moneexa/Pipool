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
import { disputes$ } from "store/disputed";
import { createChat } from "store/chat" 

function Disputes() {
  const disputes = useObservable(disputes$);
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Disputed Campaigns</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Campaign</th>
                      <th className="text-right">Budget</th>
                      <th className="text-center">Brand</th>
                      <th>Influencer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      disputes?.map((value, index) => (
                        <tr key={index}>
                          <td>{value?.campaignId?.serviceName}</td>
                          <td className="text-right">$ {value?.price}</td>
                          <td className="text-center" onClick={() => createChat({receiverType: 'brand', brandId: value?.brandId?._id})}>{value?.brandId?.name}</td>
                          <td onClick={() => createChat({receiverType: 'channel', channelId: value?.channelId._id})}>{value?.channelId?.channelName}</td>
                        </tr>
                      ))
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

export default Disputes;
