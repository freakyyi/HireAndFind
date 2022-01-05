import React from "react";

const HomeHeader = () => {
  return (
    <>
      <div class="container">
        <div class="row space-100">
          <div class="col-lg-7 col-md-12 col-xs-12">
            <div class="contents">
              <h2 class="head-title">
                Find your job & make <br /> yourself something
              </h2>
              <p>Your Dream Job Is Waiting For You</p>
              <div class="job-search-form">
                <form>
                  <div class="row">
                    <div class="col-lg-5 col-md-5 col-xs-12">
                      <div class="form-group">
                        <input
                          class="form-control"
                          type="text"
                          placeholder="Job Title or Company Name"
                        />
                      </div>
                    </div>
                    <div class="col-lg-5 col-md-5 col-xs-12">
                      <div class="form-group">
                        <div class="search-category-container">
                          <label class="styled-select">
                            <select>
                              <option value="none">Locations</option>
                              <option value="none">New York</option>
                              <option value="none">California</option>
                              <option value="none">Washington</option>
                              <option value="none">Birmingham</option>
                              <option value="none">Chicago</option>
                              <option value="none">Phoenix</option>
                            </select>
                          </label>
                        </div>
                        <i class="lni-map-marker"></i>
                      </div>
                    </div>
                    <div class="col-lg-2 col-md-2 col-xs-12">
                      <button type="submit" class="button">
                        <i class="lni-search"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-lg-5 col-md-12 col-xs-12">
            <div class="intro-img">
              <img src="assets/img/intro.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeHeader;
