# Vidyo Slack Slash Command

Invite others to your personal Vidyo room by typing `/vidyo` in any channel or direct message.

## Installation

1. `$ npm install`
1. Set up a [custom slash command](https://api.slack.com/slash-commands) for your Slack team and point it at the URL where you plan to run this app.
1. Set up a [bot user](https://api.slack.com/bot-users) for your Slack team.
1. Run the app with the following environment variables:
    * `VS_NODE_PORT`: The port on which the application should listen for requests.
    * `VS_WEBHOOK_TOKEN`: The token created by Slack for your custom slash command.
    * `VS_BOT_TOKEN`: The API token created by Slack for your bot user.
    * `VS_MONGODB_URL`: A connection URI to your MongoDB instance, where users' Vidyo URLs are stored.