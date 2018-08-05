export enum RequestStatus {
        New = 1,      // created from order, (no providerId yet)
        Approved = 2, // approved by admin and broadcasted to doctors (no providerId yet)
        Assigned = 3, // approved by admin and assigned to certain non-doctors providers (has providerId)
        Accepted = 4, // accepted by a doctor (has providerId)
        Canceled = 5,
        Completed = 6
    // Old values
    // New = 1,
    // Pending = 2,
    // Approved = 3,
    // Canceled = 4,
    // Completed = 5
}
