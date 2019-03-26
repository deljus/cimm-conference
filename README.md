# cimm-conference

Project for the site cimm.kpfu.ru

# Start to development
- mpm install
- npm run start-dev (start dev server)
- npm run watch:dynamic (watch frontend js)

# Start to production
- npm install
- npm run start

# Configure service
For configuration, edit the file exampleConfig.json file

Basic fields:
| Field | Description |
| ------ | ------ |
| routePrefix | prefix for all routes |
| emailTitle | [ title for email |
| emailTemplate | body for email. Use markdown syntax. |
| emailTransporter | Settings email transporter. [See more](https://nodemailer.com/smtp/) |
| loginPageImage | Image url for login and registration page |
| conferenceName |  conference name |
| db | Database settings. |

# Docker
- docker-compose build
- docker-compose up
