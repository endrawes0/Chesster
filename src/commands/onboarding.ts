//------------------------------------------------------------------------------
// Commands for onboarding new folks
//------------------------------------------------------------------------------
import _ from 'lodash'
import * as heltour from '../heltour'
import { SlackBot, CommandMessage } from '../slack'

export async function welcomeMessage(bot: SlackBot, message: CommandMessage) {
    if (
        _.isEqual(
            message.channel,
            bot.channels.getId(bot.config.welcome['channel'])
        )
    ) {
        let result = await heltour.linkSlack(
            bot.config.heltour,
            message.user,
            ''
        )
        bot.reply(
            message,
            'Everyone, please welcome the newest member of the ' +
                'Lichess 45+45 League, <@' +
                message.user +
                '>!'
        )

        let convo = await bot.startPrivateConversation([message.user])

        let channelId = convo.channel.id

        let _4545FAQ = bot.config.leagues['45+45'].links.faq
        let lonewolfFAQ = bot.config.leagues['lonewolf'].links.faq
        let text =
            'Welcome. I am the league moderator bot.\n' +
            `*Before you can participate, you must <${result.url}|click here to link your Slack and Lichess accounts.>*\n` +
            'After that, read the FAQ for your league: ' +
            `<${_4545FAQ}|4545 League FAQ>` +
            `| <${lonewolfFAQ}|LoneWolf FAQ>\n` +
            "Say 'help' to get help. Enjoy the league!"

        bot.say({
            channel: channelId,
            text: text,
            attachments: [],
        })
    }
}