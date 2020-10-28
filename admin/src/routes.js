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
import Dashboard from "views/Dashboard/Dashboard.js";
import Insights from "views/Insights/Insights.js";
import Moderation from "views/Moderation/Moderation.js";
import AdRequests from "views/AdRequests/AdRequests.js";
import Disputes from "views/Disputes/Disputes.js";
import Buttons from "views/Components/Buttons.js";
import GridSystem from "views/Components/GridSystem.js";
import Panels from "views/Components/Panels.js";
import SweetAlert from "views/Components/SweetAlertPage.js";
import Notifications from "views/Components/Notifications.js";
import Icons from "views/Components/Icons.js";
import Typography from "views/Components/Typography.js";
import RegularForms from "views/Forms/RegularForms.js";
import ExtendedForms from "views/Forms/ExtendedForms.js";
import ValidationForms from "views/Forms/ValidationForms.js";
import Wizard from "views/Forms/Wizard/Wizard.js";
import RegularTables from "views/Tables/RegularTables.js";
import ExtendedTables from "views/Tables/ExtendedTables.js";
import ReactTable from "views/Tables/ReactTable.js";
import GoogleMaps from "views/Maps/GoogleMaps.js";
import FullScreenMap from "views/Maps/FullScreenMap.js";
import VectorMap from "views/Maps/VectorMap.js";
import Charts from "views/Charts/Charts.js";
import Calendar from "views/Calendar/Calendar.js";
import Widgets from "views/Widgets/Widgets.js";
import UserPage from "views/Pages/UserPage.js";
import TimelinePage from "views/Pages/TimelinePage.js";
import RTL from "views/Pages/RTL.js";
import PricingPage from "views/Pages/PricingPage.js";
import LoginPage from "views/Pages/LoginPage.js";
import RegisterPage from "views/Pages/RegisterPage.js";
import LockScreenPage from "views/Pages/LockScreenPage.js";
import { Chat } from "views/Chat/Chat";

let routes = [
  {
    path: "/dashboard",
    name: "Analytics",
    icon: "now-ui-icons design_app",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/insights",
    name: "Insights",
    icon: "now-ui-icons design_app",
    component: Insights,
    layout: "/admin",
  },
  {
    path: "/moderation",
    name: "Moderation",
    icon: "now-ui-icons design_app",
    component: Moderation,
    layout: "/admin",
  },
  {
    path: "/disputes",
    name: "Disputes",
    icon: "now-ui-icons design_app",
    component: Disputes,
    layout: "/admin",
  },
  {
    path: "/chat",
    name: "Chat",
    icon: "now-ui-icons design_app",
    component: Chat,
    layout: "/admin",
  },
  {
    collapse: true,
    path: "/ads",
    name: "Ads",
    state: "ads",
    icon: "now-ui-icons design_image",
    views: [
      {
        path: "/overview",
        name: "Overview",
        mini: "TP",
        component: AdRequests,
        layout: "/admin",
      },
      {
        path: "/requests",
        name: "Requests",
        mini: "TP",
        component: AdRequests,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/calendar",
    name: "Calendar",
    icon: "now-ui-icons media-1_album",
    component: Calendar,
    layout: "/admin",
  },
];

export default routes;
