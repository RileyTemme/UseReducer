import { useReducer } from "react"

const initialState = {
    name: 'Aragorn',
    level: 1,
    experience: 0,
    hp: 100,
    maxHP: 100,
    mp: 50,
    maxMP: 50
}

const characterReducer = (state, action) => {
    switch(action.type) {
        case "LEVEL_UP" : return {
           ...state,
                level: state.level + 1,
                maxHP: state.maxHP + 10,
                maxMP: state.maxMP + 5,
                hp: state.hp + 10,
                mp: state.mp + 5
        }
        case 'TAKE_DAMAGE':
            return {
                ...state,
                hp: Math.max(0, state.hp - action.payload)
            }
        case 'HEAL':
            return {
                ...state,
                hp: Math.min(state.maxHP, state.hp + action.payload)
            }
        case 'GAIN_EXPERIENCE':
            return {
                ...state,
                experience: state.experience + action.payload
            }
        case 'RESET':
            return initialState
        default:
            return state
    }
}


const Character = () => {
    const [ character, dispatch ] = useReducer(characterReducer , initialState)
    
    return (
        <div>
            <h2>{character.name}</h2>
            <p>Level: {character.level}</p>
            <p>Experience: {character.experience}</p>
            <p>HP: {character.hp}/{character.maxHP}</p>
            <p>MP: {character.mp}/{character.maxMP}</p>

            <button
                onClick={() => dispatch({ type: 'LEVEL_UP' })}>
                Level Up
            </button>
            <button
                onClick={() => dispatch({ type: 'TAKE_DAMAGE', payload: 10 })}>
                Take Damage
            </button>
            <button
                onClick={() => dispatch({ type: 'HEAL', payload: 15})}>
                Heal
            </button>
            <button
                onClick={() => dispatch({ type: 'GAIN_EXPERIENCE', payload: 50 })}>
                Gain XP
            </button>
            <button
                onClick={() => dispatch({ type: 'RESET' })}>
                Reset
            </button>
        </div>
    )

}

export default Character