import { Meetup } from "../models/Meetup";

export class MeetupService {
    constructor() {
        this.api = 'https://milesl-functions.azurewebsites.net/api/chester-devs-meetups'
    }
    async getMeetups () {
        var response = await fetch(this.api, {
            method: 'GET',
            mode: 'cors'
        })
        if (response.status === 200) {
            var json = await response.json()
            var meetups = JSON.parse(json)
            return meetups.map(m => new Meetup(m)).sort((a, b) => {
                return a.timestamp < b.timestamp ? 1 : -1
            })
        } else {
            throw new Error("Unable to retrieve meetups.")
        }
    }
}