import Card from '../Card'

import peasant_red from '../../images/peasant-red.png'
import peasant_white from '../../images/peasant-white.png'
import peasant_blue from '../../images/peasant-blue.png'
import peasant_green from '../../images/peasant-green.png'
import peasant_black from '../../images/peasant-black.png'
import set_icon from '../../images/spellbook-prime.png'

const DisplayAllCards = () => {
  return(
    <>
      <Card
        card={{
          image: peasant_red,
          icon: set_icon,
          class: 'Peasant',
          abilities: ['Ritual'],
          color: 'red-card',
          type: 'Resource',
          name: 'Selene Waithwood',
          quote: 'In Wraithwood’s depths, where shadows dance with glee, % Selene the Witch wields magic, wild and free.',
          number: 5,
        }}></Card>

      <Card
        card={{
          image: peasant_white,
          icon: set_icon,
          class: 'Peasant',
          abilities: ['Glimmer'],
          color: 'white-card',
          type: 'Resource',
          name: 'Willow Frostpetal',
          quote: 'Beneath moonlit blooms, where enchantments twine, % Willow Frostpetal weaves a spell divine.',
          number: 4,
        }}></Card>

      <Card
        card={{
          image: peasant_blue,
          icon: set_icon,
          class: 'Peasant',
          abilities: ['Attune'],
          color: 'blue-card',
          type: 'Resource',
          name: 'Eldritch Starcaster',
          quote: 'In realms of magic where constellations gleam, % Eldritch Starcaster conjures dreams unseen.',
          number: 3,
        }}></Card>

      <Card
        card={{
          image: peasant_green,
          icon: set_icon,
          class: 'Peasant',
          abilities: ['Fell'],
          color: 'green-card',
          type: 'Resource',
          name: 'Elowen Swiftsong',
          quote: 'Beneath the canopy where echoes weave, % Elowen Swiftsong, guardian of the verdant eve.',
          number: 2,
        }}></Card>

      <Card
        card={{
          image: peasant_black,
          icon: set_icon,
          class: 'Peasant',
          abilities: ['Mine'],
          color: 'black-card',
          type: 'Resource',
          name: 'Durgan Graniteheart',
          quote: 'Beneath the earth where echoes softly start, % Durgan Graniteheart, miner with a steadfast heart.',
          number: 1,
        }}></Card>
    </>
  )
}

export default DisplayAllCards;