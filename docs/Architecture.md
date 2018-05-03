# Friendship App Architecture

## Table of Contents
**[Welcome View](#welcome-view)**<br>
**[Sign In](#sign-in)**<br>
**[Sign Up](#sign-up)**<br>
**[Search View](#search-view)**<br>
**[People Profile](#people-profile)**<br>
**[Chat](#Chat)**<br>
**[User's Profile](#user's-profile)**<br>
**[Events](#events)**<br>
**[Event Details](#event-details)**<br>
**[Event Create/Edit](#event-create/edit)**<br>
**[Components](#components)**<br>
## Welcome View

<img src="./images/welcomeView.png" width="300" height="500"/>

**Path**

> src/containers/views/WelcomeView.js

**Component Imported**

> * src/components/Button.js
> * src/components/RoundTab.js

**Functionality**

> * Preview button: redirect the user to PeopleView
> * Join button: redirect the user to SignUpView
> * Log in button: redirect the user to the SignInView

## Sign In

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

## Sign Up

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

## Search View

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

## People Profile

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

## Chat

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

## User's Profile

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
## Events 

<img src="./images/EventsView.png" width="300" height="500"/>

**Path**

> src/containers/views/EventsView.js

**Component Imported**

> * src/components/Events/EventsHeader.js
> * src/components/Events/EventsList.js

**Functionality**

> * Events (Beer) button: redirect the user to Events View container
> * On the page there is a list of all avaialble events loaded. Two Get requests are sent to the database in order to get the list of events as well as list of participants for each event
> * In the top right corner there is a sorting dropdown available. 
> * Sorting contains 5 different options : 
"Recommended" is calculated with utilizing event location, number of participants, 
common personalitites and common yeah&nahs. 
"By Time" sorted by closest by time.
"Smallest first" event with a minumum numbert of participant is shown at the first place.
"Closes first" closest event by location is first. (Location is calculated with google maps API.(Only distance to city is counted)).
"My events" is working not like sorting, but like a filter. It means that it's showing only events which you are joining.
> *  Each event card contains a picture of the event and basic information about the event like title, description, participant emojis and date&time
> * By pressing on the Location section the standard map app will be opened with the direction to the event location. 
> * Event Date is highlighted if it's "Today" or "Tomorrow". In all other cases event date is shown as a day of the week. 


## Event Details

<img src="./images/EventDetails1.png" width="300" height="500"/>
<img src="./images/EventDetails2.png" width="300" height="500"/>


**Path**

> src/containers/views/EventDetailView.js

**Component Imported**

> * src/components/Events/EventTopPart.js
> * src/components/Events/EventBottomPart.js
> * src/components/Events/MyEventModal.js

**Functionality**

> * Event Detail page is opened after pressing one of the event from the list 
> * The page mainly consist of two main parts. Top Part and Bottom. 
> * Top Part contains the basic information about the event like Title, Description, Date, Time and Location. With help of styles it has a wave shape and contains the picture of the event as well.
> * In order to fetch all required information in the container there are several requests to the backend are done. 
> * On the Top and Bottom of the page user is able to press the button 'Join this', or 'Leave this' in case already joined. 
> * After user joins the event, the page is reloaded and user is added to the participants list under the host. 
> * Host of the event has a specific markup and it is always in the first place.
> * The user profile page can be accessed by pressing the particiapant row.  
> * The Bottom part of the page contains 4 Different Sections.
> * "Group Participants" contains all users which are joining event. Red and Blue balls are showing the number of your common yeahs and nahs with the user. 
> * "Group Perconalities" contains  information about the personalitites of the event based on the personalitites of the users who join. Circle in the top part shows the number of the each personalitity for event. 
> * "Top Yeahs" & "Top Naahs" contains  information about the top yeahs and top naahs for this event based on the participant preferances. Circle shows the number of each tag for event. 
> * In case when you are the host of the event, instead of  "Join"&"Leave" buttons the button "Manage event" available. 
> * By pressing this button the modal which which allows user to open the Edit Page will be opened. 
> * If event is full (Number of maximum participants exceed), then user is not able to click the join button. 
> * In the participants list there are no common yeahs & naahs circles with your own user. 


## Event Create/Edit 

<img src="./images/EventCreate2.png" width="300" height="500"/>
<img src="./images/EventCreate1.png" width="300" height="500"/>
<img src="./images/Modal.png" width="300" height="500"/>
<img src="./images/Edit1.png" width="300" height="500"/>
<img src="./images/Edit2.png" width="300" height="500"/>

**Path**

> src/containers/views/EventCreateView.js
> src/containers/views/EventEditView.js

**Component Imported**

> * src/components/Events/EventForm.js

**Functionality**

> * For Creating the new one and modifying the existing event there are two containers are user. EventCreateView and EventEditView use the same EventForm component which taking  different props based on the mode. 
> * Create Page can be opened by pressing the big "+" circle in the Events List page. 
> * On the New Event page user should specify all required information for the creation of the event. 
> * Required fields in the form are marked with star.
> * "Maximum Participants" section specify the maximum number of participants which can join the event. After this number is exceed, users are not able anymore to join the event. 
> * "People Mix" feature contains the information how diverse the event is. 
> * Diversity of the event is calculated based on partipants information, perconalities and tags. It is calculated in the beackend as the percentage of the similarity between host and user who viewing the event. 
> * In case when the users similarity is less then diversity value specified by host, then event is not shown for the user. 
> * Picture can be added on the Bottom of the page and it will be an event picture on the backgroung. 
> * After "Create" button is pressed, event is inserted to the database and user is redirected to the Event Detail Page. 
> * After user creates an event, it is automatically joining it and it's not possible to leave event anyhow for the host. 
> * For Editing the event, the button "Manage Event" and then "Edit" should be pressed. 
> * On the "Edit Event" page user will get all information about the event populated to the corresponding fields. 
> * It's possible to modify all fields of the event. 
> * On the bottom part, there is "Cancel Event" button which will delete the event from the database and redirect user to Events List page.

## Components

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.


