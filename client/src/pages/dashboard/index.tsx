import { useEffect, useState } from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { BASE_URL } from "../../constants/url";
import { useUserData } from "../../hooks/useUserData";

type User = {
  _id: string,
  first_name: string,
  last_name: string,
  username: string,
}

export function DashBoard() {
  const { userData } = useUserData();
  const [balance, setBalance] = useState<null | number>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await fetch(`${BASE_URL}/accounts/balance`, {
          method: "GET",
          credentials: "include"
        });
  
        const { balance } = await result.json();
        if(result.status == 200) {
          setBalance(balance);
        }
      } catch(err) {
        console.log("ERROR OCCURED: cannot get user balance");
      }
    })()
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const result = await fetch(`${BASE_URL}/users?searchQuery=${searchQuery}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await result.json();
        
        if(result.status === 200) {
          setUsers(data.data);
        }
      } catch(err) {
        console.log("Unable to fetch users");
      }
    })()
  }, [searchQuery]);

  return (
    <div className="bg-white py-10 px-16 rounded-lg mt-20">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">{userData?.first_name} Balance: <strong>{balance}</strong></h1>
        <Input 
          value={searchQuery} 
          placeholder="Search Users..." 
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }} 
        />    
      </div>
      <div className="mt-20 grid grid-cols-1 gap-8">
        {
          users.map(user => {
            const {first_name, last_name, _id} = user;
            return (
              <div key={_id} className="flex items-center justify-between">
                <section className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
                    <p>{first_name[0]}{last_name[0]}</p>
                  </div>
                  <h3 className="text-xl">{first_name} {last_name}</h3>
                </section>
                <Button className="bg-black py-2 px-4 rounded-md text-white">Send Money</Button>
            </div>
            )
          })
        }
      </div>
    </div>
  )
}