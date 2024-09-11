# Farmer Livestock Management - Server

This folder contains the server-side logic for the Farmer Livestock Management project. It handles AI-powered disease diagnosis, processes image and symptom submissions, and communicates with the frontend for report generation.

## How to Run

To set up the server, follow these steps:

1. Clone the repository:
    ```bash
    git clone <repo>
    ```
2. Navigate to the server folder and install the necessary dependencies:
    ```bash
    npm i
    ```

## Configuration

To get the server running, you need to update the frontend folder with your machine's **IPv4 address** (You can get the IPv4 via ```ipconfig``` command from the command prompt of the device):

1. Open the frontend project.
2. Navigate to the file: `app/(tabs)/diagnosis/[userinput].jsx`.
3. In the `handleSubmit` function, update the fetch URL with your local server's IPv4 address.
   
   Example:
   ```javascript
   const response = await fetch(`http://192.168.0.205:8000/${endpoint}`
   ```
   Replace ```192.168.0.205``` with your own machine's IPv4 address.

## Gemini Studio API Keys

Ensure that you add your own Gemini Studio API keys to the server configuration:

1. Go to the file: api/gemini.js.
2. Replace the placeholder API keys with your own keys

## Hotspot Connection

You must connect your mobile device to the **hotspot** of your laptop, ensuring both the server and Expo app communicate on the same network.

## Common Error Handling

1.  **Report Not Generated (Takes Too Long):**
   - Reconfirm the following:
     - Both the laptop and mobile device are connected to the same network.
     - The correct **IPv4 address** is set in the frontend's `handleSubmit` function.
     - Your internet connection is stable and sufficient.
     - The server is running without errors and no processes are blocked by firewalls or antivirus/VPN's.

## Technologies Used

- **Node.js**: Backend server for handling requests.
- **Express.js**: Framework for building the API.
- **Gemini API**: For AI-based disease detection.

## Contribution

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a pull request.



### Sever : 
https://github.com/Harshal-3558/Farmer-Livestock-Management-Server
### Frontend : 
https://github.com/Harshal-3558/Farmer-Livestock-Management
