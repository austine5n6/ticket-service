const TicketTypeRequest = require('./TicketTypeRequest') // The TicketTypeRequest
const TicketPaymentService = require('./TicketPaymentService') // The TicketPaymentService
const SeatReservationService = require('./SeatReservationService') // SeatReservationService

class TicketService {
    constructor() {
        this.ticketPrices = {
            INFANT: 0,
            CHILD: 10,
            ADULT: 20
        }
    } 
    isAdultTicketExist(ticketTypeRequests) {
            // Check if there is at least one adult ticket
            let adultTicketExist = false;
        
            for (const ticketRequest of ticketTypeRequests) {
              const ticketType = ticketRequest.getTicketType();
              const noOfTickets = ticketRequest.getNoOfTickets();
        
              if (ticketType === "ADULT") {
                adultTicketExist = true;
              }
              if (ticketType === "INFANT" && noOfTickets > 0) {
                continue;
              }
        
              if (ticketType === "CHILD" && noOfTickets > 0 && !adultTicketExist) {
                return false // Child ticket cannot be purchased without an adult ticket
              }
            }
        
            return adultTicketExist; // At least one adult ticket must be present
          }

    ticketPurchaser(ticketTypeRequests, accountId) {
        if(!this.isAdultTicketExist(ticketTypeRequests)) {
            console.log("Sorry! Infant/Child tickets cannot be purchased without including an Adult ticket");
            return false;
        }
        let totalAmount = 0;
        let totalSeats = 0;
        let adultTicketCount = 0;

        for (const ticketRequest of ticketTypeRequests) {
            const ticketType = ticketRequest.getTicketType();
            const noOfTickets = ticketRequest.getNoOfTickets();
            const ticketPrice = this.ticketPrices[ticketType]
            
            if (noOfTickets > 20) {
                console.log("Exceeded maximum number of tickets");
                return false;
            }

            if (ticketType == "ADULT") {
                adultTicketCount += noOfTickets;
            }
    
            if (ticketType == "INFANT") {
              continue;
            }
            if (ticketType == "CHILD") {
                totalSeats += noOfTickets;
            }
    
            totalAmount += ticketPrice * noOfTickets;
        }
        totalSeats += adultTicketCount;
        console.log(`Total amount is ${totalAmount}`)
        console.log(`Total reserved seat is ${totalSeats}`)

        const ticketPayment = new TicketPaymentService()
        ticketPayment.makePayment(accountId, totalAmount) // payment request made to the `TicketPaymentService

        const seatReservation = new SeatReservationService()
        seatReservation.reserveSeat(accountId, totalSeats) // reservation request made to the `SeatReservationService`
       
    }
}

// Example template test
const ticketService = new TicketService()
const accountId = 1;
const ticketTypeRequests = [
    new TicketTypeRequest("ADULT", 6),
    new TicketTypeRequest("CHILD", 6),
    new TicketTypeRequest("INFANT", 6)
    ];

    Object.freeze(ticketTypeRequests) //immutable TicketTypeRequest object

ticketService.ticketPurchaser(ticketTypeRequests, accountId)
