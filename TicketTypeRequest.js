/**
 * Immutable Object.
 */

class TicketTypeRequest {
    constructor(ticketType, noOfTickets) {
      this.ticketType = ticketType;
      this.noOfTickets = noOfTickets;

      // if (!Number.isInteger(noOfTickets)) {
      //   throw new TypeError('noOfTickets must be an integer');
      // }
    }
  
    getNoOfTickets() {
      return this.noOfTickets;
    }
  
    getTicketType() {
      return this.ticketType;
    }
  }

  module.exports = TicketTypeRequest