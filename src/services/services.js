import { api } from '../lib/api';

export function getUsers () {
    const url = ''
    return api.get(url)
        .then(res => {
            console.log(res)
        })
}
