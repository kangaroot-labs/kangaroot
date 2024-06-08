# Kangaroot

Kangaroot is a command-line tool that helps you create Git branches based on ticket titles and numbers. It supports various ticket systems like Azure DevOps, Jira, and others.

![Kangaroot Logo](https://github.com/kangaroot-labs/kangaroot/blob/master/icon.png)

## Installation

To install Kangaroot globally, run the following command:

```bash
npm install -g kangaroot
```

## Usage

1. Open a terminal and navigate to your Git repository.
2. Run the `kangaroot` command:

```bash
kangaroot
```

If the `~/.kangaroot.json` configuration file doesn't exist, you'll be prompted to enter a ticket prefix.

3. Enter the ticket title when prompted:

## Branch Name Format

The branch name created by Kangaroot follows this format:

`<ticket_prefix>-<ticket_number>-<branch-name>`

- `<ticket_prefix>`: The prefix for the ticket number, configured in the `~/.kangaroot.json` file or provided by the user.
- `<ticket_number>`: The ticket number extracted from the first word of the ticket title.
- `<branch-name>`: The remaining part of the ticket title, converted to a branch-safe format (spaces replaced with hyphens, special characters removed, and lowercase).

## Configuration

Kangaroot uses a configuration file located at `~/.kangaroot.json` to store the ticket prefix. If the file doesn't exist, Kangaroot will prompt you to enter a ticket prefix and create the file.

The configuration file should have the following structure:

```json
{
  "ticket_prefix": "#"
}
```

Replace `"#"` with your desired ticket prefix.

## Requirements
- Node.js (version 10 or later)
- Git installed and configured on your system

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## License
Kangaroot is released under the MIT License.
