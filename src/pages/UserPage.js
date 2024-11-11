import { useState, useEffect } from "react";
import { Stack } from "react-bootstrap";
import Image from "react-bootstrap";
import Spinner from "react-bootstrap";
import { useParams } from "react-router-dom";
import Body from "../components/Body";
import TimeAgo from "../components/TimeAgo";
import { useApi } from "../contexts/ApiProvider";

export default function UserPage() {
  const { username } = useParams();
  const [user, setUser] = useState();
  const api =  useApi();

  useEffect(() => {
    (async () => {
      const response = await api.get('/users/' + username);
      setUser(response.ok ? response.body : null);
    })();
  }, [username, api]);

  return (
    <Body sidebar>
      {user == undefined ?
        <Spinner animation="border" />
      :
        <>
          {}
        </>
    }  
    </Body>
  )
}