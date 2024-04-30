import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { BASE_URL } from "../../constants/url";

export function Transaction() {
  const [amount, setAmount] = useState("");
  const [ searchParams ] = useSearchParams();
  const navigate = useNavigate();
  const userId = searchParams?.get("to");
  const name = searchParams?.get("name");

  async function handlerTransferMoney(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      const result = await fetch(`${BASE_URL}/accounts/transfer`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: userId,
          amount: Number(amount)
        })
      });
      const data = await result.json();
      if(result.status === 200) {
        console.log("Money successfully transferred", data);
      }
    } catch(err) {
      console.log("ERROR OCCURED: while transferring the money");
    } finally {
      navigate("/dashboard");
    }
  }

  return (
    <div className="font-mono">
      <div className="w-11/12 lg:max-w-md bg-white mx-auto py-8 px-8 rounded-lg mt-32">
        <section className="text-center">
          <h1 className="text-3xl font-bold">Send Money</h1>
        </section>
        <section className="flex gap-4 mt-12 items-center">
          <div className="w-10 text-white h-10 rounded-full bg-green-400 flex items-center justify-center">
            {name ? <p>{name[0]}</p> : <p>U</p> }
          </div>
          <h3 className="font-bold text-xl">{name}</h3>
        </section>
        <form className="mt-4" onSubmit={handlerTransferMoney}>
          <section className="mt-4">
            <Input 
              value={amount} 
              label="Amount (In Rs)" 
              type="number"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </section>
          <Button type="submit" className="bg-green-400 text-white py-3 rounded-md w-full mt-8">Initiate Transfer</Button>
        </form>
      </div>
    </div>
  )
}