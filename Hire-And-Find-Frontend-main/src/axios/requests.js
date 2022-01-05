import axios from "axios";
const ls = require("local-storage");

let getScrapedResults = async(query, location) => {
    try {
        let response = await axios.post("http://localhost:5000/api/sjobs", {
            query: query,
            location: location,
        });

        return response.data;
    } catch (error) {
        console.log(error);
    }
};
let getScholarShips = async(country, dept) => {
    try {
        let response = await axios.post(
            "http://localhost:5000/api/sjobs/scholarships", {
                country: country,
                dept: dept,
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

let registerUser = async(firstname, lastname, email, password, role) => {
    try {
        console.log("here i am");

        let response = await axios.post(
            "http://localhost:5000/api/accounts/auth/register", {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                role: role,
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

let loginUser = async(email, password) => {
    try {
        console.log("here in LOGIN");

        let response = await axios.post(
            "http://localhost:5000/api/accounts/auth/login", {
                email: email,
                password: password,
            }
        );
        console.log("login respinse" + response.data);
        return response;
    } catch (error) {
        console.log(error);
    }
};

let getUser = async(id) => {
    try {
        let response = await axios.get(
            `http://localhost:5000/api/users/getone/${id}`, {
                headers: {
                    "auth-token": ls.get("token"),
                },
            }
        );
        console.log("getting user from getUser API :", response);

        return response;
    } catch (error) {
        console.log(error);
    }
};

/// UPDATING USER As Role
let updateUserAsRole = async(id, body) => {
    try {
        console.log("here in updateuser as Role");
        console.log("body", body);

        let response = await axios.put(
            `http://localhost:5000/api/users/update/${id}`,
            body, {
                headers: {
                    "auth-token": ls.get("token"),
                },
            }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};

/// UPDATING USER As Main
let updateUser = async(id, body) => {
    try {
        console.log("here in updateuser as MAIN");
        console.log("body", body);
        let response = await axios.put(
            `http://localhost:5000/api/users/updateInUser/${id}`,
            body, {
                headers: {
                    "auth-token": ls.get("token"),
                },
            }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};
let postJob = async(
    company,
    title,
    category,
    selectedLocation,
    jobPrimer,
    selectedHires,
    contractType,

    lowerSalary,
    upperSalary,
    description,
    skills
) => {
    try {
        let response = await axios.post(
            "http://localhost:5000/api/rjobs/postJob", {
                company: company,
                title: title,
                category: category,
                selectedLocation: selectedLocation,
                jobPrimer: jobPrimer,
                selectedHires: selectedHires,
                contractType: contractType,
                upperSalary: upperSalary,
                lowerSalary: lowerSalary,
                description: description,
                skills: skills,
            }, {
                headers: {
                    "auth-token": ls.get("token"),
                },
            }
        );
        if (response.data._id === null || response.data._id === undefined) {
            console.log("Error occured in Post Job Form");
            console.log("Errors:  ", response);
            return;
        } else {
            console.log("response of post jobs : ", response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
};

let updateJob = async(
    company,
    title,
    category,
    selectedLocation,
    jobPrimer,
    selectedHires,
    contractType,

    lowerSalary,
    upperSalary,
    description,
    skills,
    jobId
) => {
    try {
        let response = await axios.put(
            `http://localhost:5000/api/rjobs/${jobId}`, {
                company: company,
                title: title,
                category: category,
                selectedLocation: selectedLocation,
                jobPrimer: jobPrimer,
                selectedHires: selectedHires,
                contractType: contractType,

                lowerSalary: lowerSalary,
                upperSalary: upperSalary,
                description: description,
                skills: skills,
            }, {
                headers: {
                    "auth-token": ls.get("token"),
                },
            }
        );
        if (response.data._id === null || response.data._id === undefined) {
            console.log("Error occured in Post Job Form");
            console.log("Errors:  ", response);
            return;
        } else {
            console.log("response of post jobs : ", response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
};

let getJobs = async() => {
    try {
        console.log("here i am in get job");

        let response = await axios.get("http://localhost:5000/api/rjobs");

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

let createCV = async(
    experience,
    firstName,
    lastName,
    profession,
    city,
    state,
    zipcode,
    phone,
    email,
    education,
    workHistory,
    skills,
    summary
) => {
    try {
        let response = await axios.post(
            "http://localhost:5000/api/cv/createCV", {
                experience: experience,
                firstName: firstName,
                lastName: lastName,
                profession: profession,
                city: city,
                state: state,
                zipcode: zipcode,
                phone: phone,
                email: email,
                education: education,
                workHistory: workHistory,
                skills: skills,
                summary: summary,
            }, {
                headers: {
                    "auth-token": ls.get("token"),
                },
            }
        );

        if (response.data._id === null || response.data._id === undefined) {
            console.log("Error occured in CV Form while submission");
            return;
        } else if (response.status === "403" || response.status === 403) {
            console.log("You already have a CV");
            return;
        } else {
            console.log("CV Response : ", response);
            return response.data;
        }

        // console.log("response when there is error in anywhere :" ,response.data)
    } catch (error) {
        console.log("Error occured in CV " + error);
    }
};

let getCV = async(id) => {
    try {
        let response = await axios.get(`http://localhost:5000/api/cv/getCV/${id}`, {
            headers: {
                "auth-token": ls.get("token"),
            },
        });
        // if(response.data.errors !== null) {
        //   console.log("CV is already Present")
        // }
        // else {
        //   console.log("CV Response : ", response);
        //   return response.data;
        // }
        console.log("CV Response : ", response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

let updateCv = async(
    id,
    experience,
    firstName,
    lastName,
    profession,
    city,
    state,
    zipcode,
    phone,
    email,
    education,
    workHistory,
    skills,
    summary
) => {
    try {
        let response = await axios.put(
            `http://localhost:5000/api/cv/updateCV/${id}`, {
                experience: experience,
                firstName: firstName,
                lastName: lastName,
                profession: profession,
                city: city,
                state: state,
                zipcode: zipcode,
                phone: phone,
                email: email,
                education: education,
                workHistory: workHistory,
                skills: skills,
                summary: summary,
            }, {
                headers: {
                    "auth-token": ls.get("token"),
                },
            }
        );
        // if(response.data.errors !== null) {
        //   console.log("CV is already Present")
        // }
        // else {
        //   console.log("CV Response : ", response);
        //   return response.data;
        // }
        console.log("updateCv Response : ", response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

let getJobsPostedByRecuriters = async(id) => {
    console.log("getJobsPostedByRecuriters");
    try {
        let response = await axios.get(
            `http://localhost:5000/api/rjobs/findByRecruiter/${id}`, {
                headers: {
                    "auth-token": ls.get("token"),
                },
            }
        );

        console.log("getJobsPostedByRecuriters : ", response);
        return response.data;
    } catch (error) {
        console.log("getJobsPostedByRecuriters : ", error);
    }
};

let getJobsAppliedBySeeker = async() => {
    console.log("getJobsAppliedBySeeker");
    try {
        let response = await axios.get(
            `http://localhost:5000/api/rjobs/fetchApplied`, {
                headers: {
                    "auth-token": ls.get("token"),
                },
            }
        );

        console.log("getJobsAppliedBySeeker : ", response);
        return response.data;
    } catch (error) {
        console.log("getJobsAppliedBySeeker : ", error);
    }
};

let getRecommendedJobs = async() => {
    console.log("getRecommendedJobs");
    try {
        let response = await axios.get(
            `http://localhost:5000/api/rjobs/recommendations`, {
                headers: {
                    "auth-token": ls.get("token"),
                },
            }
        );

        console.log("getRecommendedJobs : ", response);
        return response.data;
    } catch (error) {
        console.log("getRecommendedJobs : ", error);
    }
};

let getJobDetails = async(id) => {
    console.log("getJobDetails");
    try {
        let response = await axios.get(`http://localhost:5000/api/rjobs/${id}`, {
            headers: {
                "auth-token": ls.get("token"),
            },
        });

        console.log("getJobDetails : ", response);
        return response.data;
    } catch (error) {
        console.log("getJobDetails : ", error);
    }
};

let getAll = async() => {
    console.log("getAll");
    try {
        let response = await axios.get(`http://localhost:5000/api/search`);

        console.log("getAll : ", response);
        return response.data;
    } catch (error) {
        console.log("getAll : ", error);
    }
};

let deleteUser = async(id) => {
    console.log("deleteUser");
    try {
        let response = await axios.delete(`http://localhost:5000/api/users/${id}`, {
            headers: {
                "auth-token": ls.get("token"),
            },
        });

        console.log("deleteUser : ", response);
        return response.data;
    } catch (error) {
        console.log("deleteUser : ", error);
    }
};

let deleteJob = async(id) => {
    console.log("deleteJob");
    try {
        let response = await axios.delete(`http://localhost:5000/api/rjobs/${id}`, {
            headers: {
                "auth-token": ls.get("token"),
            },
        });

        console.log("deleteJob : ", response);
        return response.data;
    } catch (error) {
        console.log("deleteJob : ", error);
    }
};

let getApplicants = async(jobId) => {
    console.log("getApplicants");
    try {
        let response = await axios.get(
            `http://localhost:5000/api/rjobs/getApplications/${jobId}`, {
                headers: {
                    "auth-token": ls.get("token"),
                },
            }
        );

        console.log("getApplicants : ", response);
        return response.data;
    } catch (error) {
        console.log("getApplicants : ", error);
    }
};
let updateApplicantionStatus = async(appId, status) => {
    console.log("updateApplicantionStatus");

    try {
        let response = await axios.put(
            `http://localhost:5000/api/rjobs/UpdateStatus/${appId}`, {
                status: status,
                headers: {
                    "auth-token": ls.get("token"),
                },
            }
        );

        console.log("updateApplicantionStatus : ", response);
        return response.data;
    } catch (error) {
        console.log("updateApplicantionStatus : ", error);
    }
};

let applyToJob = async(jobId) => {
    console.log("applyToJob");

    try {
        let response = await axios.get(
            `http://localhost:5000/api/rjobs/application/${jobId}`, {
                headers: {
                    "auth-token": ls.get("token"),
                },
            }
        );

        console.log("applyToJob : ", response);
        return response.data;
    } catch (error) {
        console.log("applyToJob : ", error);
    }
};

let stripApi = async(price, plan, jobData, token) => {
    console.log("stripApi");

    try {
        let response = await axios.post(
            `http://localhost:5000/api/rjobs/stripe`, {
                price,
                plan,
                jobData,
                token,
            }, {
                headers: {
                    "auth-token": ls.get("token"),
                },
            }
        );

        console.log("stripApi : ", response);
        return response.data;
    } catch (error) {
        console.log("stripApi : ", error);
    }
};

let quiz = async(question, jobId) => {
    console.log("quiz");

    try {
        let response = await axios.post(
            `http://localhost:5000/api/rjobs/quiz`, {
                question,
                jobId,
            }, {
                headers: {
                    "auth-token": ls.get("token"),
                },
            }
        );

        console.log("quiz : ", response);
        return response.data;
    } catch (error) {
        console.log("quiz : ", error);
    }
};
let test = async(jobId) => {
    console.log("test");

    try {
        let response = await axios.get(
            `http://localhost:5000/api/rjobs/test/${jobId}`, {
                headers: {
                    "auth-token": ls.get("token"),
                },
            }
        );

        console.log("test : ", response);
        return response.data;
    } catch (error) {
        console.log("test : ", error);
    }
};

let answer = async(jobId, answer) => {
    console.log("answer");

    try {
        let response = await axios.post(
            `http://localhost:5000/api/rjobs/answer/${jobId}`, { answer }, {
                headers: {
                    "auth-token": ls.get("token"),
                },
            }
        );

        console.log("answer : ", response);
        return response.data;
    } catch (error) {
        console.log("answer : ", error);
    }
};

let getTrendingJobs = async() => {
    console.log("getTrendingJobs");

    try {
        let response = await axios.get(
            `http://localhost:5000/api/rjobs/getTrendingJobs`
        );

        console.log("getTrendingJobs : ", response);
        return response.data;
    } catch (error) {
        console.log("getTrendingJobs : ", error);
    }
};
let flagJob = async(jobId) => {
    console.log("flagJob");

    try {
        let response = await axios.get(
            `http://localhost:5000/api/rjobs/flagjob/${jobId}`, {
                headers: {
                    "auth-token": ls.get("token"),
                },
            }
        );

        console.log("flagJob : ", response);
        return response.data;
    } catch (error) {
        console.log("flagJob : ", error);
    }
};

let unFlagJob = async(jobId) => {
    console.log("unFlagJob");

    try {
        let response = await axios.get(
            `http://localhost:5000/api/rjobs/unflagjob/${jobId}`, {
                headers: {
                    "auth-token": ls.get("token"),
                },
            }
        );

        console.log("unFlagJob : ", response);
        return response.data;
    } catch (error) {
        console.log("unFlagJob : ", error);
    }
};
let addMessage = async(name, email, subject, message) => {
    console.log("addMessage");

    try {
        let response = await axios.post(
            `http://localhost:5000/api/users/addmessage`, { name: name, email: email, subject: subject, message: message }, {
                headers: {
                    "auth-token": ls.get("token"),
                },
            }
        );

        console.log("addMessage : ", response);
        return response.data;
    } catch (error) {
        console.log("addMessage : ", error);
    }
};
let getMessage = async() => {
    console.log("getMessage");

    try {
        let response = await axios.get(
            `http://localhost:5000/api/users/getmessage`, {
                headers: {
                    "auth-token": ls.get("token"),
                },
            }
        );

        console.log("getMessage : ", response);
        return response.data;
    } catch (error) {
        console.log("getMessage : ", error);
    }
};

export {
    flagJob,
    unFlagJob,
    addMessage,
    getMessage,
    getScrapedResults,
    getScholarShips,
    registerUser,
    loginUser,
    getUser,
    updateUserAsRole,
    updateUser,
    postJob,
    updateJob,
    getJobs,
    createCV,
    getCV,
    updateCv,
    getJobsPostedByRecuriters,
    getJobsAppliedBySeeker,
    getRecommendedJobs,
    getJobDetails,
    getAll,
    deleteUser,
    deleteJob,
    getApplicants,
    updateApplicantionStatus,
    applyToJob,
    stripApi,
    quiz,
    test,
    getTrendingJobs,
    answer,
};