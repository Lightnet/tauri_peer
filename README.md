
# tauri_peer

# Information:
  Work in progress build tests. Note this is place holder project name and builds.

  The reason to build this project is develop peer to peer app. To make simple communication system. But there is message system as other people have made is one currently.

  There will be pros and cons to them.

  Second reason is to have gun.js and sea.js to build later on it. Currently it required some translate API to handle gun graph node. Which need to code to get it workig.

  Note this is just idea.

# Command:

```
npm run tauri dev
```
Run App Web Browser and Nodejs server.

```
npm run dev
```
Run the web server.

# Features:

 * UI
   * [ ] Hyperbee
     * [x] key and value 
       * [x] add / update
       * [ ] delete
     * [x] key and object json
       * [x] add / update
       * [ ] delete
   * Page
     * auth
       * [ ] sign in
       * [ ] sign up
       * [ ] sign out
       * [ ] 
     * [ ] hyperbee
     * [ ] admin
       * [ ] swarm
       * [ ] permission
     * [ ] account
     * [ ] manage files
       * [ ] upload
       * [ ] download
       * [ ] delete
     * [ ] chat message
# Hyperbee build for UI:
  Current work in progress testing. There are many layers in how database can be set up.

# CoreStore:
  This is the main data storage. To handle hyperbee database store as well hyperdrive to store data. Read more on https://docs.pears.com
  
# Swarm:
 This is for peer to peer network. Current buggy on windows os. It tend to crash or lock out.

 One of the reason is server and client are run checks.

# Layout:
```
  || swarm (peer to peer)
  || corestore ( data file )
  || hyperbee ( database )
  || pear
  || gun
  || peer to peer
     |
     |==================================|
     |                                  |
     |                                  |
  || peer to peer                     || peer to peer
  || gun                              || gun
  || sea                              || sea
  || client                           || client
  || message                          || message

```
  There no main server but use peer to peer instead. It only required public key to access to the peer to peer network.