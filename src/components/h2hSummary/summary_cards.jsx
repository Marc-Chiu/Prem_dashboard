import {useState, useEffect, useRef} from "npm:react";
import { bubbleChart } from "../charts/bubble.js";
import { pointByPosition } from "./util.js";

export function DraftStandings({ members }) {
        return (
            <div className="grid grid-cols-2 gap-4">
                <div className="card standings">
                    <h1 className="text-lg font-bold mb-4">League Standings</h1>
                    <ol>
                        {members.sort((a, b) => b[0].total - a[0].total).map((member) => (
                            <li key={member[1].entry_id} className="flex justify-between border-b py-2">
                                <span className="font-medium">{member[1].entry_name}</span>
                                <span>{member[0].total}</span>
                            </li>
                        ))}
                    </ol>
                </div>
                <div className="card standings">
                    <h1 className="text-lg font-bold mb-4">League Points</h1>
                    <ol>
                        {members
                            .sort((a, b) => b[0].points_for - a[0].points_for)
                            .map((member) => (
                                <li key={member[1].entry_id} className="flex justify-between border-b py-2">
                                    <span className="font-medium">{member[1].entry_name}</span>
                                    <span>{member[0].points_for}</span>
                                </li>
                            ))}
                    </ol>
                </div>
            </div>
        );
    }


export function BubbleChartComponent({ leagueData }) {
        const chartRef = useRef(null); // Create a ref to hold the chart container
        useEffect(() => {
                if (chartRef.current) {
                chartRef.current.innerHTML = "";
                const chart = bubbleChart(leagueData);
                chartRef.current.appendChild(chart);
                }
        }, [leagueData]); // Re-run the effect if leagueData changes
        return <div className="card" ref={chartRef}></div>;
}

export function ScoreByPosition({ weeks, leagueEntries}) {
    const [points, setPoints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPoints = async () => {
            const pointsData = await pointByPosition(leagueEntries, weeks);
            setPoints(pointsData);
            setLoading(false);
        };

        fetchPoints();
    }, [leagueEntries, weeks]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="card position-points goalkeepers">
                <h1 className="text-lg font-bold mb-4">Goalkeepers Points</h1>
                <ol>
                    {points.sort((a, b) => b.Goalkeepers - a.Goalkeepers).map((member) => (
                        <li key={member.name} className="flex justify-between border-b py-2">
                            <span className="font-medium">{member.name}</span>
                            <span>{member["Goalkeepers"]}</span>
                        </li>
                    ))}
                </ol>
            </div>
            <div className="card position-points defenders">
                <h1 className="text-lg font-bold mb-4">Defenders Points</h1>
                <ol>
                    {points.sort((a, b) => b.Defenders - a.Defenders).map((member) => (
                        <li key={member.name} className="flex justify-between border-b py-2">
                            <span className="font-medium">{member.name}</span>
                            <span>{member.Defenders}</span>
                        </li>
                    ))}
                </ol>
            </div>
            <div className="card position-points midfielders">
                <h1 className="text-lg font-bold mb-4">Midfielders Points</h1>
                <ol>
                    {points.sort((a, b) => b.Midfielders - a.Midfielders).map((member) => (
                        <li key={member.name} className="flex justify-between border-b py-2">
                            <span className="font-medium">{member.name}</span>
                            <span>{member.Midfielders}</span>
                        </li>
                    ))}
                </ol>
            </div>
            <div className="card position-points forwards">
                <h1 className="text-lg font-bold mb-4">Forwards Points</h1>
                <ol>
                    {points.sort((a, b) => b.Forwards - a.Forwards).map((member) => (
                        <li key={member.name} className="flex justify-between border-b py-2">
                            <span className="font-medium">{member.name}</span>
                            <span>{member.Forwards}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}