import {io} from 'socket.io-client'
const socket=io('https://lensloop-server-1.onrender.com',{
    autoConnect:false
})
export default socket