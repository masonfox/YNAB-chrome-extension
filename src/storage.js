// import store from "./store"
const sync = chrome.storage.sync

const storage = {
    get (param) {
        return new Promise((resolve) => {
            sync.get(param, (result) => {
                resolve(result)
            })
        })
    },
    has (key) {
        this.get(key, (response) => {
            console.log(response)
        })
    },
    set (obj) {
        sync.set(obj, (response) => {
            console.log('set response', response)
        })
    },
    remove () {

    },
    clear () {
        sync.clear()
    }
}

export default storage