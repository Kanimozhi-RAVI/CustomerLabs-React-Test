# CustomerLabs React Test

This project is a React assignment created as part of the CustomerLabs Frontend Developer assessment.

The task was to build a segment creation interface where users can dynamically add schema fields and save them to a server using a Webhook endpoint.

---

## Features

- Modal-based UI with smooth overlay effect  
- Segment name input field  
- Dynamic dropdowns for schema selection  
- Add and remove schemas dynamically  
- Prevent duplicate schema selections  
- User-friendly design with color indicators:
  - Green: User Traits
  - Red: Group Traits  
- Sends JSON payload to [webhook.site](https://webhook.site) for testing

---

## JSON Payload Format

When you click **Save the Segment**, the app sends data in this format:

```json
{
  "segment_name": "last_10_days_blog_visits",
  "schema": [
    { "first_name": "First Name" },
    { "last_name": "Last Name" }
  ]
}
