export class PushService {
    constructor() {
        this.api = 'https://milesl-functions.azurewebsites.net/api/chester-devs-push-message'
    }
    async sendPush () {
        var response = await fetch(this.api, {
            method: 'POST',
            mode: 'cors'
        })
        if (response.status === 200) {
            return
        } else {
            throw new Error("Unable to send push.")
        }
    }
    async syncPush () {
        try {
            if ('serviceWorker' in navigator && 'SyncManager' in window) {
                var registration = await navigator.serviceWorker.ready
                registration.sync.register('sync-push')
            } else {
                this.sendPush()
            }
        } catch (Error) {
            this.sendPush()
        }
    }
}