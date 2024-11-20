import * as d3 from "npm:d3";
import {FileAttachment} from "observablehq:stdlib";

const pos = await FileAttachment("../../data/player-positions.csv").csv();
const positionMap  = new Map(pos.map(row => [row.id, row.position]));
const BASE_URL = "https://5xl9q45a8g.execute-api.us-east-2.amazonaws.com/prod/";

export async function pointByPosition(leagueEntries, weeks) {
        const leagueData = []
        for (let player of leagueEntries) {
                const playerOverview = {
                        id: player.entry_id,
                        name: player.entry_name,
                        "Goalkeepers": 0,
                        "Defenders": 0,
                        "Midfielders": 0,
                        "Forwards": 0
                        };
                leagueData.push(playerOverview)
        }

        for(let i = 1; i <= 1; i++) {
                await gameweekStats(i, leagueData);
        }
        console.log(leagueData);
        return leagueData
}

async function gameweekStats(week, leaguePlayers) {
        const gameweekData = await retryGet(`${BASE_URL}event/${week}/live`);

        return await Promise.all(
            leaguePlayers.map(async leaguePlayer => {
                const id = leaguePlayer.id;
                const fantasyPlayers = await retryGet(`${BASE_URL}entry/${id}/event/${week}`);

                const playerDataPromises = fantasyPlayers.picks.slice(0, 11).map(async pick => {
                    const fantasyPlayer = pick.element;
                    const fantasyPlayerData = gameweekData.elements.filter(d => d.id == fantasyPlayer);
                    const position = positionMap.get(fantasyPlayer.toString());
                    if (!position) return null; // Skip if position not found
                    return { position, points: fantasyPlayerData[0].stats.total_points};
                });

                const playerPoints = (await Promise.all(playerDataPromises)).filter(Boolean);
                playerPoints.forEach(({ position, points }) => {
                    leaguePlayer[position] += points;
                });
             })
        );

    }

    function retryGet(url, retries = 3, backoff = 300) {
        const retryCodes = [408, 500, 502, 503, 504, 522, 524];
        return new Promise((resolve, reject) => {
                fetch(url)
                    .then(response => {
                        const { status } = response;
                        if (!response.ok) {
                            if (retries > 0 && retryCodes.includes(status)) {
                                setTimeout(() => {
                                    resolve(retryGet(url, retries - 1, backoff*2));
                                }, backoff);
                            } else {
                                reject(new Error(`Request failed with status ${status}`));
                            }
                        } else {
                            // Parse and resolve with the response data
                            return response.json();
                        }
                    })
                    .then(data => resolve(data))
                    .catch(error => {
                        if (retries > 0) {
                            setTimeout(() => {
                                resolve(retryGet(url, retries - 1, backoff*2));
                            }, backoff);
                        } else {
                            reject(error);
                        }
                    });
            });
      }