import * as React from "npm:react";
import {useState, useEffect} from "npm:react";
import {BubbleChartComponent, DraftStandings, ScoreByPosition} from "./summary_cards.js";
import * as d3 from "npm:d3";

// const BASE_URL = "https://5xl9q45a8g.execute-api.us-east-2.amazonaws.com/prod/element-summary/";
const LEAGUE = "https://5xl9q45a8g.execute-api.us-east-2.amazonaws.com/prod/league/"

async function getLeagueData(leagueId) {
    try {
        const leagueData = await fetch(`${LEAGUE}${leagueId}/details`);
        const data = await leagueData.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching league data:", error);
        return null; // Handle errors gracefully
    }
}

function joinData(array1, array2) {
        array1.sort((a, b) => b.id - a.id);
        array2.sort((a, b) => b.league_entry - a.league_entry);
        return d3.zip(array2, array1);
}

export function LeagueSummaryComponent() {
    const [selectedLeagueID, setSelectedLeagueID] = useState(null);
    const [leagueData, setLeagueData] = useState(null);
    const [error, setError] = useState(false); // To track fetch errors
    const weeks = 11;

    useEffect(() => {
        const fetchLeagueData = async () => {
            if (selectedLeagueID) {
                setError(false); // Reset error state
                const data = await getLeagueData(selectedLeagueID);
                if (data && data.league) {
                    setLeagueData(data);
                } else {
                    setLeagueData(null);
                    setError(true); // Set error if league not found
                }
            }
        };

        fetchLeagueData();
    }, [selectedLeagueID]);

    const GenerateSummary = (event) => {
        const leagueID = document.getElementById('leagueID').value.trim();
        if (leagueID) {
            setSelectedLeagueID(leagueID);
        }
    };

    return (
        <div>
            <h1>Draft League Summary</h1>
            <div className="main-body">
                <label htmlFor="leagueID">Enter League ID:</label>
                <input type="text" id="leagueID" />
                <button id="leagueButton" onClick={GenerateSummary}>
                    Submit
                </button>
                {/* <p>can't find league id: https://draft.premierleague.com/api/bootstrap-dynamic</p> */}
            </div>
            <div id="league-summary-container">
                {error ? (
                    <h2>League Not Found</h2>
                ) : leagueData ? (
                    <div>
                        <h2>{leagueData.league.name}</h2>
                        <div>
                            <DraftStandings members={joinData(leagueData.league_entries, leagueData.standings)}></DraftStandings>
                            <BubbleChartComponent leagueData={leagueData}></BubbleChartComponent>
                            {/* <ScoreByPosition weeks={weeks} leagueEntries={leagueData.league_entries}></ScoreByPosition> */}
                        </div>
                    </div>
                ) : (
                    <h2></h2>
                )}
            </div>
        </div>
    );
}
{/* //     <PointStandings></PointStandings>
//     <StandingsTimeline></StandingsTimeline>
//     <ScoreProgression></ScoreProgression>
//     <ScoreBreakDown></ScoreBreakDown>
//     <DraftTransfers></DraftTransfers>
//     <TeamBreakDown></TeamBreakDown> */}