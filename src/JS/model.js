

// Create a new state object that will be export to different files

export const state = {
    player_Data = {},
    sellingOption = true,
    transferOffers: [],
    responseMessage: '',
}

class App {
    constructor() {
        this.checkOffers();
        this.data();
        this.render();
        this.addEventListeners();
        this.createOffers();
        this.getAvgStat();

    }

    addEventListeners() {
        document.body.addEventListener('click', (e) => this.handleClick(e));
    }

    checkOffers() {
        if (this.state.sellingOption) {
            this.state.transferOffers = { ...this.state.transferOffers, newOffers };
            this.state.responseMessage = '';
        } else {
            this.newOffers = [];
            this.state.sellingOption = false;
            this.state.responseMessage = 'We are not selling the player at this moment';
        }
    }

    createOffers() {
        const offersAvailable = this.state.transferOffers.newOffers.map((info, index) =>
            `
                <div class="offers-container">
                    <ul>
                        <li>
                            <span>
                                ${info.team}
                            </span>
                            <span>
                                $${info.lowest.toLocaleString()}
                            </span>
                            <span>
                                $${info.highest.toLocaleString()}
                            </span>
                        </li>
                    </ul>
                </div>
            
            `
        ).join('');

        document.querySelector('.team-offers').insertAdjacentHTML("beforeend", offersAvailable);
    }

    handleClick(e) {
        if (e.target.closest('.btn')) {
            const transferContainer = document.querySelector(".transfer-container");
            transferContainer.classList.toggle('toggle')
        }
    }
    data() {
        return {
           // Fetch data from json file
            selectedDetails: ['PAC', 'SHO', 'PAS', 'DRI', 'DEF', 'PHY'],
        }
    }
  
    getAvgStat() {
        const statsInfo = this.data().attributes; 
    
        const getAvg = statsInfo.map((stat, index) => {
            const convert = Object.values(stat);
            const lengthOfConvert = convert.length;
            
            const setAvg = convert.reduce((acc, curr, i) => {
                let total = (convert[i + 1] += curr);
       
                if (isNaN(total)) {
                    acc = curr;
                }
                
                return acc = (acc / lengthOfConvert).toFixed(0);;
            }, []);
            
            return setAvg;
        });
        
        return getAvg;
    } 

    render() {
        this.displayCard();
        this.displayAttributes();
    }

    displayCard() {
        const { sellingOption, responseMessage } = this.state;
        
        const { ...playerInfo } = this.data();

        const [PAC, SHO, PAS, DRI, DEF, PHY] = this.getAvgStat();
      
        document.querySelector('#app').innerHTML = `
            <article class="card">
                <div class="col-1">
                    <div class="player-details">
                        <h2 class="overall">${playerInfo.rating}</h2>
                        <h4 class="position">${playerInfo.position}</h4>

                        <figure class="flag">
                            <img src="${playerInfo.country}" alt="Norway Flag">
                            <figcaption hidden>Norwegian Flag</figcaption>
                        </figure>
                        <figure class="team-logo">
                            <img src="${playerInfo.team}" alt="BvB" class="team">
                            <figcaption hidden>BVB Dortmund team logo</figcaption>
                        </figure>
                    </div>
                    <figure class="player-pro">
                        <img src='${playerInfo.image}'alt="Haaland">
                        <figcaption hidden>${playerInfo.firstName} ${playerInfo.lastName}</figcaption>
                    </figure>
                </div>
                <div class="col-2">
                    <header>
                        <h3>${playerInfo.lastName.toUpperCase()}</h3>
                    </header>
                    <div class="player-attributes">
                        <div class="att-1">
                            <div>
                                <strong>${PAC}</strong>
                                PAC
                            </div>
                            <div>
                                <strong>${SHO}</strong>
                                SHO
                            </div>
                            <div>
                                <strong>
                                  ${PAS}
                                </strong>
                                PAS
                            </div>
                        </div>
                        <div class="att-2">
                            <div>
                                <strong>
                                    ${DRI}
                                </strong>
                                DRI
                            </div>
                            <div>
                                <strong>
                                 ${DEF}
                                </strong>
                                DEF
                            </div>
                            <div>
                                <strong>
                                    ${PHY}
                                </strong>
                                PHY
                            </div>
                        </div>
                    </div>
                </div>
    
                <div class="col-3">
                    <header class="transfer-head">
                        <h3>Transfer Offers</h3>
                        <button class="btn" type="button"
                        aria-label="Show hidden content"
                        >
                            <i class="fas fa-plus"></i>
                        </button>
                    </header>
                    <div class="transfer-container">
                        
                        ${responseMessage && !sellingOption ? responseMessage : ''}

                        <div class="marker"
                        style=" display: ${!sellingOption ? 'none' : 'block'} "
                        >
                            <div class="table">
                                <span>Team</span>
                                <span>Lowest Bid</span>
                                <span>Highest Bid</span>
                            </div>

                            <div class="team-offers">
                            </div>

                            <div class="player-data">
                                <div>
                                    <span>Market Value
                                    </span>
                                    <strong>$${playerInfo.marketValue.toLocaleString()}</strong>
                                </div>
                                <div>
                                    <span>Release Clause
                                    
                                    </span>
                                    <strong>$${playerInfo.releaseClause.toLocaleString()}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        `;        
    }

   
    displayAttributes() {
        const mainStats = this.data().attributes;
        const attributeStats = this.data().selectedDetails;
        const attAVG = this.getAvgStat();
        let classNames = '--bright-green';

        const attributeEl = attributeStats.map((stat, index) => {
            const convertStats = Object.entries(mainStats[index]);
            const attColumns = document.createElement('div');

            if (attAVG[index] >= 85) {
                classNames = '--bright-green';
            } else if (attAVG[index] >= 70 && attAVG[index] <= 80) {
                classNames = '--light-green';
            } else if (attAVG[index] <= 50) {
                classNames = '--red';
            }

            attColumns.classList.add('att-col');
            attColumns.innerHTML = `
                <div class="att-head">
                    <div class="att-title">${stat}</div>
                    <div class="att-avg"
                    style="background: var(${classNames})"
                    >
                    ${attAVG[index]}
                    </div>
                </div>
            `;
            for (const [atts, rating] of convertStats) {
                
                if (rating >= 70 && rating <= 80) {
                    classNames = '--light-green';
                } else if (rating >= 80) {
                    classNames = '--bright-green';
                } else if (rating <= 50) {
                    classNames = '--red';
                }

  
                const wrapper = document.createElement('div');
                wrapper.classList.add('att-wrapper');
                wrapper.innerHTML = `
                    <div>
                        <div class="att-title">${atts}</div>
                        <div class="att-rating">${rating}</div>
                    </div>
                    <div class="bar-wrapper">
                        <div class="rating-bar"
                        style="width: ${rating}%;
                        background-image: var(${classNames});
                        "></div>
                    </div>
                `;
                attColumns.appendChild(wrapper);
                
                document.querySelector('.attribute-main').insertAdjacentElement('afterbegin', attColumns);
            }
        });

        return attributeEl;
    }

}

new App();