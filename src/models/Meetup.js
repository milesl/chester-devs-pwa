import { Venue } from "./Venue";

export class Meetup {
    constructor ({ id, name, status, local_date, local_time, yes_rsvp_count, link, description, venue, time }) {
        this.id = id
        this.name = name
        this.status = status
        this.localDate = local_date
        this.localTime = local_time
        this.rsvpCount = yes_rsvp_count
        this.link = link
        this.description = description
        this.venue = venue ? new Venue(venue) : null
        this.timestamp = time
    }
}
