import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import React, { useEffect, useState } from "react";

import Header from "./pages/inc/Header";
import Footer from "./pages/inc/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import JobNearMe from "./pages/JobNearMe";
import Category from "./pages/Category";
import Resume from "./pages/Resume";
import JobPostForm from "./pages/JobPostForm";
import JobPlanes from "./pages/JobPlanes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Quiz from "./pages/Quiz";
import Error from "./pages/Error";
import RegisterCompany from "./pages/RegisterCompany";
import ScrollToTop from "./pages/ScrollToTop";
import ViewProfile from "./pages/ViewProfile";
import CVPreview from "./pages/CVPreview";
import JobSeeker from "./pages/Jobseeker";
import JobRecuriter from "./pages/JobRecuriter";
import JobDetails from "./pages/Details";
import AdminDashboard from "./pages/Admin/Dashboard";
import Seekers from "./pages/Admin/Seekers";
import Recruiters from "./pages/Admin/Recruiters";
import Jobs from "./pages/Admin/Jobs";
import AdminMessage from "./pages/Admin/Messages";
import Question from "./pages/Question";
import ViewApplicants from "./pages/ViewApplicants";
import DownloadCV from "./pages/DownloadCV";
import Scrapping from "./pages/Scrapping";
import UpdateResume from "./pages/UpdateResume";
import FlagJobs from "./pages/Admin/FlagJobs";
import Test from "./pages/Test";
import ViewAnswers from "./pages/ViewAnswers";
import USERS from "./pages/Admin/Users";

const requests = require("./axios/requests");
const ls = require("local-storage");

function App() {
  const [allJobs, setAllJobs] = useState([]);
  const [seekers, setSeekers] = useState([]);
  const [users, setUsers] = useState([]);
  const [recruitres, setRecruitres] = useState([]);
  const [flagJobs, setFlagJobs] = useState([]);
  const [role, setRole] = useState(ls && ls.get("role") ? ls.get("role") : "");

  useEffect(() => {
    const getAll = async () => {
      let results = await requests.getAll();
      console.log("getAll", results);
      if (results) {
        setAllJobs(results && results.payLoad && results.payLoad.job);
        setSeekers(results && results.payLoad && results.payLoad.seeker);
        setRecruitres(results && results.payLoad && results.payLoad.recruiter);
        setFlagJobs(results && results.payLoad && results.payLoad.flagJobs);
        setUsers(results && results.payLoad && results.payLoad.user);
      }
    };
    getAll();
  }, []);
  return (
    <Router>
      <ScrollToTop>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home allJobs={allJobs} />
          </Route>
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/category" component={Category} />
          <Route path="/jobs-near-me" component={JobNearMe} />
          <Route path="/scrapping" component={Scrapping} />
          <Route path="/cv-resume" component={Resume} />
          <Route path="/updatecv" component={UpdateResume} />
          <Route path="/post-job-form" component={JobPostForm} />
          <Route path="/job-plans" component={JobPlanes} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/company_register" component={RegisterCompany} />
          <Route path="/quiz/:jobId" component={Quiz} />{" "}
          <Route path="/test/:jobId" component={Test} />{" "}
          <Route path="/viewanswer" component={ViewAnswers} />{" "}
          <Route path="/view-profile" component={ViewProfile} />
          <Route path="/cv_preview" component={CVPreview} />
          <Route path="/jobsapplied" component={JobSeeker} />
          <Route path="/viewapplicants/:jobId" component={ViewApplicants} />
          <Route path="/postedjobs" component={JobRecuriter} />
          <Route path="/question" component={Question} />
          <Route path="/edit/:id" component={JobDetails} />
          <Route path="/downloadCV/:seekerid" component={DownloadCV} />
          {role && role === "admin" ? (
            <>
              <Route exact path="/admin">
                <AdminDashboard
                  allJobs={allJobs}
                  seekers={seekers}
                  recruitres={recruitres}
                  flagJobs={flagJobs}
                  users={users}
                />
              </Route>
              <Route exact path="/admin/seekers">
                <Seekers seekers={seekers} />
              </Route>{" "}
              <Route exact path="/admin/users">
                <USERS users={users} setUsers={setUsers} />
              </Route>
              <Route exact path="/admin/recruiters">
                <Recruiters recruitres={recruitres} />
              </Route>
              <Route exact path="/admin/jobs">
                <Jobs allJobs={allJobs} />
              </Route>
              <Route exact path="/admin/flagjobs">
                <FlagJobs flagJobs={flagJobs} />
              </Route>
              <Route exact path="/admin/messages">
                <AdminMessage />
              </Route>
            </>
          ) : (
            <Route component={Error} />
          )}
          <Route component={Error} />
        </Switch>
        <Footer />
      </ScrollToTop>
    </Router>
  );
}

export default App;
