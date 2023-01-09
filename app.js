const apiKey = "ed4c00ebcda84786a2a93aa7a32bb92f"
const baseUrl = "https://api.football-data.org/v4/competitions/2000"

function getStandings(){
    const url = `${baseUrl}/standings`
    
    axios.get(url, {
        headers: {
            "X-Auth-Token": apiKey
        }
    }).then((result) => {
        const standings = result.data.standings
        document.getElementById('standingsRow').innerHTML = ""
        for (standing of standings){
            let tableContent = ""

            for (row of standing.table) {
                tableContent+= `
                <li class="list-group-item">
                <div class="row">
                    <div class="col-sm-4 text-center d-flex justify-content-center align-items-center">
                        <span>
                            <img class="border border-2 rounded-circle flag-img" src="${row.team.crest}" alt="Flag"> 
                        </span>
                        <b><h5 class="my-auto">${row.team.tla}</h5></b>
                    </div>
                    <div class="col-sm-2 text-center">${row.won}</div>
                    <div class="col-sm-2 text-center">${row.lost}</div>
                    <div class="col-sm-2 text-center">${row.draw}</div>
                    <div class="col-sm-2 text-center"><b>${row.points}</b></div>
                </div>
            </li>
                `
            }

            const content = `
            <div class="col-sm-6 mb-4">
            <div class="card shadow border-0">
                <div class="card-header bg-primary text-center">
                    <h5>${standing.group}</h5>
                </div>
                <div class="row bg-secondary m-0 px-1">
                    <div class="col-sm-4 text-center">Team</div>
                    <div class="col-sm-2 text-center">W</div>
                    <div class="col-sm-2 text-center">L</div>
                    <div class="col-sm-2 text-center">D</div>
                    <div class="col-sm-2 text-center">Pts</div>
                </div>

                <ul class="list-group list-group-flush">
                    ${tableContent}
                </ul>
            </div>
        </div>`

        document.getElementById("standingsRow").innerHTML += content
        }
    })
}


function getMatches(){
    const url = `${baseUrl}/matches`
    
    axios.get(url, {
        headers: {
            "X-Auth-Token": apiKey
        }
    }).then((result) => {
        const matches = result.data.matches
        document.getElementById("matches").innerHTML = ""
        for (match of matches){
            const homeTeam = match.homeTeam
            const awayTeam = match.awayTeam
            const score = match.score.fullTime
            // Date Formating
            const utcDate = match.utcDate
            const matchTime = new Date(utcDate)
            const dateTime = matchTime.getUTCFullYear() + " / " + (matchTime.getUTCMonth() + 1) + " / " + (matchTime.getUTCDay() + 1) + " <br>" + matchTime.getUTCHours() + ":" + matchTime.getUTCMinutes();
            if (match.group == null){
                continue
            }
            const content = `
            <div class="col-sm-12 mb-3">
            <div class="card shadow rounded-pill" id="matchCard">
                <div class="card-body p-0">
                    <div class="row" style="height: 120px;">

                        <!-- First team column -->
                        <div class="col-sm-3 bg-primary d-flex flex-column justify-content-center align-items-center"
                            style="border-right: solid 5px #5b0d25;">

                            <!-- Image and team name -->
                            <div class="d-flex align-items-center justify-content-center">
                                <div>
                                    <img class="border border-2 rounded-circle flag-img"
                                        style="object-fit: cover"
                                        src=${homeTeam.crest}
                                        alt="Flag">
                                    <b>
                                        <h5 class="my-auto">${homeTeam.tla}</h5>
                                    </b>
                                </div>
                            </div>
                            <!--// Image and team name //-->
                        </div>
                        <!--// First team column //-->

                        <!-- Match info -->
                        <div class="col-sm-6" style="text-align: center;">
                            <div class="row d-flex align-items-center">
                                <div class="col-sm-4">
                                    <h3>${score.home}</h3>
                                </div>
                                <div class="col-sm-4">
                                <h6>${match.group}</h6>
                                <h1>X</h1>
                                <h6>${dateTime}</h6>
                                </div>
                                <div class="col-sm-4">
                                    <h3>${score.away}</h3>
                                </div>
                            </div>
                        </div>
                        <!--// Match info //-->

                        <!-- second team column -->
                        <div class="col-sm-3 bg-primary d-flex flex-column justify-content-center align-items-center"
                        style="border-left: solid 5px #5b0d25;">

                        <!-- Image and team name -->
                        <div class="d-flex align-items-center justify-content-center">
                            <div>
                                <img class="border border-2 rounded-circle flag-img"
                                    style="object-fit: cover"
                                    src="${awayTeam.crest}"
                                    alt="Flag">
                                <b>
                                    <h5 class="my-auto">${awayTeam.tla}</h5>
                                </b>
                            </div>
                        </div>
                        <!--// Image and team name //-->
                    </div>
                         <!--// second team column //-->
                    </div>
                </div>
            </div>
        </div>
            `
            document.getElementById('matches').innerHTML += content
        }
 
    })
}

getMatches()
getStandings()
