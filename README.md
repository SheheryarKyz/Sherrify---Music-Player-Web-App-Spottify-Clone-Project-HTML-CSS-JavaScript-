# Sherrify - Web Music Player

Sherrify is a Spotify-inspired web music player built using HTML, CSS, and JavaScript. It provides a responsive interface for browsing playlists, playing songs, controlling playback, and adjusting volume.

## Features

* Spotify-inspired dark user interface
* Responsive design for desktop and smaller screens
* Playlist and album cards
* Dynamic playlist loading from song folders
* Dynamic song list generation
* Play and pause controls
* Previous and next song controls
* Automatic loading of the first song
* Interactive seek bar
* Current song time and total duration display
* Volume control
* Mute and unmute functionality
* Mobile navigation menu
* Playlist metadata loaded from `info.json`
* URL handling that can adapt to the current server instead of relying on a fixed localhost address

## Technologies Used

* HTML5
* CSS3
* JavaScript
* HTML5 Audio API
* Fetch API
* Google Fonts

## Project Structure

```text
Sherrify/
│
├── index.html
├── script.js
├── style.css
├── utility.css
│
├── songs/
│   ├── fol1/
│   │   ├── info.json
│   │   ├── cover.jpeg
│   │   └── *.mp3
│   │
│   ├── fol2/
│   │   ├── info.json
│   │   ├── cover.jpeg
│   │   └── *.mp3
│   │
│   └── ...
│
├── logo.svg
├── home.svg
├── search.svg
├── playlist.svg
├── music.svg
├── play.svg
├── pause.svg
├── prevsong.svg
├── nextsong.svg
├── volume.svg
├── mute.svg
├── hamburger.svg
├── close.svg
└── README.md
```

## How It Works

The application uses JavaScript to dynamically retrieve songs from the available playlist folders.

The `getSongs()` function retrieves the songs from a selected playlist, creates the song list in the library, and attaches click events to each song.

The `playMusic()` function loads the selected track into an HTML Audio object and controls playback.

The `displayAlbums()` function retrieves playlist information and dynamically creates playlist cards using the information stored in each playlist's `info.json` file.

The player also listens for audio events to update the playback time and seek-bar position.

## Playlist Structure

Each playlist should have its own folder inside the `songs` directory.

For example:

```text
songs/
└── fol2/
    ├── info.json
    ├── cover.jpeg
    ├── song1.mp3
    ├── song2.mp3
    └── song3.mp3
```

The `info.json` file contains the playlist metadata used by the application.

Example:

```json
{
  "title": "My Playlist",
  "description": "A collection of my favorite songs."
}
```

## Running the Project

Because the JavaScript dynamically fetches files from the project directories, the project should be run through a local web server rather than directly opening `index.html` with the browser's `file://` protocol.

### Using VS Code Live Server

1. Open the project folder in Visual Studio Code.
2. Install the Live Server extension if it is not already installed.
3. Right-click `index.html`.
4. Select `Open with Live Server`.
5. The project will open in your browser.

The application will then be available through a local URL similar to:

```text
http://127.0.0.1:5500/
```

## URL Handling

The project avoids relying on a permanently hardcoded local server address.

For example:

```javascript
window.location.origin
```

returns the origin of the server currently running the website.

This allows the application to construct URLs based on the environment in which it is being served rather than always expecting:

```text
http://127.0.0.1:5500/
```

## Important Deployment Note

The current implementation discovers playlists and songs by requesting directory URLs and reading the links returned by the server.

This approach works with development servers such as VS Code Live Server that provide directory listings.

Static hosting services may not provide directory listings. Therefore, if the project is deployed to a static hosting service such as GitHub Pages, the current directory-discovery implementation may require modification.

A production-ready implementation should use a JSON manifest containing the available playlists and songs instead of relying on server-generated directory listings.

## Controls

| Control       | Function                              |
| ------------- | ------------------------------------- |
| Play/Pause    | Starts or pauses the current song     |
| Previous      | Plays the previous song               |
| Next          | Plays the next song                   |
| Seek Bar      | Changes the current playback position |
| Volume Slider | Adjusts playback volume               |
| Volume Icon   | Mutes or unmutes the player           |
| Playlist Card | Loads the selected playlist           |
| Song Item     | Plays the selected song               |

## Responsive Design

The interface includes responsive CSS rules that change the layout for smaller screens.

On smaller displays:

* The sidebar becomes a slide-out menu.
* A hamburger button opens the library.
* The close button hides the library.
* Playlist cards resize to fit the available screen width.
* The player controls are rearranged vertically.
* The volume and playback information adapt to the available space.

## Credits

This project is an educational Spotify-inspired music player created for learning and practicing frontend web development.

The project is not affiliated with or endorsed by Spotify.

## License

This project is intended for educational and personal portfolio use.
