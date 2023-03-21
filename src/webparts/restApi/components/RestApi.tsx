import { SPFI } from "@pnp/sp";
import * as React from "react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getSP } from "../../../pnpConfig";
// import styles from "./RestApi.module.scss";
import { IRestApiProps } from "./IRestApiProps";
// import { escape } from "@microsoft/sp-lodash-subset";
import 'react-toastify/dist/ReactToastify.css';

const RestApi = (props: IRestApiProps) => {
  const { context } = props;

  const LIST_NAME = "Testing Rest API";
  let _sp: SPFI = getSP(context);

  const [listData, setListData] = useState([]);

  const [IdEmployee, setIdEmployee] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [rolePosition, setRolePosition] = useState("Software Engineer");

  useEffect(() => {
    _sp.web.lists
      .getByTitle(LIST_NAME)
      .items()
      .then((res) => {
        setListData(res);
      })
      .catch((err) => {
        return err;
      });
  }, []);

  useEffect(() => {
    if (listData.length === 0) {
      setIdEmployee(1);
    } else {
      setIdEmployee(Number(listData[listData.length - 1].Title) + 1);
    }
  }, [listData]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    await _sp.web.lists.getByTitle(LIST_NAME).items.add({
      Title: IdEmployee.toString(),
      FullName: fullName,
      Email: email,
      RolePositon: rolePosition,
    });
    // alert("Add new item successfully");
    toast.success(`Add new a ${rolePosition} successfully!`, {
      autoClose: 3000,
    });
    setFullName("");
    setEmail("");
    setRolePosition("Software Engineer");
    await _sp.web.lists.getByTitle(LIST_NAME).items().then((res) => {
      console.log("res", res);
      setListData(res);
      setIdEmployee(
        Number(listData[listData.length - 1].Title) + 1);
    }
    );
  };

  return (
    <div>
      <h1>Rest API</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="idEmployee">Id Employee:</label>
          <input type="number" readOnly id="idEmployee" value={IdEmployee} />
        </div>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label>Role Position:</label>
          <div>
            <label htmlFor="softwareEngineer">
              <input
                type="radio"
                id="softwareEngineer"
                value="Software Engineer"
                checked={rolePosition === "Software Engineer"}
                onChange={(event) => setRolePosition(event.target.value)}
              />
              Software Engineer
            </label>
          </div>
          <div>
            <label htmlFor="ceo">
              <input
                type="radio"
                id="ceo"
                value="CEO"
                checked={rolePosition === "CEO"}
                onChange={(event) => setRolePosition(event.target.value)}
              />
              CEO
            </label>
          </div>
          <div>
            <label htmlFor="sale">
              <input
                type="radio"
                id="sale"
                value="Sale"
                checked={rolePosition === "Sale"}
                onChange={(event) => setRolePosition(event.target.value)}
              />
              Sale
            </label>
          </div>
          <div>
            <label htmlFor="pm">
              <input
                type="radio"
                id="pm"
                value="PM"
                checked={rolePosition === "PM"}
                onChange={(event) => setRolePosition(event.target.value)}
              />
              PM
            </label>
          </div>
          <div>
            <label htmlFor="techLead">
              <input
                type="radio"
                id="techLead"
                value="Tech Lead"
                checked={rolePosition === "Tech Lead"}
                onChange={(event) => setRolePosition(event.target.value)}
              />
              Tech Lead
            </label>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Id Employee</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role Position</th>
          </tr>
        </thead>
        <tbody>
          {listData.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.Title}</td>
                <td>{item.FullName}</td>
                <td>{item.Email}</td>
                <td>{item.RolePositon}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default RestApi;
