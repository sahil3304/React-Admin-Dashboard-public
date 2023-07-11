import React, { useState, useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off, remove, set, push } from "firebase/database";
import './Table.css'
const appSettings = {
    databaseURL: "https://cart-764ab-default-rtdb.asia-southeast1.firebasedatabase.app"
};
 
const app = initializeApp(appSettings);
const database = getDatabase(app);
const dataRef = ref(database, 'db-table');

const channel_deny = new BroadcastChannel('order-denial-channel');
const channel_approve = new BroadcastChannel('order-approval-channel');
export default function Table() {
  const [data, setData] = useState([]);

  useEffect(() => {
    onValue(dataRef, (snapshot) => {
        const dataVar = snapshot.val();
        if(dataVar){
            const items = Object.values(dataVar);
            setData(items);
        } 
        else{
            setData([]);
        }
    });
  }, []);

  const generateVerificationCode = () => {
    const length = 7;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
  
    return code;
  };

  const handleDeny = (index) => {
    const dataIndexRef = ref(database, 'db-table/' + index);
    remove(dataIndexRef)

    //Sending Denial Notification
    channel_deny.postMessage("Our servers are busy at the moment. Sorry we could not process your order.")
  };

  const handleApprove = (index) => {
    const dataIndexRef = ref(database, 'db-table/' + index);
    remove(dataIndexRef)

    //Sending Denial Notification
    const amt = 100
    const verificationCode = generateVerificationCode();
    const data = {
        message: "Your order has been approved",
        Amount: amt,
        VerificationCode : verificationCode,
    }
    channel_approve.postMessage(data)
  };


  return (
    <div className="Table">
      <h3>Recent Orders</h3>
      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Tracking ID</th>
            <th>Date</th>
            <th>Pending...</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.trackingId}</td>
              <td>{row.date}</td>
              <td>
                <div className="Pending">
                  <div className="approve-div"><button className="approve-btn" onClick={() => handleApprove(index)}>Approve</button></div>
                  <div className="deny-div"><button className="deny-btn" onClick={() => handleDeny(index)}>Deny</button></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}