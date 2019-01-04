import { LOADING } from '../actions'

const initialState = {
    loading: false,
    profileImg: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: !state.loading }
        default:
            return state
    }
}
