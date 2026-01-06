import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
// import Compansation from "./Pages/Compansation";
import Banner from "./Pages/Homepage/Banner";
import HowItWorks from "./Pages/Homepage/HowitWorks";
import WhyChooseUs from "./Pages/Homepage/WhyChooseUs";
import FlightJourney from "./Pages/Homepage/FlightJourney";
import FlightProblems from "./Pages/Homepage/FlightProblems";
import FinalCTA from "./Pages/Homepage/FinalCTA";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import ScrollToTop from "./Components/ScrollTop";
import CheckCompensation from "./Pages/Compansation";
import Compensation2 from "./Pages/Compansation2";
import ProtectedRoute from "./Components/ProtectedRoute";
import MyClaims from "./Pages/Claims/MyClaims";
import EditClaim from "./Pages/Claims/EditClaim";
import AdminClaims from "./Pages/Admin/AdminClaims";
import Compensation3 from "./Pages/Compansation3";
import ReferFriend from "./Pages/ReferFriend";
import News from "./Pages/News";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import TermsAndConditions from "./Pages/TermsAndConditions";
import KnowYourRights from "./Pages/KnowYourRights";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />
      <div className="flex-1 -mt-20">
        <Outlet />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};


// ✅ Define the router here
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <div className="w-full bg-gradient-to-br from-orange-50 via-white to-orange-50 overflow-hidden">
            <ScrollToTop/>
            <Banner />
            <HowItWorks />
            <FlightJourney/>
            <FlightProblems/>
            {/* <WhyChooseUs/> */}
            <FinalCTA/>

          </div>
        ),
      },
      {
        path: "check-compensation",
        element: (
          <>
          <ProtectedRoute>
          <ScrollToTop/>
            {/* <CheckCompensation/> */}
            <Compensation2/>
            {/* <Compensation3/> */}
          </ProtectedRoute>
          </>
        ),
      },
      {
        path: "login",
        element: (
          <>
            <ScrollToTop/>
            <Login/>
          </>
        ),
      },
      {
        path: "signup",
        element: (
          <>
            <ScrollToTop/>
            <Signup/>
          </>
        ),
      },
      {
        path: "claim-status",
        element: (
          <>
          <ProtectedRoute>
            <ScrollToTop/>
            <MyClaims/>
          </ProtectedRoute>
          </>
        ),
      },
      {
        path: "claims/edit/:id",
        element: (
          <>
          <ProtectedRoute>
            <ScrollToTop/>
            <EditClaim/>
          </ProtectedRoute>
          </>
        ),
      },
      {
        path: "admin/dashboard",
        element: (
          <>
          <ProtectedRoute>
            <ScrollToTop/>
            <AdminClaims/>
          </ProtectedRoute>
          </>
        ),
      },
      {
        path: "refer-a-friend",
        element: (
          <>
            <ScrollToTop/>
            <ReferFriend/>
          </>
        ),
      },
      {
        path: "news",
        element: (
          <>
            <ScrollToTop/>
            <News/>
          </>
        ),
      },
      {
        path: "about-us",
        element: (
          <>
            <ScrollToTop/>
            <AboutUs/>
          </>
        ),
      },
      {
        path: "contact-us",
        element: (
          <>
            <ScrollToTop/>
            <ContactUs/>
          </>
        ),
      },
      {
        path: "terms-and-conditions",
        element: (
          <>
            <ScrollToTop/>
            <TermsAndConditions/>
          </>
        ),
      },
      {
        path: "how-it-works",
        element: (
          <>
            <ScrollToTop/>
            <HowItWorks/>
          </>
        ),
      },
      {
        path: "know-your-rights",
        element: (
          <>
            <ScrollToTop/>
            <KnowYourRights/>
          </>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
