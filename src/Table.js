import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from './componant/Button.jsx'
import Cartes from "./views/Cartes";
import StartGame from './componant/StartGame.jsx'

const cardArray = [
  "KS", "QS", "JS", "AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "0S",
  "KD", "QD", "JD", "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "0D",
  "KH", "QH", "JH", "AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "0H",
  "KC", "QC", "JC", "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "0C"];

// const min = 0
// const cardCount = 52

// let rndNum = 0
// let temp = ""
let arrayLength = 0
let rndCarteTemp = "";
let rndNumTemp = 0;

class Table extends React.Component {
  constructor() {
    super();

    this.state = {
      counterPlayer: 0,
      counterDealer: 0,
      playerCardList: [],
      dealerCardList: [],
      startGame: false,
      premierLance: "yes",
      endGame: false,
      nameOfWinner: ""
    }
  }

  rndCarte() {

    // on séléctionne des carte au hazard pour le player 

    arrayLength = + this.state.playerCardList.length;

    rndNumTemp = Math.floor(Math.random() * 53);

    if (rndNumTemp > 52) { rndNumTemp = rndNumTemp - 10 }

    else if (rndNumTemp < 1) { rndNumTemp = rndNumTemp + 10 }

    rndCarteTemp = cardArray[rndNumTemp - 1];

    return rndCarteTemp
  }


  onClickStop = () => {

    const cardSelectedDealer = this.rndCarte()
    // on met a jour la première carte du Dealer

    const cardSelectedDealer2 = this.rndCarte()
    // on met a jour la dexsième carte du Dealer

    const valueCarteDealer = this.transformCardIntoInt(cardSelectedDealer.split("")[0])

    const valueCarteDealer2 = this.transformCardIntoInt(cardSelectedDealer2.split("")[0])

    // on récupère la valeur des cartes qui vaut 10 avec la fonction transdormCardIntoInt 
    // et on les positionne une à coté de l'autre avec .split

    const cardsDealer = [cardSelectedDealer, cardSelectedDealer2]

    let dealerValue = valueCarteDealer + valueCarteDealer2

    let endGameAndWinner = {
      endGame: false,
      nameOfWinner: ""
    }

    while (dealerValue < 17) {

      cardsDealer.push(cardSelectedDealer)

      dealerValue += valueCarteDealer

      if (dealerValue > 21) {
        endGameAndWinner = {
          endGame: true,
          nameOfWinner: "Player"
        }

        break;
      }

      // le palyer gagne si le dealer n'ateint pas les 17 points et s'il dépasse les 21 points

    }

    if (dealerValue <= 21) {
      if (this.state.counterPlayer > 21) {
        endGameAndWinner = {
          endGame: true,
          nameOfWinner: "Dealer"

        }

      } else if (this.state.counterPlayer < dealerValue) {
        endGameAndWinner = {
          endGame: true,
          nameOfWinner: "Dealer"
        }

        // le Dealer gagne si le player n'ateint pas les 21 points 
        // et si la somme de ses cartes est inferieur a la somme des cartes du Dealer
        // sinon c'est le player qui gagne 

      } else {

        endGameAndWinner = {

          endGame: true,
          nameOfWinner: "Player"

        }

      }

    }

    console.log("update state on stop");

    this.setState({
      counterDealer: dealerValue,
      dealerCardList: cardsDealer,
      nameOfWinner: endGameAndWinner.nameOfWinner,
      endGame: endGameAndWinner.endGame
    })
  }

  onClickGive = () => {

    const cardSelected = this.rndCarte()
    // on met a jour la carte choisie on cliquant sur le button Give
    const valueCarte = this.transformCardIntoInt(cardSelected.split("")[0])
    // on les positionne cote à  cote avec .split
    const totalPlayerValue = this.state.counterPlayer + valueCarte
    // on compte le total des cartes du Player

    this.setState({

      counterPlayer: totalPlayerValue,

      playerCardList: [...this.state.playerCardList, cardSelected]
      // on met a jour l'array playerCardlist et on fait le total
    })
  }

  transformCardIntoInt(cardValue) {
    if (cardValue === "K" || cardValue === "Q" || cardValue === "J" || cardValue === "A" || cardValue === "0") {
      cardValue = "10"
    }

    // ici ce sont les cartes du jeux qui vaut 10

    return parseInt(cardValue)
  }

  startGame = () => {

    const cardSelected = this.rndCarte()

    const valueCarte = this.transformCardIntoInt(cardSelected.split("")[0])

    this.setState({

      startGame: true
    })
  }

  // on commence on cliquant sur le button start 

  // on fait un render conditionnelle 

  renderGame() {

    return (

      <div>
        <div className="playGame">

          <div style={{ height: '100vh', position: 'relative' }}>

            <h1 style={{ color: '#feb236', textAlign: 'center' }}>Black Jack</h1>

            <Cartes key={"dealer"} cardList={this.state.dealerCardList} />

            {this.state.endGame && (<div className='winlost'>

              <h1>Winner is {this.state.nameOfWinner}</h1>

            </div>)}

            <Cartes key={"player"} cardList={this.state.playerCardList} />

            <div style={{ bottom: '20px', position: 'absolute' }}

              className="row col-6 offset-3 flex d-flex justify-content-between">

              <div className="d-grid gap-2">

                <Button

                  onClick={this.onClickGive}

                  classe="btn btn-outline-warning btn-lg rounded-pill"

                  color="white"

                  bcolor="#0d6efd"

                  name="Give"

                />

              </div>

              <div>

              </div>

              <div className="d-grid gap-2">

                <Button

                  onClick={this.onClickStop}

                  classe="btn btn-outline-warning btn-lg rounded-pill"

                  color="white"

                  bcolor="#dc3545"

                  name="Stop"

                //  on affiche les buttons Give et Stop et les cartes on appelant 
                // les components Cartes et Button
                />

              </div>

            </div>
          </div>
        </div>

      </div>
    )
  }


  render() {

    if (this.state.startGame == false) {

      return (
        
        <StartGame startGame={this.startGame} />
        // on appel le component StartGame avec la props startGame
      )

    } else {

      return (
        <div>

          {this.renderGame()}

        </div>
      )
    }
  }
}

export default Table;







