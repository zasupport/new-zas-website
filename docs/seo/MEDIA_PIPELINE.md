# ZA Support — Workshop Media Pipeline

## Architecture

```
iPhone                        iCloud                       Mac
┌────────────┐    sync    ┌──────────────┐    sync    ┌─────────────────┐
│ ZAS Workshop│──────────│ZAS-Workshop- │──────────│ iCloud folder   │
│ album       │          │Media/        │          │       │         │
│ iOS Shortcut│          │              │          │ za_media_watcher│
│ auto-saves  │          │              │          │       │         │
│ to iCloud   │          │              │          │ docs/seo/       │
└────────────┘          └──────────────┘          └─────────────────┘
```

## iPhone Setup — One Manual Step

1. Open Shortcuts app on iPhone
2. Tap Automation → +
3. Trigger: Photos saved to album "ZAS Workshop"
4. Action: Run "ZAS Workshop Sync"
5. Toggle OFF "Ask Before Running"

## Monitoring

```bash
cat ~/.za-media-watcher.log
ls -la ~/Developer/new-zas-website/docs/seo/
```

Supported formats: jpg, jpeg, png, heic, heif, webp, mov, mp4, m4v
