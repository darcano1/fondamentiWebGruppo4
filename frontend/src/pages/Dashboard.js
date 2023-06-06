import React from 'react';
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [authenticated, setauthenticated] = useState(true); //da modificare true
  useEffect(() => {
    //verifica autenticazione con server
    /*if (loggedInUser) {
      setauthenticated(loggedInUser);
    }*/
  }, []);

  if (!authenticated) {
  // Redirect
  } else {
    return (
      <div>
        <p>Welcome to your Dashboard</p>
      </div>
    );
  }
};

export default Dashboard;