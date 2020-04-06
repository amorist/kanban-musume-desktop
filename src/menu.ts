import { app, shell, Menu, MenuItem } from 'electron';
const template: (Electron.MenuItemConstructorOptions | MenuItem)[] = [
    {
        label: app.name,
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            {
                label: 'Website',
                click: async (): Promise<void> => {
                    await shell.openExternal('https://github.com/amorist/kanban-musume-desktop')
                }
            },
            {
                label: 'Author',
                click: async (): Promise<void> => {
                    await shell.openExternal('https://github.com/amorist')
                }
            },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    }
]
const menu = Menu.buildFromTemplate(template)
export = menu;