const smapiCommandDescription = 'The `smapi` command provides a number of subcommandsthat '
+ 'map 1:1 to the underlying API operations in Alexa Skill Management API (SMAPI).'
+ 'The commands allow detailed control of API inputs and expose raw outputs. '
+ 'There are subcommands for creating and updating the skill, interaction model, '
+ 'and account linking information as well as starting the skill certification process.';

const baseCommand = 'ask smapi';
const spacesWithShellCharacter = 4;

class SmapiDocs {
    constructor(commander) {
        this.commander = commander;
        this.commands = commander.commands;
    }

    _makeOptionsString(options, commandName) {
        return options.map(option => {
            const { mandatory, flags } = option;
            const prefix = mandatory ? '<' : '[';
            const suffix = mandatory ? '>' : ']';

            const spacesCount = baseCommand.length + commandName.length + spacesWithShellCharacter;
            return `${' '.repeat(spacesCount)}${prefix}${flags.split(',').join('|')}${suffix}`;
        }).join('\n').trim();
    }

    _cleanDescription(description = '') {
        let cleanedDescription = description.trim();
        if (cleanedDescription.length > 1 && !cleanedDescription.endsWith('.')) {
            cleanedDescription = `${cleanedDescription}.`;
        }

        // replace required and optional strings

        cleanedDescription = cleanedDescription.replace('[REQUIRED]', 'Required.');
        cleanedDescription = cleanedDescription.replace('[OPTIONAL]', 'Optional.');
        cleanedDescription = cleanedDescription.replace('\n', '');
        // adding new line before * to correctly render list in markdown
        // cleanedDescription = cleanedDescription.replace('*', '\n*');

        return cleanedDescription;
    }

    generateViewData() {
        const commands = this.commands.map(command => {
            const parsedCommand = {
                name: command._name,
                description: this._cleanDescription(command._description),
                optionsString: this._makeOptionsString(command.options, command._name),
                options: command.options.map(option => ({ name: option.flags, description: this._cleanDescription(option.description) }))
            };
            return parsedCommand;
        });
        return {
            smapiCommandDescription,
            baseCommand,
            commands
        };
    }
}

module.exports = { SmapiDocs };
