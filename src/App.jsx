import React, { Component } from "react";
import "./App.css";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          id: 1,
          title: "Quarterly Planning",
          type: "Work",
          isPrivate: true,
          description: "Discussing goals and KPIs for the next 3 months.",
        },
        {
          id: 2,
          title: "Friday Happy Hour",
          type: "Social",
          isPrivate: false,
          description: "Team building and drinks at the local pub.",
        },
        {
          id: 3,
          title: "React Workshop",
          type: "Education",
          isPrivate: false,
          description:
            "Deep dive into React class components and lifecycle methods.",
        },
        {
          id: 4,
          title: "Project Alpha Release",
          type: "Work",
          isPrivate: true,
          description: "Final review before the production deployment.",
        },
        {
          id: 5,
          title: "Bowling Night",
          type: "Social",
          isPrivate: false,
          description: "Casual evening with friends and colleagues.",
        },
      ],
      isModalOpen: false,
      editingEvent: null,
    };
  }

  toggleModal = (editingEvent = null) => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      editingEvent,
    });
  };

  deleteEvent = (id) => {
    if (window.confirm("Delete This Event?")) {
      this.setState({
        events: this.state.events.filter((event) => event.id !== id),
      });
    }
  };

  saveEvent = (eventData) => {
    const { events, editingEvent } = this.state;

    if (editingEvent) {
      const updatedEvents = events.map((event) =>
        event.id === editingEvent.id ? { ...eventData, id: event.id } : event,
      );
      this.setState({
        events: updatedEvents,
      });
    } else {
      const newEvent = { ...eventData, id: Date.now() };
      this.setState({ events: [...events, newEvent] });
    }

    this.toggleModal();
  };

  render() {
    const { events, isModalOpen, editingEvent } = this.state;

    return (
      <div className="container">
        <h1>Manager events</h1>
        <button className="btn-add" onClick={() => this.toggleModal()}>
          +Add event
        </button>

        <table>
          <thead>
            <th>Event name</th>
            <th>Event type</th>
            <th>Privacy</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event) => (
                <tr key={event.id}>
                  <td title={event.description}>{event.title}</td>
                  <td>{event.type}</td>
                  <td>{event.isPrivate ? "Private" : "Public"}</td>
                  <td>
                    <button onClick={() => this.toggleModal(event)}>
                      Edit
                    </button>
                    <button onClick={() => this.deleteEvent(event.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={{ textAlign: "center" }} colSpan={4}>
                  The events table is empty
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {isModalOpen && <p>Modal is open</p>}
      </div>
    );
  }
}

export default App;
