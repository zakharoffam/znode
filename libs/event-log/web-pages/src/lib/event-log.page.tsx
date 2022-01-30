import { createStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import eventLogReducer from './event-log.slice';
import { EventsComponent } from "./components/events.component";
import { ErrorInterceptor } from "@uparm-automation/web-error-interceptor";


const store = createStore(eventLogReducer);


export function EventLogPage() {
  return (
    <Provider store={store}>
      <ErrorInterceptor name="EventLogPage">
        <h1>Welcome to EventLogWebPage!</h1>
        <br/>
        <EventsComponent />
      </ErrorInterceptor>
    </Provider>
  );
}

export default EventLogPage;
