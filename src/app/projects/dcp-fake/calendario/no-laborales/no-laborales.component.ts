import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import {
  Calendar,
  CalendarDrawerMode,
  CalendarEvent,
  CalendarEventEditMode,
  CalendarEventPanelMode,
  CalendarSettings,
} from "app/core/types/calendar.types";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import momentPlugin from "@fullcalendar/moment";
import rrulePlugin from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";
import * as moment from "moment";
import esLocale from "@fullcalendar/core/locales/es";
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar as FullCalendar } from '@fullcalendar/core';
import { MatDrawer } from "@angular/material/sidenav";

@Component({
  selector: "app-no-laborales",
  templateUrl: "./no-laborales.component.html",
  styleUrls: ["./no-laborales.component.scss"],
})
export class NoLaboralesComponent implements OnInit {

  @ViewChild('eventPanel') private _eventPanel: TemplateRef<any>;
  @ViewChild('fullCalendar') private _fullCalendar: FullCalendarComponent;
  @ViewChild('drawer') private _drawer: MatDrawer;

  viewTitle: string;
  drawerMode: CalendarDrawerMode = "side";
  drawerOpened: boolean = true;

  settings: CalendarSettings;
  calendarPlugins: any[] = [
    dayGridPlugin,
    interactionPlugin,
    listPlugin,
    momentPlugin,
    rrulePlugin,
    timeGridPlugin,
  ];
  private _fullCalendarApi: FullCalendar;
  events: CalendarEvent[] = [];
  eventTimeFormat: any;

  view: "dayGridMonth" | "timeGridWeek" | "timeGridDay" | "listYear" =
    "dayGridMonth";
  views: any;
  locales = [esLocale];

  constructor() {}

  ngOnInit(): void {
    // Build the view specific FullCalendar options
    this.views = {
      dayGridMonth: {
        eventLimit: 3,
        eventTimeFormat: this.eventTimeFormat,
        fixedWeekCount: false,
      },
      timeGrid: {
        allDayText: "",
        columnHeaderFormat: {
          weekday: "short",
          day: "numeric",
          omitCommas: true,
        },
        columnHeaderHtml: (date): string => `<span class="fc-weekday">${moment(
          date
        ).format("ddd")}</span>
                                                 <span class="fc-date">${moment(
                                                   date
                                                 ).format("D")}</span>`,
        slotDuration: "01:00:00",
        slotLabelFormat: this.eventTimeFormat,
      },
      timeGridWeek: {},
      timeGridDay: {},
      listYear: {
        allDayText: "All day",
        eventTimeFormat: this.eventTimeFormat,
        listDayFormat: false,
        listDayAltFormat: false,
      },
    };
  }

  /**
     * After view init
     */
   ngAfterViewInit(): void
   {
       // Get the full calendar API
       this._fullCalendarApi = this._fullCalendar.getApi();

       // Get the current view's title
       this.viewTitle = this._fullCalendarApi.view.title.toLocaleUpperCase().replace('SEP', 'SE');

       // Get the view's current start and end dates, add/subtract
       // 60 days to create a ~150 days period to fetch the data for
       const viewStart = moment(this._fullCalendarApi.view.currentStart).subtract(60, 'days');
       const viewEnd = moment(this._fullCalendarApi.view.currentEnd).add(60, 'days');

       // Get events
      //  this._calendarService.getEvents(viewStart, viewEnd, true).subscribe();
   }

  /**
   * Change the calendar view
   *
   * @param view
   */
  changeView(
    view: "dayGridMonth" | "timeGridWeek" | "timeGridDay" | "listYear"
  ): void {
    //  // Store the view
    //  this.view = view;
    //  // If the FullCalendar API is available...
    //  if ( this._fullCalendarApi )
    //  {
    //      // Set the view
    //      this._fullCalendarApi.changeView(view);
    //      // Update the view title
    //      this.viewTitle = this._fullCalendarApi.view.title;
    //  }
  }

  /**
   * Moves the calendar to the current date
   */
  today(): void {
    //  // Go to today
    //  this._fullCalendarApi.today();
    //  // Update the view title
    //  this.viewTitle = this._fullCalendarApi.view.title;
  }

  /**
   * Moves the calendar one stop back
   */
  previous(): void {
    //Go to previous stop
     this._fullCalendarApi.prev();
     // Update the view title
     this.viewTitle = this._fullCalendarApi.view.title.toLocaleUpperCase().replace('SEP', 'SE');
     // Get the view's current start date
     const start = moment(this._fullCalendarApi.view.currentStart);
     // Prefetch past events
    //  this._calendarService.prefetchPastEvents(start).subscribe();
  }

  /**
   * Moves the calendar one stop forward
   */
  next(): void {
     // Go to next stop
     this._fullCalendarApi.next();
     // Update the view title
     this.viewTitle = this._fullCalendarApi.view.title.toLocaleUpperCase().replace('SEP', 'SE');
     // Get the view's current end date
     const end = moment(this._fullCalendarApi.view.currentEnd);
     // Prefetch future events
    //  this._calendarService.prefetchFutureEvents(end).subscribe();
  }

  /**
   * Toggle Drawer
   */
  toggleDrawer(): void {
    // Toggle the drawer
    // this._drawer.toggle();
  }

  /**
   * On event click
   *
   * @param calendarEvent
   */
  onEventClick(calendarEvent): void {
    // // Find the event with the clicked event's id
    // const event: any = cloneDeep(this.events.find(item => item.id === calendarEvent.event.id));
    // // Set the event
    // this.event = event;
    // // Prepare the end value
    // let end;
    // // If this is a recurring event...
    // if ( event.recuringEventId )
    // {
    //     // Calculate the end value using the duration
    //     end = moment(event.start).add(event.duration, 'minutes').toISOString();
    // }
    // // Otherwise...
    // else
    // {
    //     // Set the end value from the end
    //     end = event.end;
    // }
    // // Set the range on the event
    // event.range = {
    //     start: event.start,
    //     end
    // };
    // // Reset the form and fill the event
    // this.eventForm.reset();
    // this.eventForm.patchValue(event);
    // // Open the event panel
    // this._openEventPanel(calendarEvent);
  }

  /**
   * On date click
   *
   * @param calendarEvent
   */
  onDateClick(calendarEvent): void {
    // // Prepare the event
    // const event = {
    //     id              : null,
    //     calendarId      : this.calendars[0].id,
    //     recurringEventId: null,
    //     isFirstInstance : false,
    //     title           : '',
    //     description     : '',
    //     start           : moment(calendarEvent.date).startOf('day').toISOString(),
    //     end             : moment(calendarEvent.date).endOf('day').toISOString(),
    //     duration        : null,
    //     allDay          : true,
    //     recurrence      : null,
    //     range           : {
    //         start: moment(calendarEvent.date).startOf('day').toISOString(),
    //         end  : moment(calendarEvent.date).endOf('day').toISOString()
    //     }
    // };
    // // Set the event
    // this.event = event;
    // // Set the el on calendarEvent for consistency
    // calendarEvent.el = calendarEvent.dayEl;
    // // Reset the form and fill the event
    // this.eventForm.reset();
    // this.eventForm.patchValue(event);
    // // Open the event panel
    // this._openEventPanel(calendarEvent);
    // // Change the event panel mode
    // this.changeEventPanelMode('add');
  }

  /**
   * On event render
   *
   * @param calendarEvent
   */
  onEventRender(calendarEvent): void {
    // // Get event's calendar
    // const calendar = this.calendars.find(item => item.id === calendarEvent.event.extendedProps.calendarId);
    // // Return if the calendar doesn't exist...
    // if ( !calendar )
    // {
    //     return;
    // }
    // // If current view is year list...
    // if ( this.view === 'listYear' )
    // {
    //     // Create a new 'fc-list-item-date' node
    //     const fcListItemDate1 = `<td class="fc-list-item-date">
    //                                     <span>
    //                                         <span>${moment(calendarEvent.event.start).format('D')}</span>
    //                                         <span>${moment(calendarEvent.event.start).format('MMM')}, ${moment(calendarEvent.event.start).format('ddd')}</span>
    //                                     </span>
    //                                 </td>`;
    //     // Insert the 'fc-list-item-date' into the calendar event element
    //     calendarEvent.el.insertAdjacentHTML('afterbegin', fcListItemDate1);
    //     // Set the color class of the event dot
    //     calendarEvent.el.getElementsByClassName('fc-event-dot')[0].classList.add(calendar.color);
    //     // Set the event's title to '(No title)' if event title is not available
    //     if ( !calendarEvent.event.title )
    //     {
    //         calendarEvent.el.querySelector('.fc-list-item-title').innerText = '(No title)';
    //     }
    // }
    // // If current view is not month list...
    // else
    // {
    //     // Set the color class of the event
    //     calendarEvent.el.classList.add(calendar.color);
    //     // Set the event's title to '(No title)' if event title is not available
    //     if ( !calendarEvent.event.title )
    //     {
    //         calendarEvent.el.querySelector('.fc-title').innerText = '(No title)';
    //     }
    // }
    // // Set the event's visibility
    // calendarEvent.el.style.display = calendar.visible ? 'flex' : 'none';
  }
}
