## TechConf-db

Building a concise list of technology conferences and conference venues in South Africa

## Contributors
Looking for a new open source project to work on? Well, I am looking for you!! I am looking for contributors to help maintain and build new features; source events, venues, and speakers. Anyone is welcome whether you are a developer, designer, project manager, or tester. I have a growing [list](https://github.com/dlodeprojuicer/techconf-db/issues) of exciting (NOT!) features and bugs you can help me with.

## Project setup
```
npm install
```

### Run on the browser - development
```
npm run serve
```

## Design
![alt text](/screenshot2.png "TechConf-db Screenshot")

## Native

Using [Capacitor](https://capacitorjs.com/docs/getting-started) for native builds

### Prepare native builds

## iOS testing and distribution
1. Download latest Xcode
2. `npm run build`
3. `npx cap add ios`
3. `npx cap copy`
4. `npx cap open ios` Xcode takes a few minutes to index the files; keep an eye at the top of Xcode's window for progress.

[Not compulsory] For sanity check click on the play button in top left. This will prepare and run the app in a simulator, if all goes well you should be able to login and click around. If not, create an issue 🤷 and I will have a look.

*Icons and launch images* - Xcode (v11.5) cannot map icons listed in config.xml so this has to be done manually 😞. In the root folder look for Resources and select Images.xcassets. A panel will show up where you can select AppIcon to add app icons or LaunchImage to add launch images.

## Android testing and distribution
1. Download latest Android Studio
2. `npm run build`
3. `npx cap add android`
3. `npx cap copy`
4. `npx cap open android` Android Studio takes a few minutes to index the files, keep an eye at the bottom of Android Studio for progress.
5. Testing - When indexing is complete, look for a green play button. Click the play button and it will launch the app in an emulator ([See here to setup Emulator](https://developer.android.com/studio/run/managing-avds)) or on the phone if a phone is connected via USB.

## Contact
- [@dlodeprojuicer](https://twitter.com/dlodeprojuicer) on Twitter
