const state = {
    files:[],
    op:0
}

const mutations = {
    changedFiles(state, data){
        // console.log(data)
        state.files = data.files
        state.op = data.op
    }
}

export default {
    state,
    mutations
}