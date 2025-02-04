const CLIENT_ID = '28116562752-v1m53lr5cr53c2ef4te2rgut4b5rtdpf.apps.googleusercontent.com';  // Replace with your Google OAuth Client ID
const API_KEY = 'AIzaSyA3JoOOl4WQPBrn_4hhvyothDj1WgyADGA'; // Replace with your API key
const SPREADSHEET_ID = '1pzLOJTioeljEo7JuVJMHcjWQcjNjov5Rpf50CNj1Xi8';  // Corrected Google Spreadsheet ID
const SHEET_NAME = 'ColdplaySheet';  // Your sheet name

let gapiLoaded = false;

// Load Google API client and authenticate
function loadGAPI() {
    gapi.load('client:auth2', initGoogleAPI);
}

function initGoogleAPI() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4']
    }).then(function() {
        gapiLoaded = true;
        // Automatically sign-in on load
        gapi.auth2.getAuthInstance().signIn().then(function() {
            console.log("Authenticated successfully!");
            loadComments();  // Load existing comments after sign-in
        }).catch(function(error) {
            console.error('Error signing in', error);
        });
    }).catch(function(error) {
        console.error('Error initializing Google API', error);
    });
}

// Post a comment to Google Sheets
function postComment() {
    const commentText = document.getElementById("comment-input").value;

    if (commentText.trim() !== "") {
        const values = [[commentText]];  // Wrap comment in an array to match Sheet format
        const body = {
            values: values
        };

        if (gapiLoaded) {
            const request = gapi.client.sheets.spreadsheets.values.append({
                spreadsheetId: SPREADSHEET_ID,
                range: `${SHEET_NAME}!A:A`,  // Append to column A
                valueInputOption: 'RAW',
                insertDataOption: 'INSERT_ROWS',
                resource: body
            });

            request.then(function(response) {
                console.log('Comment posted successfully', response);
                loadComments();  // Reload the comments from Sheets
                document.getElementById("comment-input").value = "";  // Clear input
            }).catch(function(error) {
                console.error('Error posting comment to Google Sheets', error);
            });
        }
    } else {
        alert("Please write something before posting.");
    }
}

// Load comments from Google Sheets
function loadComments() {
    if (gapiLoaded) {
        const request = gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!A:A`  // Get all comments from column A
        });

        request.then(function(response) {
            const comments = response.result.values || [];
            const commentList = document.getElementById("comment-list");
            commentList.innerHTML = '';  // Clear existing comments

            comments.forEach(function(row) {
                const commentDiv = document.createElement("div");
                commentDiv.classList.add("comment");
                commentDiv.textContent = row[0];  // Comment is in the first column
                commentList.appendChild(commentDiv);
            });
        }).catch(function(error) {
            console.error('Error loading comments from Google Sheets', error);
        });
    }
}

// Load comments when the page is ready
window.onload = function() {
    loadGAPI();  // Initialize Google API
};
