import {useState, useEffect} from "npm:react";

export function TopStatsCard({ standardData, player}){
        const data = standardData.filter(d => d.player == player)[0];
        const per90 = data["90s"];
        const [showPer90, setShowPer90] = useState(false);
        const toggle = () => {setShowPer90(!showPer90)};

        return (
                <div className="TopStatsCard card">
                        <table className="statsTable">
                                <thead>
                                        <tr><th>{showPer90 ? "Top Stats per 90" : "Top Stats"}</th></tr>
                                </thead>
                                {showPer90 ? (
                                <tbody>
                                        <tr><td>Matches Played: <div class="value">{data["Playing Time_MP"]}</div></td></tr>
                                        <tr><td>Matches Started: <div class="value">{data["Playing Time_Starts"]}</div></td></tr>
                                        <tr><td>Minutes Played: <div class="value">{data["Playing Time_Min"]}</div></td></tr>
                                        <tr><td>Goals: <div class="value">{data["Per 90 Minutes_Gls"]}</div></td></tr>
                                        <tr><td>Assists: <div class="value">{data["Per 90 Minutes_Ast"]}</div></td></tr>
                                        <tr><td>Xg: <div class="value">{data["Per 90 Minutes_xG"]}</div></td></tr>
                                        <tr><td>Xa: <div class="value">{data["Per 90 Minutes_xAG"]}</div></td></tr>
                                </tbody>
                                        ) : (
                                <tbody>
                                        <tr><td>Matches Played: <div class="value">{data["Playing Time_MP"]}</div></td></tr>
                                        <tr><td>Matches Started: <div class="value">{data["Playing Time_Starts"]}</div></td></tr>
                                        <tr><td>Minutes Played: <div class="value">{data["Playing Time_Min"]}</div></td></tr>
                                        <tr><td>Goals: <div class="value">{data["Performance_Gls"]}</div></td></tr>
                                        <tr><td>Assists: <div class="value">{data["Performance_Ast"]}</div></td></tr>
                                        <tr><td>Xg: <div class="value">{data["Expected_xG"]}</div></td></tr>
                                        <tr><td>Xa: <div class="value">{data["Expected_xAG"]}</div></td></tr>
                                </tbody>
                                )}
                        </table>
                        <button className="toggleButton" onClick={toggle}>{showPer90 ? 'Total Stats' : 'Per 90'}</button>
                </div>
        );
}

export function AttackStatsCard({ shootingData, passingData, player }) {
        const passing = passingData.filter(d => d.player == player)[0];
        const shooting = shootingData.filter(d => d.player == player)[0];
        const per90 = passing["90s"];
        const [showPer90, setShowPer90] = useState(false);
        const toggle = () => {setShowPer90(!showPer90)};

        return (
        <div className="AttackStatsCard card">
                <table className="statsTable">
                        <thead>
                                <tr><th>{showPer90 ? 'Attacking Stats per 90' : 'Attacking Stats'}</th></tr>
                        </thead>
                        {showPer90 ? (
                        <tbody>
                                <tr><td>Shot Acc: <div class="value">{(shooting["Standard_SoT"] / per90).toFixed(2)} of {(shooting["Standard_Sh"] / per90).toFixed(2)}</div></td></tr>
                                <tr><td>Passes Acc: <div class="value">{(passing["Total_Cmp"] / per90).toFixed(2)} of {(passing["Total_Att"] / per90).toFixed(2)}</div></td></tr>
                                <tr><td>Short Passes: <div class="value">{(passing["Short_Cmp"] / per90).toFixed(2)} of {(passing["Short_Att"] / per90).toFixed(2)}</div></td></tr>
                                <tr><td>Medium Passes: <div class="value">{(passing["Medium_Cmp"] / per90).toFixed(2)} of {(passing["Medium_Att"] / per90).toFixed(2)} </div></td></tr>
                                <tr><td>Long Passes: <div class="value">{(passing["Long_Cmp"] / per90).toFixed(2)} of {(passing["Long_Att"] / per90).toFixed(2)}</div> </td></tr>
                                <tr><td>Progressive Passes: <div class="value">{(passing["PPA"] /  per90).toFixed(2)}</div></td></tr>
                                <tr><td>Non Penalty xG: <div class="value">{(shooting["Expected_npxG"] / per90).toFixed(2)}</div></td></tr>
                        </tbody>
                        ) : (
                        <tbody>
                                <tr><td>Shot Acc: <div class="value">{shooting["Standard_SoT"]} of {shooting["Standard_Sh"]}</div></td></tr>
                                <tr><td>Passes Acc: <div class="value">{passing["Total_Cmp"]} of {passing["Total_Att"]}</div></td></tr>
                                <tr><td>Short Passes: <div class="value">{passing["Short_Cmp"]} of {passing["Short_Att"]}</div></td></tr>
                                <tr><td>Medium Passes: <div class="value">{passing["Medium_Cmp"]} of {passing["Medium_Att"]} </div></td></tr>
                                <tr><td>Long Passes: <div class="value">{passing["Long_Cmp"]} of {passing["Long_Att"]}</div> </td></tr>
                                <tr><td>Progressive Passes: <div class="value">{passing["PPA"]}</div></td></tr>
                                <tr><td>Non Penalty xG: <div class="value">{shooting["Expected_npxG"]}</div></td></tr>
                        </tbody>
                        )}
                </table>
                <button className="toggleButton" onClick={toggle}>{showPer90 ? 'Total Stats' : 'Per 90'}</button>
        </div>
        );
}

export function DribblingStatsCard({ possessionData, player}) {
        const data = possessionData.filter(d => d.player == player)[0];
        const per90 = data["90s"];

        const [showPer90, setShowPer90] = useState(false);
        const toggle = () => {setShowPer90(!showPer90)};
        return (
        <div className="DuelStatsCard card">
                <table className="statsTable">
                        <thead>
                                <tr><th>{showPer90 ? "Dribbling Stats" : "Dribbinling Stats per 90"}</th></tr>
                        </thead>
                        {showPer90 ? (
                        <tbody>
                                <tr><td>Touches: <div class="value">{(data["Touches_Touches"] / per90).toFixed(2)}</div></td></tr>
                                <tr><td>Final Third Touches: <div class="value">{(data["Touches_Att 3rd"] / per90).toFixed(2)}</div></td></tr>
                                <tr><td>Opp Penalty Touches: <div class="value">{(data["Touches_Att Pen"] / per90).toFixed(2)}</div></td></tr>
                                <tr><td>Successful Dribbles: <div class="value"> {(data["Take-Ons_Succ"] / per90).toFixed(2)} of {(data["Take-Ons_Att"]/ per90).toFixed(2)}</div></td></tr>
                                <tr><td>Carries: <div class="value"> {(data["Carries_Carries"] / per90).toFixed(2)}</div></td></tr>
                                <tr><td>Progressive Carries <div class="value">{(data["Carries_PrgC"] / per90).toFixed(2)}</div></td></tr>
                        </tbody>
                        ) :(
                        <tbody>
                                <tr><td>Touches: <div class="value">{data["Touches_Touches"]}</div></td></tr>
                                <tr><td>Final Third Touches: <div class="value">{data["Touches_Att 3rd"]}</div></td></tr>
                                <tr><td>Opp Penalty Touches: <div class="value">{data["Touches_Att Pen"]}</div></td></tr>
                                <tr><td>Successful Dribbles: <div class="value"> {data["Take-Ons_Succ"]} of {data["Take-Ons_Att"]}</div></td></tr>
                                <tr><td>Carries: <div class="value"> {data["Carries_Carries"]}</div></td></tr>
                                <tr><td>Progressive Carries <div class="value">{data["Carries_PrgC"]}</div></td></tr>
                        </tbody>
                        )}
                </table>
                <button className="toggleButton" onClick={toggle}>{showPer90 ? 'Total Stats' : 'Per 90'}</button>
        </div>
        );
}

export function DefenseStatsCard({ defenseData, player }) {
        const data = defenseData.filter(d => d.player == player)[0];
        const per90 = data["90s"];
        const [showPer90, setShowPer90] = useState(false);
        const toggle = () => {setShowPer90(!showPer90)};
        return (
        <div className="DefenseStatsCard card">
                <table className="statsTable">
                        <thead>
                                <tr><th>{showPer90 ? "Defensive Stats" : "Defensive Stats per 90"}</th></tr>
                        </thead>
                        {showPer90 ? (
                        <tbody>
                                <tr><td>Tackles Won <div class="value">{(data["Tackles_TklW"] / per90).toFixed(2)} of {(data["Tackles_TklW"] / per90).toFixed(2)} </div></td></tr>
                                <tr><td>Blocked Shots<div class="value">{(data["Blocks_Sh"] / per90).toFixed(2)}</div></td></tr>
                                <tr><td>Blocked Passes<div class="value">{(data["Blocks_Pass"] /per90).toFixed(2)}</div></td></tr>
                                <tr><td>Interceptions: <div class="value">{(data["Int"] / per90).toFixed(2)}</div></td></tr>
                                <tr><td>Clearances: <div class="value">{(data["Clr"] / per90).toFixed(2)}</div></td></tr>
                                <tr><td>Errors: <div class="value">{(data["Err"] / per90).toFixed(2)}</div></td></tr>
                        </tbody>
                        ) : (
                        <tbody>
                                <tr><td>Tackles Won <div class="value">{data["Tackles_TklW"]} of {data["Tackles_TklW"]} </div></td></tr>
                                <tr><td>Blocked Shots<div class="value">{data["Blocks_Sh"]}</div></td></tr>
                                <tr><td>Blocked Passes<div class="value">{data["Blocks_Pass"]}</div></td></tr>
                                <tr><td>Interceptions: <div class="value">{data["Int"]}</div></td></tr>
                                <tr><td>Clearances: <div class="value">{data["Clr"]}</div></td></tr>
                                <tr><td>Errors: <div class="value">{data["Err"]}</div></td></tr>
                        </tbody>
                )}

                </table>
                <button className="toggleButton" onClick={toggle}>{showPer90 ? 'Total Stats' : 'Per 90'}</button>
        </div>
        );
}
