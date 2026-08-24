// Lets Bubbly hand off "the user wants to schedule a meeting" to the real
// chat on the home page (via a double-click, only while already on that
// page) instead of Bubbly running its own scheduling flow.
export const SCHEDULE_REQUEST_EVENT = 'bubbly:schedule-request';
export const SCHEDULE_REQUEST_MESSAGE = "I'd like to schedule a meeting";

export function requestScheduleMeeting() {
  window.dispatchEvent(new Event(SCHEDULE_REQUEST_EVENT));
}
