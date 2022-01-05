import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import CardComponent from "../Card/Card.component";
const requests = require("../../axios/requests");

const AdminMessage = () => {
  const allMessage = [1, 2, 3, 4, 5];
  const [allMessages, setAllMessages] = useState([]);
  useEffect(() => {
    const getMessages = async () => {
      let results = await requests.getMessage();
      setAllMessages(results);
    };
    getMessages();
  }, []);
  return (
    <>
      <div className="page-header">
        <h2 className="text-center"> All Messages</h2>
      </div>
      <div className="jobappliedcontainer">
        <div className="myjobs mt-3 mb-3">
          {allMessages &&
            allMessages.length > 0 &&
            allMessages.map((data, i) => {
              return <CardComponent data={data} type="messages" />;
            })}
        </div>
      </div>
    </>
  );
};

export default AdminMessage;
