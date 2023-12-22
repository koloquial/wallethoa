import './style.css';

const PlayingCard = ({ card }) => {

    const formatQuote = (quote) =>{
        return <>{quote.split('%')[0]}<br />{quote.split('%')[1]}</>;
    }

    const formatAbility = (ability) =>{
        switch(ability){
            case 'Fell':
              return `(+1 Wood)`
            case 'Mine':
              return `(+1 Stone)`;
            case 'Attune':
              return `(+1 Essence)`;
            case 'Glimmer':
              return `(+1 Spirit)`;
            case 'Ritual':
              return `(+1 Devotion)`;
            default: return;
        }
    }

    return (
        <div className={`playing-card ${card.color}`}>
            <div 
                className='image-container' 
                style={{
                    background: `url(${card.image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
                <div className='card-container'>
                    <div className='card-name'>
                       {card.name}
                    </div>
                    <div className='card-type'>
                        <table style={{width: '100%'}}>
                            <tr>
                                <td>
                                    {card.type}
                                </td>
                                <td style={{float: 'right'}}>
                                    <img src={card.icon} style={{width: '20px'}} />
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

            <div className='text-container'>
            {card.abilities.map((ability, index) => {
                return (
                    <div key={`ability-${index}`}>
                        {ability} <span className='ability-description'>{formatAbility(ability)}</span> 
                    </div>
                )
            })}
            
            <div className='card-quote'>
                <span className='ability-description'>{formatQuote(card.quote)}</span>

                <div className='card-number'>
                    {card.number}
                </div>
            </div>
        </div>
    </div>
    )
}

export default PlayingCard;