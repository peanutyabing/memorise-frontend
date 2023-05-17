import { useEffect, useState } from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate.js";
import moment from "moment";
import { Card } from "@material-tailwind/react";

export default function XpHistory() {
  const axiosPrivate = useAxiosPrivate();
  const [xpTransactions, setXpTransactions] = useState([]);

  const TABLE_HEAD = ["Date", "Activity", "XP Gained"];

  const TABLE_ROWS = xpTransactions.map((transaction) => ({
    id: transaction.id,
    date: moment(transaction.createdAt).format("DD MMM YYYY, h:mm a"),
    activity: transaction.xpActivity?.name,
    xpGained: transaction.xpGained,
  }));

  useEffect(() => {
    getXpTransactions();
  }, []);

  const getXpTransactions = async () => {
    try {
      const xpTransactionsRes = await axiosPrivate.get("/xp");
      setXpTransactions(xpTransactionsRes?.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pt-20 pb-10 h-max min-h-screen bg-white text-black dark:bg-black dark:text-white flex flex-col items-center">
      <header></header>
      <h1 className="font-semibold text-xl mt-2 mb-4">XP History</h1>
      <Card className="mx-auto h-full w-full max-w-lg dark:bg-black text-sm">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 dark:bg-blue-gray-800 dark:text-white p-4"
                >
                  <div
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ id, date, activity, xpGained }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4 dark:text-white"
                : "p-4 dark:text-white border-b border-blue-gray-50 dark:border-pale-500";

              return (
                <tr key={id}>
                  <td className={classes}>
                    <div>{date}</div>
                  </td>
                  <td className={classes}>
                    <div>{activity}</div>
                  </td>
                  <td className={classes}>
                    <div>{xpGained}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
