import { useEffect, useState } from "react";
import { axiosDefault } from "../../Utils/axios.js";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import { TrophyIcon, SparklesIcon } from "@heroicons/react/24/solid";

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([
    {
      label: "This week",
      value: "thisWeek",
      content: [],
    },
    {
      label: "All-time",
      value: "allTime",
      content: [],
    },
  ]);

  const colorChart = [
    "deep-orange-500",
    "orange-500",
    "amber-500",
    "lime-500",
    "light-green-500",
  ];

  const trophyChart = ["yellow", "blue-gray-500", "brown-500"];

  useEffect(() => {
    getThisWeeksLeaderboard();
    getAllTimeLeaderboard();
  }, []);

  const getThisWeeksLeaderboard = async () => {
    const thisWeeksLeaderboardRes = await axiosDefault.get("/xp/this-week");
    const leaderboardDataToUpdate = [...leaderboardData];
    leaderboardDataToUpdate[0].content = thisWeeksLeaderboardRes.data.slice(
      0,
      5
    );
    setLeaderboardData(leaderboardDataToUpdate);
  };

  const getAllTimeLeaderboard = async () => {
    const allTimeLeaderboardRes = await axiosDefault.get("/xp/all-time");
    const leaderboardDataToUpdate = [...leaderboardData];
    leaderboardDataToUpdate[1].content = allTimeLeaderboardRes.data.slice(0, 5);
    setLeaderboardData(leaderboardDataToUpdate);
  };

  return (
    <Tabs id="custom-animation" value="thisWeek" className="w-full max-w-xl">
      <TabsHeader
        className=" dark:bg-orange-700 bg-opacity-100 bg-orange-400"
        indicatorProps={{
          className: "dark:bg-orange-400/50 bg-orange-200/50",
        }}
      >
        {leaderboardData.map(({ label, value }) => (
          <Tab key={value} value={value} className="dark:text-white text-black">
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody
        animate={{
          initial: { y: 250 },
          mount: { y: 0 },
          unmount: { y: 250 },
        }}
      >
        {leaderboardData?.map(({ value, content }) => (
          <TabPanel
            key={value}
            value={value}
            className="text-black dark:text-white font-semibold"
          >
            <div className="">
              {content?.map((row, index) => (
                <div className="max-w-sm mx-auto grid grid-cols-4 mb-1 text-sm justify-items-center items-center">
                  <img
                    src={row.user?.imageUrl}
                    alt=""
                    className="w-6 h-6 rounded-full"
                  />
                  <div>{row.user?.username}</div>
                  <div className="flex items-center">
                    {value === "thisWeek" && "+"}
                    {row.xpTotal}
                  </div>
                  <div>
                    {value === "thisWeek" && (
                      <ChevronDoubleUpIcon
                        strokeWidth={2}
                        className={`w-4 h-4 ml-3 text-${colorChart[index]}`}
                      />
                    )}
                    {value === "allTime" && index < 3 && (
                      <TrophyIcon
                        className={`w-4 h-4 text-${trophyChart[index]}`}
                      />
                    )}
                    {value === "allTime" && index >= 3 && (
                      <SparklesIcon className="w-4 h-4 text-yellow" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
