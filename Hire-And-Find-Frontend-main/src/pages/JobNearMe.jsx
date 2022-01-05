import React, { Component, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import CardComponent from "./Card/Card.component";

// const CardComponent = lazy(() => import("./Card/Card.component"));
const requests = require("../axios/requests");

class JobNearMe extends Component {
  state = {
    selectedLocation: "",
    keywords: "",
    jobs: [],
    posts: [],
    hasMore: true,
    curPage: 0,
    pagesize: 5,
    totalPage: 0,
    total: 0,
  };
  selectLocation(e) {
    if (e.target.value === 0) {
      this.setState({
        selectedLocation: "",
      });
    } else {
      this.setState({
        selectedLocation: e.target.value,
      });
    }
  }

  setKeywords(e) {
    this.setState({
      keywords: e.target.value,
    });
  }

  getScrapedResults = async () => {
    document.getElementById("loading").style.display = "block";
    try {
      if (this.state.keywords !== "" && this.state.selectedLocation !== "") {
        let results = await requests.getScrapedResults(
          this.state.keywords,
          this.state.selectedLocation
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
          // this.setState({
          //   jobs: results,
          // });
          let curpage = this.state.curPage;
          let posts =
            results &&
            results.slice(
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
          document.getElementById("noerror").style.display = "none";
          document.getElementById("Nojob").style.display = "none";
          document.getElementById("loading").style.display = "none";
          document.getElementById("error").style.display = "none";
        }
      } else if (
        this.state.keywords === "" ||
        this.state.keywords === null ||
        this.state.selectedLocation === "" ||
        this.state.selectedLocation === null
      ) {
        console.log("im in else if");
        document.getElementById("error").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("noerror").style.display = "none";
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
                  <h3>The latest Posted Jobs Near You</h3>
                </div>
                <div class="job-search-form bg-cyan1 job-featured-search">
                  <form>
                    <div class="row justify-content-center">
                      <div class="col-lg-5 col-md-5 col-xs-12">
                        <div class="form-group  bg-cyan">
                          <input
                            class="form-control"
                            type="text"
                            placeholder="Job title or keywords"
                            onChange={(e) => {
                              this.setKeywords(e);
                            }}
                          />
                        </div>
                      </div>

                      <div class="search-category-container">
                        <label class="styled-select">
                          <select
                            onChange={(e) => {
                              this.selectLocation(e);
                            }}
                          >
                            <option value={0}>Locations</option>
                            <option value="islamabad">Islamabad</option>
                            <option value="lahore">Lahore</option>
                            <option value="rawalpindi">Rawalpindi</option>
                            <option value="sialkot">Sialkot</option>
                            <option value="faislabad">Faislabad</option>
                            <option value="multan">Multan</option>
                            <option value="peshawar">Peshawar</option>
                            <option value="quetta">Quetta</option>
                            <option value="sargodha">Sargodha</option>
                            <option value="abbottabad">Abbottabad</option>
                            <option value="bhawalnagar">Bhawalnagar</option>
                            <option value="hariPur">HariPur</option>
                            <option value="sargodha">Sargodha</option>
                            <option value="jehlum">Jehlum</option>
                            <option value="mansehra">Mansehra</option>
                            <option value="sahiwal">Sahiwal</option>
                          </select>
                        </label>
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
            Please Enter both Keyword & location
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
                    {data && data.jobTitle && (
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
                          type="scrape"
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

export default JobNearMe;
