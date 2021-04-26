import React from "react";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Button,useDisclosure,Box} from "@chakra-ui/react";

function IngredientModal({ label, url }){
  var gapi = window.gapi
  // var CLIENT_ID = "1005897480612-s9s8otsf7fn8n078ag07fsdifrimnb4i.apps.googleusercontent.com";
  // var API_KEY = "AIzaSyAVAVuFKgHQnUyzYBxghTWGtWXdpsRoV6M";
  // var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  // var SCOPES = "https://www.googleapis.com/auth/calendar.events";
  var CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  var API_KEY = process.env.REACT_APP_API_KEY;
  var DISCOVERY_DOCS = process.env.REACT_APP_DISCOVERY_DOCS;
  var SCOPES = process.env.REACT_APP_SCOPES;

  const convertDate = (str,duration=0) => {
    str = str.toString();
    let parts = str.split(" ");
    let months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12"
    };
    let timeZone = {
      "GMT+0100": "+01:00",
      "GMT+0200": "+02:00",
      "GMT+0300": "+03:00",
      "GMT+0330": "+03:30",
      "GMT+0400": "+04:00",
      "GMT+0530": "+05:30",
      "GMT+0600": "+06:00",
      "GMT+0700": "+07:00",
      "GMT+0800": "+08:00",
      "GMT+0900": "+09:00",
      "GMT+0930": "+09:30",
      "GMT+1000": "+10:00",
      "GMT+1100": "+11:00",
      "GMT+1200": "+12:00",
      "GMT-1100": "-11:00",
      "GMT-1000": "-10:00",
      "GMT-0900": "-09:00",
      "GMT-0800": "-08:00",
      "GMT-0700": "-07:00",
      "GMT-0600": "-06:00",
      "GMT-0500": "-05:00",
      "GMT-0400": "-04:00",
      "GMT-0330": "-03:30",
      "GMT-0300": "-03:00",
      "GMT-0100": "-01:00"

    };
    if(duration!==0){
      let time = parts[4].split(':');
      let hours = time[0];
      let minutes = time[1];
      let seconds = time[2];
      parts[4]=String(Number(hours)+duration)+":"+minutes+":"+seconds;
    }
    let date = parts[3] + "-" + months[parts[1]] + "-" + parts[2] + "T" + parts[4] + timeZone[parts[5]];
    console.log( date );
    return date;
  };


  const addtoGoogleCalendar = () => {
    gapi.load('client:auth2', () => {
      console.log('loaded client')
      var start = convertDate(startDate);
      var end = convertDate(startDate,1);

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3')

      gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        
        var event = {
          'summary': `Cooking ${label}`,
          'description': `From Foodie - URL: ${url}`,
          'start': {
            'dateTime': `${start}`,
            // 'timeZone': 'America/Los_Angeles'
          },
          'end': {
            'dateTime': `${end}`,
            // 'timeZone': 'America/Los_Angeles'
          },
          // 'recurrence': [
          //   'RRULE:FREQ=DAILY;COUNT=2'
          // ],
          // 'attendees': [
          //   {'email': 'lpage@example.com'},
          //   {'email': 'sbrin@example.com'}
          // ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 30}
            ]
          }
        }

        var request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event,
        })

        request.execute(event => {
          console.log(event)
          window.open(event.htmlLink)
        })
        

        /*
            Uncomment the following block to get events
        */
        /*
        // get events
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(response => {
          const events = response.result.items
          console.log('EVENTS: ', events)
        })
        */
    

      })
    })
  }
  // give option to choose how long maybe for starters defualt 1 hour with forms and requires also make option array and go through
    const [startDate, setStartDate] = useState(new Date());
    const { isOpen, onOpen, onClose } = useDisclosure()  
        return (
            <>
                <Button onClick={onOpen}>Save</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Share</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                      <Box mb='1em'>
                        <h1><strong>Add to Calendar</strong></h1>
                        <h1>Choose a Date:</h1>
                        <DatePicker selected={startDate} onChange={date =>  setStartDate(date) } showTimeSelect/>
                      </Box>
                      
                      <Button colorScheme="teal" variant="outline" onClick={addtoGoogleCalendar}>Add To My Google Calendar</Button>
                    </ModalBody>
                    <ModalFooter>
                    <Button colorScheme="orange" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    </ModalFooter>
                </ModalContent>
                </Modal>
            </>
        );
};
export default IngredientModal;
