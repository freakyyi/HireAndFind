import React, { Component, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import CardComponent from "./Card/Card.component";

// const CardComponent = lazy(() => import("./Card/Card.component"));
const requests = require("../axios/requests");

class Scrapping extends Component {
  state = {
    selectedCountries: "",
    selectDepartment: "",
    jobs: [],
    posts: [],
    hasMore: true,
    curPage: 0,
    pagesize: 5,
    totalPage: 0,
    total: 0,
  };
  selectCountries(e) {
    if (e.target.value === 0) {
      this.setState({
        selectedCountries: "",
      });
    } else {
      this.setState({
        selectedCountries: e.target.value,
      });
    }
  }

  selectDepartment(e) {
    if (e.target.value === 0) {
      this.setState({
        selectDepartment: "",
      });
    } else {
      this.setState({
        selectDepartment: e.target.value,
      });
    }
  }

  getScrapedResults = async () => {
    document.getElementById("loading").style.display = "block";
    try {
      if (
        this.state.selectDepartment !== "" &&
        this.state.selectedCountries !== ""
      ) {
        let results = await requests.getScholarShips(
          this.state.selectedCountries,
          this.state.selectDepartment
        );

        if (
          results === null ||
          results === "" ||
          results === undefined ||
          results.length === 0
        ) {
          console.log("");
          document.getElementById("Nojob").style.display = "block";
          document.getElementById("noerror").style.display = "none";
          document.getElementById("loading").style.display = "none";
          document.getElementById("error").style.display = "none";
        } else {
          console.log("Here after getting a result");
          console.log(results);
          // this.setState({
          //   jobs: results,
          // });
          let curpage = this.state.curPage;
          let posts = results.slice(
            curpage * this.state.pagesize,
            (curpage + 1) * this.state.pagesize
          );
          this.setState({
            jobs: results,
            posts: posts,
            total: results.length,
            totalPage: Math.ceil(results.length / this.state.pagesize),
          });
          console.log("totalPage", this.state.totalPage);
          console.log("posts", this.state.posts);
          console.log("job", this.state.jobs);
          console.log("total", this.state.total);
          document.getElementById("noerror").style.display = "block";
          document.getElementById("Nojob").style.display = "none";
          document.getElementById("loading").style.display = "none";
          document.getElementById("error").style.display = "none";
        }
      } else if (
        this.state.selectDepartment === "" ||
        this.state.selectDepartment === null ||
        this.state.selectedCountries === "" ||
        this.state.selectedCountries === null
      ) {
        console.log("im in else if");
        document.getElementById("error").style.display = "block";
        document.getElementById("noerror").style.display = "none";
        document.getElementById("loading").style.display = "none";
        document.getElementById("Nojob").style.display = "none";
      }
    } catch (error) {
      console.log(error);
    }
  };

  loadmoreItem = () => {
    console.log("LOAD MORE loadmoreItem");
    let curpage2 = 0;
    if (this.state.curPage + 1 < this.state.totalPage) {
      curpage2 =
        this.state.curPage < this.state.totalPage
          ? this.state.curPage + 1
          : this.state.curPage;
      let posts = this.state.jobs.slice(
        0,
        (curpage2 + 1) * this.state.pagesize
      );
      console.log("LOAD MORE posts", posts);
      this.setState({ posts: posts, curPage: curpage2 });
    } else {
      this.setState({ hasMore: false });
    }
  };

  render() {
    return (
      <>
        <div class="page-header">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="inner-header">
                  <h3>Teachers Around The Globe</h3>
                </div>
                <div class="job-search-form bg-cyan1 job-featured-search">
                  <form>
                    <div class="row justify-content-center">
                      <div className="col-lg-5 col-md-5 col-xs-12">
                        <div class="search-category-container mr-3">
                          <label class="styled-select">
                            <select
                              onChange={(e) => {
                                this.selectCountries(e);
                              }}
                            >
                              <option value={0}>Countries</option>
                              <option value="uk">UK</option>
                              <option value="estonia">Estonia</option>
                              <option value="pakistan">Pakistan </option>
                              <option value="usa">USA</option>
                              <option value="florida">Florida</option>
                              <option value="nicosia">Nicosia </option>
                            </select>
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-5 col-xs-12">
                        <div class="search-category-container">
                          <label class="styled-select">
                            <select
                              onChange={(e) => {
                                this.selectDepartment(e);
                              }}
                            >
                              <option value={0}>Department</option>
                              <option value="bioscience">Bio science </option>
                              <option value="engineering">Engineering </option>
                              <option value="architecture">
                                Architecture{" "}
                              </option>
                              <option value="computer science">
                                Computer science{" "}
                              </option>
                              <option value="arts and science">
                                Arts and Science
                              </option>
                              <option value="electrical computer engineering">
                                Electrical Computer Engineering
                              </option>

                              <option value="mechanical engineering">
                                Mechanical Engineering
                              </option>
                              <option value="chemical engineering">
                                Chemical Engineering
                              </option>
                              <option value="agriculture sciences">
                                Agriculture Sciences
                              </option>
                              <option value="math">Math </option>
                              <option value="earthscience">
                                Earthscience{" "}
                              </option>
                              <option value="physics">Physics </option>
                              <option value="business">Business </option>
                              <option value="dentistry">Dentistry </option>
                              <option value="social science">
                                Social science
                              </option>
                              <option value="history">History</option>

                              <option value="journalism media">
                                Journalism and Media
                              </option>
                              <option value="law">Law and Politics </option>
                              <option value="medicine">Medicine</option>
                              <option value="pharmacy">Pharmacy </option>
                              <option value="psychology ">Psychology </option>
                            </select>
                          </label>
                        </div>
                      </div>
                      <div class="col-lg-1 col-md-1 col-xs-12">
                        <button
                          onClick={this.getScrapedResults}
                          type="button"
                          class="button"
                        >
                          <i class="lni-search"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section class="job-detail section pt-5">
          <p
            id="error"
            style={{
              display: "none",
              marginLeft: "220px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Please Select both Countries & Department
          </p>
          <p
            id="noerror"
            style={{
              display: "none",
              marginLeft: "220px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Loading...
          </p>
          <p
            id="Nojob"
            style={{
              display: "none",
              marginLeft: "220px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            No Jobs are Available at this time
          </p>
          {/* <div class="row">
            <div class="col-lg-2"></div>
            <div class="col-lg-8"> */}
          <div className="scrapejobs">
            <p
              id="loading"
              style={{
                display: "none",
                marginLeft: "220px",
                fontWeight: "bold",
                marginBottom: "20px",
                fontSize: "40px",
              }}
            >
              Loading...
            </p>

            {this.state.posts &&
              this.state.posts.length > 0 &&
              this.state.posts.map((data, i) => {
                return (
                  <>
                    {data && data.Name && (
                      <InfiniteScroll
                        dataLength={this.state.posts.length}
                        next={this.loadmoreItem}
                        hasMore={this.state.hasMore}
                        pullDownToRefreshThreshold={50}
                        // scrollableTarget="scrapejobs"
                      >
                        {/* <Suspense fallback={<div>loading...</div>}> */}

                        <CardComponent
                          key={i}
                          data={data}
                          type="professor"
                          i={i}
                        />

                        {/* </Suspense> */}
                      </InfiniteScroll>
                    )}
                  </>
                );
              })}
          </div>
          {/* </div>
            <div class="col-lg-2"></div>
          </div> */}
        </section>
      </>
    );
  }
}

export default Scrapping;
