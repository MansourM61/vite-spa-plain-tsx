import { networkInterfaces } from 'node:os'

// find out the local IP address of the machine that the app is running on
function getLocalIp() {
    const nets = networkInterfaces()
    for (const name of Object.keys(nets)) {
        if (typeof nets[name] !== 'undefined') {
            for (const net of nets[name]) {
                // Skip internal (127.0.0.1) and non-IPv4 addresses
                if (net.family === 'IPv4' && !net.internal) {
                    return net.address
                }
            }
        }
    }
    return '127.0.0.1'
}

export { getLocalIp }
