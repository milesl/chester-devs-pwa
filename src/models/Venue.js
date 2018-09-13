export class Venue {
    constructor ({id,name, lat, lon, address_1, city, country, localized_country_name}) {
        this.id = id
        this.name = name
        this.lat = lat
        this.lon = lon
        this.address = address_1
        this.city = city
        this.countryCode = country
        this.country = localized_country_name
    }
}
