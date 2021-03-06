# FeedMonkey

## Project setup
- Clone the repo `git clone https://github.com/shagital/feedmoney-frontend.git`
- Install dependencies `yarn install`
- Create env file `cp .env.example .env`
- Update `.env` with correct credentials
- Start application `yarn serve`


## Note
I enabled git tracking of `dist` folder to ease our deployment

## Deploy
- SSH into server
- `cd feedmonkey-frontend`
- `git pull`
- `cp -a dist/* ../feedmonkey.io`

## Test Payment
Test MasterCard PIN authentication
```
Card number: 5531 8866 5214 2950
cvv: 564
Expiry: 09/32
Pin: 3310
OTP: 12345
```
