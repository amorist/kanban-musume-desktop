import list from './models/index.json'
const models: string[] = []
list.models.forEach((model) => { 
    if (typeof model === 'string') {
        models.push(`./models/${model}/index.json`);
    } else {
        model.forEach(m => {
            models.push(`./models/${m}/index.json`);
        });
    }
})
export = models;