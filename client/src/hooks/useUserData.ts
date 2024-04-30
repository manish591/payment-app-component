import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants/url';

type UserData = {
  first_name: string,
  last_name: string,
  username: string,
}

const INITIAL_USER_DATA: UserData = {
  first_name: "",
  last_name: "",
  username: "",
}

function useUserData() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(INITIAL_USER_DATA);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const result = await fetch(`${BASE_URL}/users/self`, {
          method: "GET",
          credentials: "include"
        });

        if(result?.status !== 200) {
          setIsLoggedIn(false);
          setUserData(INITIAL_USER_DATA);
          navigate("/");
        }

        if(result.status == 200) {
          const { userData } = await result.json();
          const { first_name, last_name, username } = userData;
          setIsLoggedIn(true);
          setUserData((data) => {
            return { ...data, first_name, last_name, username }
          });
        }
      } catch(err) {
        console.log(err);
        console.log("ERROR OCCURED: cannot get user data");
      }
    })();
  }, []);

  return {isLoggedIn, userData};
}

export { useUserData };